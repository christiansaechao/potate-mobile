import React from "react";
import { View } from "react-native";
import { Pause, Play, RotateCcw } from "lucide-react-native";

import { COLORS } from "../../constants/theme";
import { useTheme } from "@/hooks/context-hooks/useTheme";
import { TimerState } from "../../types/types";
import { ThemedPressable } from "../ui/themed-pressable";

// --- Types ---

type TimerControlsProps = {
  state: TimerState;
  toggleTimer: () => void;
  resetTimer: () => void;
};

export const TimerControls: React.FC<TimerControlsProps> = ({
  state,
  toggleTimer,
  resetTimer,
}) => {
  // --- Hooks ---

  const { theme } = useTheme();

  // --- Constants ---

  const color = COLORS[theme];

  // --- Render ---

  return (
    <View className="flex-row items-center gap-6 py-2">
      {/* Main play/pause button */}
      <ThemedPressable
        onPress={toggleTimer}
        className="w-20 h-20 rounded-3xl flex items-center justify-center active:scale-95 "
        style={{
          // shadow-lg equivalent
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
        hitSlop={8}
      >
        {state === TimerState.RUNNING ? (
          <Pause size={32} color="red" />
        ) : (
          <Play size={32} color={color.buttonIconColor} />
        )}
      </ThemedPressable>
      <ThemedPressable
        onPress={resetTimer}
        className="w-20 h-20 rounded-3xl flex items-center justify-center active:scale-95"
        style={{
          // shadow-lg equivalent
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
        hitSlop={8}
      >
        <RotateCcw size={32} color={color.buttonIconColor} />
      </ThemedPressable>
    </View>
  );
};
