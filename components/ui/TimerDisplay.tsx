import React from "react";
import { Text, View } from "react-native";

type TimerDisplayProps = {
  time: string;
  label: string;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, label }) => (
  <View className="relative items-center">
    <Text className="text-white font-black font-mono text-[80px] leading-[90px]">
      {time}
    </Text>
    <Text className="text-white/80 text-lg uppercase mt-1">{label}</Text>
  </View>
);
