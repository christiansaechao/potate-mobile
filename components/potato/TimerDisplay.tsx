import React from "react";
import { View } from "react-native";
import { CustomText } from "../custom";

type TimerDisplayProps = {
  time: string;
  label: string;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, label }) => {
  return (
    <View className="items-center">
      <CustomText className="p-0 m-0 text-[100px] -my-10">{time}</CustomText>
      <CustomText className="text-2xl uppercase tracking-widest">
        {label}
      </CustomText>
    </View>
  );
};
