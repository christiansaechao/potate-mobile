import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View } from "react-native";
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

import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { CustomText } from "@/components/custom";

export default function Settings() {
  // --- Hooks ---

  const insets = useSafeAreaInsets();
  const { theme, mode } = useTheme();

  // --- State ---
  const [showSaved, setShowSaved] = useState(false);

  // --- Constants ---

  const backgroundColor = THEMES[theme][mode];

  // --- Handlers ---
  const handleSaveFeedback = () => {
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 2000);
  };

  // --- Render ---

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1 }}
      className={`transition-colors duration-300 ${backgroundColor} relative`}
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
          <MainCard onSave={handleSaveFeedback} />
        </AnimatedScreen>
      </ScrollView>

      {showSaved && (
        <Animated.View
          entering={FadeInDown.springify()}
          exiting={FadeOutUp}
          style={{
            position: "absolute",
            bottom: 100, // Above tab bar
            left: 0,
            right: 0,
            alignItems: "center",
            zIndex: 10000,
          }}
        >
          <View
            style={{
              backgroundColor: "#4CAF50",
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}
          >
            <CustomText
              style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            >
              Settings Saved! ✓
            </CustomText>
          </View>
        </Animated.View>
      )}

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
