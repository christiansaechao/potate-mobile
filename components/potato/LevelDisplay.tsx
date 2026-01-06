import {
  calculateLevel,
  calculateCurrentExp,
  calculateExpForNextLevel,
} from "../../lib/leveling";
import React from "react";
import { View } from "react-native";
import { CustomText } from "../custom";

type LevelDisplayProps = {
  total_exp: number;
};
export const LevelDisplay = ({ total_exp }: LevelDisplayProps) => {
  const level = calculateLevel(total_exp);
  const current_exp = calculateCurrentExp(level, total_exp);
  const needed_exp = calculateExpForNextLevel(level);
  const progress = needed_exp > 0 ? (current_exp / needed_exp) * 100 : 0;

  console.log("total_exp:", total_exp, "level:", level);

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
