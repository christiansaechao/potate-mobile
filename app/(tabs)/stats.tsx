import { CustomText, CustomView } from "@/components/custom";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBreakdown } from "../../components/potato/AppBreakdown";
import IntervalOps from "../../lib/intervals";

type IntervalsType = {
  id: number;
  sessionId: number;
  startTime: number;
  endTime: number | null;
}[];

export default function Stats() {
  const [intervals, setIntervals] = useState<IntervalsType>();

  const getStats = async () => {
    try {
      const results = await IntervalOps.getIntervals();
      setIntervals(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <CustomView className="py-12 h-screen">
        <CustomText className="text-6xl text-center">Stats Page</CustomText>
        <CustomView className="flex gap-2">
          <CustomText>Intervals</CustomText>
          {intervals?.map((interval) => {
            return (
              <CustomText key={interval.id}>
                {interval.startTime} -{" "}
                {!interval.endTime ? "" : interval.endTime}
              </CustomText>
            );
          })}
          <CustomText className="text-2xl text-center ">
            Number of Rotted Potatoes🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center ">
            Time Spent Focused🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center">
            Time Spent Unfocused🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center ">
            Time Spent On A Break🍟: 42
          </CustomText>
          <CustomText className="text-2xl text-center">
            Time Spent On Other Apps:
          </CustomText>
        </CustomView>
        <CustomView className="flex gap-4 py-2">
          <AppBreakdown time={80} appName={"Facebook"} />
          <AppBreakdown time={30} appName={"Instagram"} />
        </CustomView>
      </CustomView>
    </SafeAreaView>
  );
}
