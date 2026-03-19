import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Appearance, useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import "../global.css";

import { initI18nPromise } from "../i18n"; // Initialize i18n
import { store } from "../store/store";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { syncLanguage } from "../store/languageSlice";
import { THEME_KEY, ThemeMode, syncTheme } from "../store/themeSlice";
import { RootState } from "../store/store";

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
        // Wait for i18n
        await initI18nPromise;
        dispatch(syncLanguage());

        // Load theme from storage
        const savedTheme = await AsyncStorage.getItem(THEME_KEY) as ThemeMode | null;
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
    if (themeMode === 'system') {
      setColorScheme(systemColorScheme || 'light');
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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
