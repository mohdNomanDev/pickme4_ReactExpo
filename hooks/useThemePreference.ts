import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import { setTheme, THEME_KEY, ThemeMode } from "@/store/themeSlice";

export function useThemePreference() {
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const { colorScheme, setColorScheme } = useColorScheme();
  const setColorSchemeRef = useRef(setColorScheme);

  useEffect(() => {
    setColorSchemeRef.current = setColorScheme;
  }, [setColorScheme]);

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      dispatch(setTheme(mode));
      setColorSchemeRef.current(mode);
      AsyncStorage.setItem(THEME_KEY, mode).catch((error) => {
        console.warn("Theme persistence error:", error);
      });
    },
    [dispatch],
  );

  return {
    colorScheme: colorScheme ?? "light",
    isDark: colorScheme === "dark",
    setThemeMode,
    themeMode,
  };
}
