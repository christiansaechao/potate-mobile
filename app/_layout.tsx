import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { CustomText } from "@/components/custom";
import { db, expo_db } from "../db/client";

import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";

// ✅ keep splash up until we say so
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  useDrizzleStudio(expo_db);

  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-Bold.ttf"),
    Baloo: require("../assets/fonts/Baloo2-Bold.ttf"),
  });

  const appReady = success && fontsLoaded;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [appReady]);

  if (error) {
    return <CustomText>DB failed to initialize</CustomText>;
  }

  if (!appReady) {
    return null; // keep splash visible
  }

  return (
    <SafeAreaProvider className="flex-1">
      <Stack screenOptions={{ headerBlurEffect: "dark" }}>
        <Stack.Screen name="(gate)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
