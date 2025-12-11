import { CustomText, CustomView } from "@/components/custom";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBreakdown } from "../../components/potato/AppBreakdown";

export default function Stats() {
  return (
<<<<<<< HEAD
    <SafeAreaView className="flex-1 pb-24">
      <ThemedView className="py-8">
        <ThemedText type="title" className="text-6xl text-center">
          Stats Page
        </ThemedText>
        <ThemedView className="flex gap-2">
          <ThemedText className="text-2xl text-center ">
=======
    <SafeAreaView className="flex-1">
      <CustomView className="py-12 h-screen">
        <CustomText className="text-6xl text-center">Stats Page</CustomText>
        <CustomView className="flex gap-2">
          <CustomText className="text-2xl text-center ">
>>>>>>> main
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
