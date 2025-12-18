import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "../contexts/theming/ThemeProviders";
import { useColorScheme } from "../hooks/use-color-scheme";

import { CustomText } from "@/components/custom";
import { db, expo_db } from "../db/client";

import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useDrizzleStudio(expo_db);

  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return <CustomText>DB failed to initialize</CustomText>;
  }
  if (!success) {
    return <CustomText>Setting up database...</CustomText>;
  }

  return (
    <SafeAreaProvider className="flex-1">
      <NavigationThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </NavigationThemeProvider>
    </SafeAreaProvider>
  );
}
