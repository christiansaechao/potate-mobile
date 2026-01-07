import React from "react";
import { View } from "react-native";

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
    <View className="w-full">
      <View className="flex-row justify-between items-center mb-1">
        <CustomText className="text-md font-bold">LVL {level}</CustomText>
        <CustomText className="text-md">
          {current_exp} / {needed_exp} XP
        </CustomText>
      </View>
      <View className="h-2 bg-black/20 rounded-full overflow-hidden">
        <View
          className="h-full bg-yellow-500"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
