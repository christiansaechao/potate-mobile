import { View } from "react-native";
import { ThemedText, ThemedView } from "../index";

type AppBreakdownProps = {
  time: number;
  appName: string;
};

export const AppBreakdown = ({ time, appName }: AppBreakdownProps) => {
  const barColor =
    time > 30 ? "bg-red-500" : time > 70 ? "bg-yellow-400" : "bg-green-400";

  return (
    <ThemedView className="w-full px-8 flex gap-2">
      <ThemedView className="flex-row justify-between">
        <ThemedText className=" text-lg font-bold">{appName}</ThemedText>
        <ThemedText className=" text-xs font-bold">
          {Math.round(time)}%
        </ThemedText>
      </ThemedView>
      <View className="h-2 bg-black/20 rounded-full overflow-hidden">
        <View className={`h-full ${barColor}`} style={{ width: `${time}%` }} />
      </View>
    </ThemedView>
  );
};
