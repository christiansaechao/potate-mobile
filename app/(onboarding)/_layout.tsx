import { Redirect, Stack } from "expo-router";

import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

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
