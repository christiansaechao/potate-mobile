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

  const [pomodoro, setPomodoro] = useState(user.FOCUS);
  const [shortBreak, setShortBreak] = useState(user.SHORT_BREAK);
  const [longBreak, setLongBreak] = useState(user.LONG_BREAK);
  const [weeklyGoal, setWeeklyGoal] = useState(user.weekly_goal);
  const [vibration, setVibration] = useState<boolean>(
    Boolean(user.vibration ?? 0)
  );

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
