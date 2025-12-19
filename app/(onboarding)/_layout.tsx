import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { Redirect, Stack } from "expo-router";

export default function OnboardingLayout() {
  const { completed, isLoading } = useOnboardingStatus();

  if (isLoading) {
    return null;
  }

  if (completed) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
