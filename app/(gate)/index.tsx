import { Redirect } from "expo-router";

import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

export default function Gate() {
  const { completed, isLoading } = useOnboardingStatus();
  if (isLoading) return null;
  return <Redirect href={completed ? "/(tabs)" : "/(onboarding)"} />;
}
