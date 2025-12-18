import { Redirect, Tabs } from "expo-router";

import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { FloatingTabBar } from "../../components/ui/floating-tab-bar";
import { IconSymbol } from "../../components/ui/icon-symbol";

export default function TabLayout() {
  const { completed, isLoading } = useOnboardingStatus();

  if (isLoading) {
    return null;
  }

  if (!completed) {
    return <Redirect href="/(onboarding)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Potato",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
