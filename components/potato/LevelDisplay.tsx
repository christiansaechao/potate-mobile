import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  calculateCurrentExp,
  calculateExpForNextLevel,
  calculateLevel,
} from "../../lib/leveling";
import { CustomText } from "../custom";

// --- Types ---

type LevelDisplayProps = {
  total_exp: number;
};

export const LevelDisplay = ({ total_exp }: LevelDisplayProps) => {
  // --- Derived State ---

  const level = calculateLevel(total_exp);
  const current_exp = calculateCurrentExp(level, total_exp);
  const needed_exp = calculateExpForNextLevel(level);
  const progress = needed_exp > 0 ? (current_exp / needed_exp) * 100 : 0;

  // --- Render ---

  return (
    <View className="w-full mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 bg-black/10 rounded-xl items-center justify-center">
            <Ionicons name="star" size={18} color="#F59E0B" />
          </View>
          <CustomText className="text-base font-semibold">
            Level {level}
          </CustomText>
        </View>
        <View className="bg-black/10 px-3 py-1 rounded-full">
          <CustomText className="text-sm font-bold">
            {current_exp} / {needed_exp} XP
          </CustomText>
        </View>
      </View>

      <View className="h-3 bg-black/10 rounded-full overflow-hidden">
        <View
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
