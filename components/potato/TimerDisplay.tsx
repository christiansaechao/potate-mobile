import React from "react";
import { View } from "react-native";
import { CustomText } from "../custom";

type TimerDisplayProps = {
  time: string;
  label: string;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, label }) => (
  <View className="relative items-center">
    <CustomText className="font-mono text-[80px] leading-[90px]">
      {time}
    </CustomText>
    <CustomText className=" text-lg uppercase mt-1">{label}</CustomText>
  </View>
);
