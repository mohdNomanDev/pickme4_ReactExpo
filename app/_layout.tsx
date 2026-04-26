import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { isThemeMode, THEME_KEY, syncTheme } from "../store/themeSlice";
import MessageToast from "@/components/ui/MessageToast";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const setColorSchemeRef = useRef(setColorScheme);
  const [appIsReady, setAppIsReady] = useState(false);

  const isDark = colorScheme === "dark";
  const systemBackgroundColor = useMemo(
    () => (isDark ? "#0a0a0a" : "#f8f7f5"),
    [isDark],
  );

  useEffect(() => {
    setColorSchemeRef.current = setColorScheme;
  }, [setColorScheme]);

  useEffect(() => {
    let isMounted = true;

    async function prepare() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        const initialTheme = isThemeMode(savedTheme) ? savedTheme : "system";

        dispatch(syncTheme(initialTheme));
        setColorSchemeRef.current(initialTheme);
      } catch (e) {
        console.warn("Theme loading error:", e);
        dispatch(syncTheme("system"));
        setColorSchemeRef.current("system");
      } finally {
        if (isMounted) {
          setAppIsReady(true);
        }
      }
    }

    prepare();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Sync theme when mode changes after init
  useEffect(() => {
    if (appIsReady) {
      setColorSchemeRef.current(themeMode);
    }
  }, [themeMode, appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      SystemUI.setBackgroundColorAsync(systemBackgroundColor).catch((error) => {
        console.warn("System UI theme error:", error);
      });
    }
  }, [appIsReady, systemBackgroundColor]);

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
    <>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={systemBackgroundColor}
      />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="Food" />
        <Stack.Screen name="restaurant" />
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
