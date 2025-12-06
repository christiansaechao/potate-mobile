import { CustomText, CustomView } from "@/components/custom";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBreakdown } from "../../components/ui/AppBreakdown";

export default function Stats() {
  return (
    <SafeAreaView className="flex-1">
      <CustomView className="py-8">
        <CustomText className="text-6xl text-center">Stats Page</CustomText>
        <CustomView className="flex gap-2">
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
