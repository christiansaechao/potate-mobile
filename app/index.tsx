import { Redirect } from "expo-router";

import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

export const Index = () => {
  const { completed, isLoading } = useOnboardingStatus();
  if (isLoading) return null;
  return <Redirect href={completed ? "/(tabs)" : "/(onboarding)"} />;
};
