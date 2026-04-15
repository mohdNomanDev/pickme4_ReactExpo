import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, { useEffect, useState, useCallback } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { THEME_KEY, ThemeMode, syncTheme } from "../store/themeSlice";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  // Memoized theme applicator to prevent redundant calls
  const applyTheme = useCallback((mode: ThemeMode, system: "light" | "dark" | null | undefined) => {
    if (mode === "system") {
      setColorScheme(system || "light");
    } else {
      setColorScheme(mode);
    }
  }, [setColorScheme]);

  useEffect(() => {
    async function prepare() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY) as ThemeMode | null;
        if (savedTheme) {
          dispatch(syncTheme(savedTheme));
          // Apply saved theme immediately
          applyTheme(savedTheme, systemColorScheme);
        } else {
          applyTheme("system", systemColorScheme);
        }
      } catch (e) {
        console.warn("Theme loading error:", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [dispatch, systemColorScheme, applyTheme]);

  // Sync theme when mode changes after init
  useEffect(() => {
    if (appIsReady) {
      applyTheme(themeMode, systemColorScheme);
    }
  }, [themeMode, systemColorScheme, appIsReady, applyTheme]);

  useEffect(() => {
    if (appIsReady) {
      // Small delay to ensure layout is painted before hiding splash
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
    </Stack>
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
