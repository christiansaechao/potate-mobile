import Calendar from "@/components/Calendar";
import { CustomText } from "@/components/custom";
import { THEMES } from "@/constants/constants";
import { useTheme } from "@/hooks/useTheme";

import StatCard from "@/components/ui/stats-card";
import { formatTime, getTimeInSeconds } from "@/lib/helper";
import sessionOps from "@/lib/sessions";
import { StatsType, TimerMode } from "@/types/types";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View, ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import IntervalOps from "../../lib/intervals";

/**
 * Time spent focused: count all intervals with only completed sessions time
 * Number of sessions finished
 * Time spent unfocused?
 * Time spent on short break: count all intervals with only completed session time where session = short break
 * Time spent on long break: count all intervals with only completed session time where session = long break
 * Time spent on a break: count all intervals with only completed session time where session = short break & long break
 */

export default function Stats() {
  const { theme, mode } = useTheme();

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

  const getStats = async () => {
    try {
      const totalSessions = await sessionOps.getSessions();
      const allIntervals = await IntervalOps.getIntervals();

      // Create a map of sessions for quick lookup
      const sessionsMap = new Map(totalSessions.map((s) => [s.id, s]));

      const calculatedDailyStats: Record<
        string,
        { focus: number; shortBreak: number; longBreak: number }
      > = {};

      const dates = totalSessions.map((session) => {
        const d = new Date(session.createdAt);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        return dateStr;
      });

      // Initialize daily stats for days with sessions
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
      allIntervals.forEach((interval) => {
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
        ); // in seconds

        if (session.mode === TimerMode.FOCUS) {
          calculatedDailyStats[dateStr].focus += duration;
        } else if (session.mode === TimerMode.SHORT_BREAK) {
          calculatedDailyStats[dateStr].shortBreak += duration;
        } else if (session.mode === TimerMode.LONG_BREAK) {
          calculatedDailyStats[dateStr].longBreak += duration;
        }
      });

      setDailyStats(calculatedDailyStats);

      const completedSesssions = totalSessions.filter(
        (session) => session.completed === 1
      ).length;

      const uniqueDates = [...new Set(dates)];
      setMarkedDates(uniqueDates);

      const focusedTime = await IntervalOps.getIntervalsBySessionMode(
        TimerMode.FOCUS
      );

      const longBreak = await IntervalOps.getIntervalsBySessionMode(
        TimerMode.SHORT_BREAK
      );

      const shortBreak = await IntervalOps.getIntervalsBySessionMode(
        TimerMode.SHORT_BREAK
      );

      const focused = formatTime(getTimeInSeconds(focusedTime));
      const lBreak = formatTime(getTimeInSeconds(longBreak));
      const sBreak = formatTime(getTimeInSeconds(shortBreak));
      const aBreak = formatTime(
        getTimeInSeconds(shortBreak) + getTimeInSeconds(longBreak)
      );

      const stats = {
        totalSessions: totalSessions.length,
        totalCompletedSessions: completedSesssions,
        timeFocused: focused,
        shortBreak: sBreak,
        longBreak: lBreak,
        allBreaks: aBreak,
      };

      setStats(stats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const backgroundColor = THEMES[theme][mode];
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: insets.bottom,
        }}
      >
        <TouchableWithoutFeedback onPress={() => setSelectedDate(null)}>
          <View className="py-2 h-screen">
            <CustomText
              className="text-6xl text-center"
              style={{ height: 96, lineHeight: 96 }}
            >
              Stats
            </CustomText>

            <View className="px-12 gap-2">
              <StatCard
                label="Sessions Started"
                stats={stats.totalSessions}
                backgroundColor={backgroundColor}
              />
              <StatCard
                label="Completed Sessions"
                stats={stats.totalCompletedSessions}
                backgroundColor={backgroundColor}
              />
              <StatCard
                label="Focused"
                stats={stats.timeFocused}
                backgroundColor={backgroundColor}
              />
              <StatCard
                label="Short Break"
                stats={stats.shortBreak}
                backgroundColor={backgroundColor}
              />
              <StatCard
                label="Long Break"
                stats={stats.longBreak}
                backgroundColor={backgroundColor}
              />
              <StatCard
                label="Breaks"
                stats={stats.allBreaks}
                backgroundColor={backgroundColor}
              />
            </View>

            <Calendar
              markedDates={markedDates}
              dailyStats={dailyStats}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}
