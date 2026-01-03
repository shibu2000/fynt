// app/layout.tsx
import {
  Caveat_400Regular,
  Caveat_500Medium,
  Caveat_600SemiBold,
  Caveat_700Bold,
} from "@expo-google-fonts/caveat";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";

import { ToastProvider } from "@/components/ToastProvider";
import migrateDbIfNeeded from "@/database/migrations";
import { AuthProvider } from "@/providers/AuthProvider";
import { TransactionProvider } from "@/providers/TransactionProviders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import React, { useEffect } from "react";
import { AppState, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Caveat_400Regular,
    Caveat_500Medium,
    Caveat_600SemiBold,
    Caveat_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextState) => {
        if (nextState === "active") {
          const currentTime = Date.now();
          const lastLoginTime = await AsyncStorage.getItem("lastLoginTime");
          console.log({ lastLoginTime, currentTime });
          if (
            lastLoginTime &&
            currentTime - Number(lastLoginTime) > 5 * 60 * 1000
          ) {
            AsyncStorage.removeItem("lastLoginTime");
            router.replace("/auth/login");
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider className="flex-1 bg-green-950 border border-black">
      <View className="absolute inset-0 bg-outerBg" />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content" // or "light-content"
      />
      <ToastProvider>
        <SQLiteProvider databaseName={`fynt.db`} onInit={migrateDbIfNeeded}>
          <AuthProvider>
            <TransactionProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </TransactionProvider>
          </AuthProvider>
        </SQLiteProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
