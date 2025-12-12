import { View } from "react-native";
import { CustomText } from "../custom";

type AppBreakdownProps = {
  time: number;
  appName: string;
};

export const AppBreakdown = ({ time, appName }: AppBreakdownProps) => {
  const barColor =
    time > 30 ? "bg-red-500" : time > 70 ? "bg-yellow-400" : "bg-green-400";

  return (
    <View className="w-full px-8 flex gap-2">
      <View className="flex-row justify-between">
        <CustomText className=" text-lg font-bold">{appName}</CustomText>
        <CustomText className=" text-xs font-bold">
          {Math.round(time)}%
        </CustomText>
      </View>
      <View className="h-2 bg-black/20 rounded-full overflow-hidden">
        <View className={`h-full ${barColor}`} style={{ width: `${time}%` }} />
      </View>
    </View>
  );
};
