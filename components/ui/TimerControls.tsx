import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { TimerMode, TimerState } from "../../types/types";
import { ThemedPressable } from "../themed-pressable";

type TimerControlsProps = {
  state: TimerState;
  mode: TimerMode;
  toggleTimer: () => void;
  resetTimer: () => void;
  switchMode: (m: TimerMode) => void;
};

export const TimerControls: React.FC<TimerControlsProps> = ({
  state,
  mode,
  toggleTimer,
  resetTimer,
  switchMode,
}) => {
  const { theme } = useTheme();

  const color = Colors[theme];

  return (
    <View className="flex-row items-center gap-6 mt-4">
      {/* Main play/pause button */}
      <ThemedPressable
        onPress={toggleTimer}
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
        {state === TimerState.RUNNING ? (
          // TODO: should this be red at all times?
          <Pause size={32} color="red" />
        ) : (
          <Play size={32} color={color.buttonIconColor} />
        )}
      </ThemedPressable>

      {/* Side controls */}
      <View className="flex-col gap-3">
        <ThemedPressable
          onPress={resetTimer}
          className="p-3 bg-white/20 rounded-xl active:opacity-80"
          hitSlop={6}
        >
          <RotateCcw size={20} color={color.buttonIconColor} />
        </ThemedPressable>

        <ThemedPressable
          onPress={() =>
            switchMode(
              mode === TimerMode.FOCUS ? TimerMode.SHORT_BREAK : TimerMode.FOCUS
            )
          }
          className="p-3 bg-white/20 rounded-xl active:opacity-80"
          hitSlop={6}
        >
          <SkipForward size={20} color={color.buttonIconColor} />
        </ThemedPressable>
      </View>
    </View>
  );
};
