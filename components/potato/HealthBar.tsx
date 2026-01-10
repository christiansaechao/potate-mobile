import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CustomText } from "../custom";

// --- Types ---

type HealthBarProps = {
  health: number; // 0–100
};

export const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
  // --- Derived State ---

  const barColor =
    health < 30 ? "bg-red-400" : health < 70 ? "bg-yellow-400" : "bg-green-400";

  // --- Render ---

  return (
    <View className="w-full mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 bg-black/10 rounded-xl items-center justify-center">
            <Ionicons name="heart" size={18} color="#F87171" />
          </View>
          <CustomText className="text-base font-semibold">Health</CustomText>
        </View>
        <View className="bg-black/10 px-3 py-1 rounded-full">
          <CustomText className="text-sm font-bold">
            {Math.round(health)}%
          </CustomText>
        </View>
      </View>

      <View className="h-3 bg-black/10 rounded-full overflow-hidden">
        <View
          className={`h-full ${barColor} rounded-full`}
          style={{ width: `${health}%` }}
        />
      </View>

      {health < 100 && (
        <View className="mt-2 flex-row justify-center items-center gap-2 bg-black/5 py-1.5 px-3 rounded-xl">
          <Ionicons name="phone-portrait-outline" size={14} color="#F97316" />
          <CustomText className="text-xs font-medium">
            Stay focused to keep Potate healthy!
          </CustomText>
        </View>
      )}
    </View>
  );
};
