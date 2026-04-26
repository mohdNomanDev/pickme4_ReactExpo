import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { Provider } from "react-redux";
import { store } from "../store/store";
import MessageToast from "@/components/ui/MessageToast";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { setColorScheme } = useNativeWindColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  const systemBackgroundColor = "#f8f7f5"; // Locked to light background

  useEffect(() => {
    // Force light mode on initialization
    setColorScheme("light");
    setAppIsReady(true);
  }, [setColorScheme]);

  useEffect(() => {
    if (appIsReady) {
      SystemUI.setBackgroundColorAsync(systemBackgroundColor).catch((error) => {
        console.warn("System UI theme error:", error);
      });
    }
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <>
      <StatusBar
        style="dark"
        backgroundColor={systemBackgroundColor}
      />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <MessageToast />
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootLayoutContent />
      </SafeAreaProvider>
    </Provider>
  );
}
