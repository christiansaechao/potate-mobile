import React from "react";
import { View } from "react-native";
import { Volume2, VolumeX } from "lucide-react-native";

import { useTheme } from "@/hooks/context-hooks/useTheme";
import { CustomText } from "../custom";
import { ThemedPressable } from "../ui/themed-pressable";
import { TimerState } from "@/types/types";

// --- Types ---

type HeaderProps = {
  isSound: boolean;
  toggleSound: () => void;
};

export const Header: React.FC<HeaderProps> = ({ isSound, toggleSound }) => {
  // --- Hooks ---

  const { colors } = useTheme();

  // --- Render ---

  return (
    <View className="w-full max-w-md flex-row justify-between items-center z-20">
      <CustomText className="text-2xl font-bold tracking-wider">
        POTATODORO
      </CustomText>

      <View className="flex-row gap-2">
        <ThemedPressable
          onPress={toggleSound}
          className="p-2 bg-white/20 rounded-full active:opacity-70"
          hitSlop={8}
        >
          {isSound ? (
            <Volume2 size={18} color={colors.buttonIconColor} />
          ) : (
            <VolumeX size={18} color={colors.buttonIconColor} />
          )}
        </ThemedPressable>
      </View>
    </View>
  );
};
