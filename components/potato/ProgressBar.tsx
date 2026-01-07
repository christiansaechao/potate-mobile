import React from "react";
import { View } from "react-native";

// --- Types ---

type ProgressBarProps = {
  progress: number; // 0–100
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <View className="bottom-0 left-0 h-1.5 bg-white/20 w-full">
    <View className="h-full bg-white" style={{ width: `${progress}%` }} />
  </View>
);
