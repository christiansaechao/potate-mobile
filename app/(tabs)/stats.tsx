import { useCallback, useEffect, useState } from "react";
import { isSameDay, isSameWeek, isSameMonth } from "date-fns";
import {
  Image,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";

// Components
import Calendar from "@/components/Calendar";
import { CustomText } from "@/components/custom";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import Divider from "@/components/ui/divider";
import StatCard from "@/components/ui/stats-card";
import { WeeklyBarChart } from "@/components/ui/WeeklyBarChart";

// Constants & Types

import { COLORS, THEMES } from "@/constants/theme";
import { StatsType, TimerMode } from "@/types/types";

// Hooks
import { useTheme } from "@/hooks/context-hooks/useTheme";

// Libs
import { formatTime, getTimeInSeconds } from "@/lib/helper";
import sessionOps from "@/lib/sessions";
import IntervalOps from "@/lib/intervals";

export default function Stats() {
  // --- Hooks ---

  const { theme, mode } = useTheme();
  const insets = useSafeAreaInsets();

  // --- Constants ---

  const LoadedAnim = require("../../assets/videos/potato.gif");
  const backgroundColor = THEMES[theme][mode];
  const themeColor = COLORS[theme].buttonColor || "#81C784";
  const textColor = COLORS[theme].text;

  // --- State ---

  const [activeFilter, setActiveFilter] = useState<
    "Daily" | "Weekly" | "Monthly"
  >("Daily");

  const [rawSessions, setRawSessions] = useState<any[]>([]);
  const [rawIntervals, setRawIntervals] = useState<any[]>([]);

  const [stats, setStats] = useState<StatsType>({
    totalSessions: 0,
    totalCompletedSessions: 0,
    timeFocused: "0",
    shortBreak: "0",
    longBreak: "0",
    allBreaks: "0",
  });

  const [markedDates, setMarkedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [dailyStats, setDailyStats] = useState<
    Record<string, { focus: number; shortBreak: number; longBreak: number }>
  >({});

  // --- Handlers ---

  const fetchRawData = async () => {
    try {
      const totalSessions = await sessionOps.getSessions();
      const allIntervals = await IntervalOps.getIntervals();
      setRawSessions(totalSessions);
      setRawIntervals(allIntervals);

      // Process calendar data (needs all data regardless of filter)
      processCalendarData(totalSessions, allIntervals);
    } catch (err) {
      console.log(err);
    }
  };

  const processCalendarData = (sessions: any[], intervals: any[]) => {
    // ... (existing logic for dailyStats map and markedDates) ...
    // Create a map of sessions for quick lookup
    const sessionsMap = new Map(sessions.map((s) => [s.id, s]));

    const calculatedDailyStats: Record<
      string,
      { focus: number; shortBreak: number; longBreak: number }
    > = {};

    const dates = sessions.map((session) => {
      const d = new Date(session.createdAt);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      return dateStr;
    });

    // Initialize daily stats
    dates.forEach((date) => {
      if (!calculatedDailyStats[date]) {
        calculatedDailyStats[date] = {
          focus: 0,
          shortBreak: 0,
          longBreak: 0,
        };
      }
    });

    // Aggregate intervals
    intervals.forEach((interval) => {
      if (!interval.endTime) return;

      const session = sessionsMap.get(interval.sessionId);
      if (!session) return;

      const d = new Date(session.createdAt);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      if (!calculatedDailyStats[dateStr]) {
        calculatedDailyStats[dateStr] = {
          focus: 0,
          shortBreak: 0,
          longBreak: 0,
        };
      }

      const duration = Math.floor(
        (interval.endTime - interval.startTime) / 1000
      );

      if (session.mode === TimerMode.FOCUS) {
        calculatedDailyStats[dateStr].focus += duration;
      } else if (session.mode === TimerMode.SHORT_BREAK) {
        calculatedDailyStats[dateStr].shortBreak += duration;
      } else if (session.mode === TimerMode.LONG_BREAK) {
        calculatedDailyStats[dateStr].longBreak += duration;
      }
    });

    setDailyStats(calculatedDailyStats);
    setMarkedDates([...new Set(dates)]);
  };

  const calculateStats = useCallback(() => {
    if (!rawSessions.length) return;

    const now = new Date();
    let filteredSessions = rawSessions;

    if (activeFilter === "Daily") {
      filteredSessions = rawSessions.filter((s) =>
        isSameDay(new Date(s.createdAt), now)
      );
    } else if (activeFilter === "Weekly") {
      filteredSessions = rawSessions.filter((s) =>
        isSameWeek(new Date(s.createdAt), now, { weekStartsOn: 1 })
      );
    } else if (activeFilter === "Monthly") {
      filteredSessions = rawSessions.filter((s) =>
        isSameMonth(new Date(s.createdAt), now)
      );
    }

    // Filter intervals belonging to filtered sessions
    const sessionIds = new Set(filteredSessions.map((s) => s.id));
    const filteredIntervals = rawIntervals.filter((i) =>
      sessionIds.has(i.sessionId)
    );

    const completedSesssions = filteredSessions.filter(
      (session) => session.completed === 1
    ).length;

    // Helper to get time by mode from filtered intervals
    const getTimeByMode = (mode: TimerMode) => {
      const modeIntervals = filteredIntervals.filter((i) => {
        const parentSession = filteredSessions.find(
          (s) => s.id === i.sessionId
        );
        return parentSession?.mode === mode;
      });
      return getTimeInSeconds(modeIntervals);
    };

    const focusedSeconds = getTimeByMode(TimerMode.FOCUS);
    const shortBreakSeconds = getTimeByMode(TimerMode.SHORT_BREAK);
    const longBreakSeconds = getTimeByMode(TimerMode.LONG_BREAK);

    setStats({
      totalSessions: filteredSessions.length,
      totalCompletedSessions: completedSesssions,
      timeFocused: formatTime(focusedSeconds),
      shortBreak: formatTime(shortBreakSeconds),
      longBreak: formatTime(longBreakSeconds),
      allBreaks: formatTime(shortBreakSeconds + longBreakSeconds),
    });
  }, [rawSessions, rawIntervals, activeFilter]);

  // --- Effects ---

  useEffect(() => {
    fetchRawData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  const formattedStats = [
    { label: "Sessions Started", value: stats.totalSessions },
    {
      label: "Completed Sessions",
      value: stats.totalCompletedSessions,
    },
    { label: "Focused", value: stats.timeFocused },
    { label: "Short Break", value: stats.shortBreak },
    { label: "Long Break", value: stats.longBreak },
    { label: "Breaks", value: stats.allBreaks },
  ];

  // --- Render ---

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: insets.bottom + 60,
        }}
      >
        <AnimatedScreen>
          <View className="flex justify-between items-center flex-row">
            <View>
              <CustomText
                className="text-5xl text-center z-100"
                style={{ height: 96, lineHeight: 96 }}
              >
                Spud Report
              </CustomText>
            </View>
            <Animated.View className="w-20 h-20">
              <Image
                key={String(LoadedAnim)}
                source={LoadedAnim}
                resizeMode="contain"
                className="w-full h-full"
              />
            </Animated.View>
          </View>

          <Divider />

          <TouchableWithoutFeedback onPress={() => setSelectedDate(null)}>
            <Calendar
              markedDates={markedDates}
              dailyStats={dailyStats}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </TouchableWithoutFeedback>

          <Divider />

          {/* Filter Segmented Control */}
          <View className="flex-row bg-black/5 p-1 rounded-xl mb-6">
            {(["Daily", "Weekly", "Monthly"] as const).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableWithoutFeedback
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                >
                  <View
                    className="flex-1 py-2 rounded-lg items-center"
                    style={[
                      isActive && {
                        backgroundColor: themeColor,
                        // instead of shadow-sm:
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.12,
                        shadowRadius: 2,
                        elevation: 2, // Android
                      },
                    ]}
                  >
                    <CustomText
                      style={{
                        color: isActive
                          ? COLORS[theme].buttonIconColor
                          : textColor,
                        fontWeight: isActive ? "600" : "400",
                        opacity: isActive ? 1 : 0.6,
                      }}
                    >
                      {filter}
                    </CustomText>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>

          <View className="py-2">
            {formattedStats.map((item, index) => (
              <Animated.View
                key={item.label}
                entering={FadeInDown.delay(index * 50).springify()}
              >
                <StatCard
                  label={item.label}
                  stats={item.value}
                  backgroundColor={backgroundColor}
                />
              </Animated.View>
            ))}
          </View>

          <Divider />

          <WeeklyBarChart dailyStats={dailyStats} themeColor={themeColor} />
        </AnimatedScreen>
      </ScrollView>
    </SafeAreaView>
  );
}
