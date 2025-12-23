import { CustomText } from "@/components/custom";
import { THEMES } from "@/constants/constants";
import { useTheme } from "@/hooks/useTheme";

import { formatTime, getTimeInSeconds } from "@/lib/helper";
import sessionOps from "@/lib/sessions";
import { TimerMode } from "@/types/types";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IntervalOps from "../../lib/intervals";

/**
 * Time spent focused: count all intervals with only completed sessions time
 * Time spent unfocused?
 * Time spent on short break: count all intervals with only completed session time where session = short break
 * Time spent on long break: count all intervals with only completed session time where session = long break
 * Time spent on a break: count all intervals with only completed session time where session = short break & long break
 *
 */

type StatsType = {
  totalSessions: number;
  timeFocused: string;
  shortBreak: string;
  longBreak: string;
  allBreaks: string;
};

export default function Stats() {
  const { theme, mode } = useTheme();

  const [stats, setStats] = useState<StatsType>({
    totalSessions: 0,
    timeFocused: "0",
    shortBreak: "0",
    longBreak: "0",
    allBreaks: "0",
  });

  const getStats = async () => {
    try {
      const totalSessions = await sessionOps.getSessions();

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

  return (
    <SafeAreaView
      className={`flex-1 transition-colors duration-300 ${backgroundColor}`}
      edges={["top"]}
    >
      <View className="py-12 h-screen">
        <CustomText
          className="text-6xl text-center"
          style={{ height: 96, lineHeight: 96 }}
        >
          Stats Page
        </CustomText>
        <View className="flex gap-2">
          <CustomText className="text-2xl text-center ">
            Number of Sessions Started: {stats.totalSessions}
          </CustomText>
          <CustomText className="text-2xl text-center ">
            Number of Rotted Potatoes🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center ">
            Time Spent Focused🍟:{stats.timeFocused}
          </CustomText>

          <CustomText className="text-2xl text-center ">
            Time Spent On A Short Break🍟: {stats.shortBreak}
          </CustomText>

          <CustomText className="text-2xl text-center ">
            Time Spent On A Long Break🍟: {stats.longBreak}
          </CustomText>

          <CustomText className="text-2xl text-center ">
            Time Spent On A Break🍟: {stats.allBreaks}
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
}
