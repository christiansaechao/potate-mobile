import React from "react";
import { View } from "react-native";
import { ThemedText } from "../themed-text";

type TimerDisplayProps = {
  time: string;
  label: string;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, label }) => (
  <View className="relative items-center">
    <ThemedText className="font-mono text-[80px] leading-[90px]">
      {time}
    </ThemedText>
    <ThemedText className=" text-lg uppercase mt-1">{label}</ThemedText>
  </View>
);
