import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText, ThemedView } from "../../components";
import { AppBreakdown } from "../../components/ui/AppBreakdown";

export default function Stats() {
  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="py-8">
        <ThemedText type="title" className="text-6xl text-center">
          Stats Page
        </ThemedText>
        <ThemedView className="flex gap-2">
          <ThemedText className="text-2xl text-center ">
            Number of Rotted Potatoes🍟: 42
          </ThemedText>
          <ThemedText className="text-2xl text-center ">
            Time Spent Focused🍟: 42
          </ThemedText>
          <ThemedText className="text-2xl text-center">
            Time Spent Unfocused🍟: 42
          </ThemedText>
          <ThemedText className="text-2xl text-center ">
            Time Spent On A Break🍟: 42
          </ThemedText>
          <ThemedText className="text-2xl text-center">
            Time Spent On Other Apps:
          </ThemedText>
        </ThemedView>
        <ThemedView className="flex gap-4 py-2">
          <AppBreakdown time={80} appName={"Facebook"} />
          <AppBreakdown time={30} appName={"Instagram"} />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
