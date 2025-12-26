import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { Redirect } from "expo-router";

export const Index = () => {
  const { completed, isLoading } = useOnboardingStatus();
  if (isLoading) return null;
  return <Redirect href={completed ? "/(tabs)" : "/(onboarding)"} />;
};
