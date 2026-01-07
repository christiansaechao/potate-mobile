import React from "react";
import { View } from "react-native";
import { Smartphone } from "lucide-react-native";

import { CustomText } from "../custom";

// --- Types ---

type HealthBarProps = {
  health: number; // 0–100
};

export const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
  // --- Derived State ---

  const barColor =
    health < 30 ? "bg-red-500" : health < 70 ? "bg-yellow-400" : "bg-green-400";

  // --- Render ---

  return (
    <View className="w-full">
      <View className="flex-row justify-between">
        <CustomText className="text-md font-bold">HP</CustomText>
        <CustomText className="text-md font-bold">
          {Math.round(health)}%
        </CustomText>
      </View>

      <View className="h-2 bg-black/20 rounded-full overflow-hidden">
        <View
          className={`h-full ${barColor}`}
          style={{ width: `${health}%` }}
        />
      </View>

      {health < 100 && (
        <View className="mt-2 flex-row justify-center items-center gap-1">
          <Smartphone size={10} color="rgba(255,255,255,0.8)" />
          <CustomText className=" text-[10px]">
            Don&apos;t switch apps!
          </CustomText>
        </View>
      )}
    </View>
  );
};
