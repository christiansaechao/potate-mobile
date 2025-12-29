import { THEMES } from "@/constants/constants";
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useUserDefaults } from "@/hooks/context-hooks/useUserDefaults";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { MainCard } from "@/components/settings/MainCard";

export default function Settings() {
  const insets = useSafeAreaInsets();

  // Theme(s)
  const { theme, mode } = useTheme();
  const backgroundColor = THEMES[theme][mode];

  // User Settings
  const user = useUserDefaults();

  const [pomodoro, setPomodoro] = useState(user.focus_duration);
  const [shortBreak, setShortBreak] = useState(user.short_break_duration);
  const [longBreak, setLongBreak] = useState(user.long_break_duration);
  const [weeklyGoal, setWeeklyGoal] = useState(user.weekly_goal);
  const [vibration, setVibration] = useState(user.vibration);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1 }}
      className={`transition-colors duration-300 ${backgroundColor}`}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: insets.bottom + 80,
        }}
      >
        <SettingsHeader />
        <MainCard
          user={user}
          pomodoro={pomodoro}
          shortBreak={shortBreak}
          longBreak={longBreak}
          weeklyGoal={weeklyGoal}
          vibration={vibration}
          setPomodoro={setPomodoro}
          setShortBreak={setShortBreak}
          setLongBreak={setLongBreak}
          setVibration={setVibration}
          setWeeklyGoal={setWeeklyGoal}
        />
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
