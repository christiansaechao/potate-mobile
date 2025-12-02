import React from "react";
import { Pressable, Text, View } from "react-native";
import { TimerMode } from "../../types";

type ModeSwitcherProps = {
  mode: TimerMode;
  switchMode: (m: TimerMode) => void;
};

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  mode,
  switchMode,
}) => {
  const modes = Object.values(TimerMode) as TimerMode[];

  return (
    <View className="flex-row bg-black/10 p-1.5 rounded-full border border-white/5">
      {modes.map((m) => {
        const isActive = mode === m;
        return (
          <Pressable
            key={m}
            onPress={() => switchMode(m)}
            className={`px-4 py-2 rounded-full ${
              isActive ? "bg-white" : ""
            } active:opacity-80`}
            hitSlop={6}
          >
            <Text
              className={`text-xs font-bold ${
                isActive ? "text-black" : "text-white/60"
              }`}
            >
              {String(m).replace("_", " ")}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
