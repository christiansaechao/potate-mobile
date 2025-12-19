import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { SplashScreen, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "../contexts/theming/ThemeProviders";
import { useColorScheme } from "../hooks/use-color-scheme";

import { CustomText } from "@/components/custom";
import { db, expo_db } from "../db/client";

import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { useFonts } from "expo-font";

import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { completed, isLoading } = useOnboardingStatus();
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expo_db);

  const [loaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-Bold.ttf"),
    Baloo: require("../assets/fonts/Baloo2-Bold.ttf"),
  });

  useEffect(() => {
    const appReady = loaded && success && !isLoading;

    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, success, isLoading]);

  useEffect(() => {
    if (!success || isLoading) return;
    router.replace(completed ? "/(tabs)" : "/(onboarding)");
  }, [success, isLoading, completed]);

  if (error) {
    return <CustomText>DB failed to initialize</CustomText>;
  }

  if (!success) {
    return <CustomText>Setting up...</CustomText>;
  }

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider className="flex-1">
      <NavigationThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <ThemeProvider>
          <Stack screenOptions={{ headerBlurEffect: "dark" }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </NavigationThemeProvider>
    </SafeAreaProvider>
  );
}
