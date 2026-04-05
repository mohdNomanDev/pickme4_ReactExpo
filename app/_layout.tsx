import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { THEME_KEY, ThemeMode, syncTheme } from "../store/themeSlice";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  // 1. Initial Data Preparation
  useEffect(() => {
    async function prepare() {
      try {
        // Load theme from storage
        const savedTheme = (await AsyncStorage.getItem(
          THEME_KEY,
        )) as ThemeMode | null;
        if (savedTheme) {
          dispatch(syncTheme(savedTheme));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [dispatch]);

  // 2. Dynamic Theme Application
  useEffect(() => {
    if (themeMode === "system") {
      setColorScheme(systemColorScheme || "light");
    } else {
      setColorScheme(themeMode);
    }
  }, [themeMode, systemColorScheme, setColorScheme]);

  // 3. Splash Screen Management
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // Stability: Do NOT conditionally render the navigator based on app state/mode here 
  // to avoid unmounting the entire navigation tree, which breaks context on mobile.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
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
