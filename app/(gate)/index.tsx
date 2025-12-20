import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { Redirect } from "expo-router";

export default function Gate() {
  const { completed, isLoading } = useOnboardingStatus();
  if (isLoading) return null;
  return <Redirect href={completed ? "/(tabs)" : "/(onboarding)"} />;
}
