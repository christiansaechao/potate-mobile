import { CustomText } from "@/components/custom";
import { THEMES } from "@/constants/constants";
import { useTheme } from "@/hooks/useTheme";
import sessionOps from "@/lib/sessions";

import { IntervalsType, SessionType, TimerMode } from "@/types/types";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBreakdown } from "../../components/potato/AppBreakdown";
import IntervalOps from "../../lib/intervals";
import { getTimeInMins } from "./helper";

export default function Stats() {
  const { theme, mode } = useTheme();
  const [focusedIntervals, setFocusedIntervals] = useState<IntervalsType>([]);
  const [shortBreaks, setShortBreaks] = useState<SessionType>();
  const [longBreaks, setLongBreaks] = useState<SessionType>();

  // group all intervals by session
  const focusedTime = getTimeInMins(focusedIntervals);
  // group sessions by mode

  const getStats = async () => {
    try {
      const focusedIntervals = await IntervalOps.getIntervalsBySessionMode(
        TimerMode.FOCUS
      );

      setFocusedIntervals(focusedIntervals);

      const longBreak = await sessionOps.getSessionsByMode(
        TimerMode.LONG_BREAK
      );

      const shortBreak = await sessionOps.getSessionsByMode(
        TimerMode.SHORT_BREAK
      );

      setLongBreaks(longBreak);
      setShortBreaks(shortBreak);

      const test = await IntervalOps.getIntervalsBySessionMode(TimerMode.FOCUS);
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
        <CustomText className="text-6xl text-center">Stats Page</CustomText>
        <View className="flex gap-2">
          <CustomText className="text-2xl text-center ">
            Number of Rotted Potatoes🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center ">
            Time Spent Focused🍟:{focusedTime}
          </CustomText>
          <CustomText className="text-2xl text-center">
            Time Spent Unfocused🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center ">
            Time Spent On A Short Break🍟: 42
          </CustomText>

          <CustomText className="text-2xl text-center ">
            Time Spent On A Long Break🍟: 42
          </CustomText>

          <CustomText className="text-2xl text-center ">
            Time Spent On A Break🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center">
            Time Spent On Other Apps:
          </CustomText>
        </View>
        <View className="flex gap-4 py-2">
          <AppBreakdown time={80} appName={"Facebook"} />
          <AppBreakdown time={30} appName={"Instagram"} />
        </View>
      </View>
    </SafeAreaView>
  );
}
