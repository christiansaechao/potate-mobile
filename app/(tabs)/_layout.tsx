import { Redirect, Tabs } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";

import { ThemeProvider } from "@/contexts/theming/ThemeProviders";
import { UserProvider } from "@/contexts/user/UserProvider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

import { FloatingTabBar } from "../../components/ui/floating-tab-bar";
import { IconSymbol } from "../../components/ui/icon-symbol";

export default function TabLayout() {
  // --- Hooks ---

  const { completed, isLoading } = useOnboardingStatus();
  const colorScheme = useColorScheme();

  // --- Render ---

  if (isLoading) {
    return null;
  }

  if (!completed) {
    return <Redirect href="/(onboarding)" />;
  }

  return (
    <UserProvider>
      <NavigationThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <ThemeProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
            }}
            tabBar={(props) => <FloatingTabBar {...props} />}
          >
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
              name="trophy-case"
              options={{
                title: "Badges",
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={24} name="trophy.fill" color={color} />
                ),
              }}
            />
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
              name="settings"
              options={{
                title: "Settings",
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={24} name="gearshape.fill" color={color} />
                ),
              }}
            />
          </Tabs>
        </ThemeProvider>
      </NavigationThemeProvider>
    </UserProvider>
  );
}
