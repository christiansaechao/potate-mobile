import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useTheme } from "@/hooks/context-hooks/useTheme";
import { useUserDefaults } from "@/hooks/context-hooks/useUserDefaults";
import { THEMES } from "@/constants/constants";

import { MainCard } from "@/components/settings/MainCard";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import AnimatedScreen from "@/components/ui/AnimatedScreen";

export default function Settings() {
  // --- Hooks ---

  const insets = useSafeAreaInsets();
  const { theme, mode } = useTheme();

  // --- Constants ---

  const backgroundColor = THEMES[theme][mode];

  // --- Render ---

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
        <AnimatedScreen>
          <SettingsHeader />
          <MainCard />
        </AnimatedScreen>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
