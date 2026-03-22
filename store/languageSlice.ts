import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Updates from "expo-updates";
import { DevSettings, I18nManager, Platform } from "react-native";
import i18n, { LANGUAGE_KEY } from "../i18n";

export interface LanguageState {
  currentLanguage: string;
  isRTL: boolean;
}

const initialState: LanguageState = {
  currentLanguage: i18n.language || "en",
  isRTL: I18nManager.isRTL,
};

export const toggleLanguageAction = createAsyncThunk(
  "language/toggle",
  async (_, { getState, dispatch }) => {
    const state = getState() as { language: LanguageState };
    const newLanguage = state.language.currentLanguage === "en" ? "ar" : "en";
    const isRTL = newLanguage === "ar";

    // Persist language selection
    await AsyncStorage.setItem(LANGUAGE_KEY, newLanguage);

    // Update i18n instance
    await i18n.changeLanguage(newLanguage);

    // Set layout direction
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    // Handle platform-specific RTL updates
    if (Platform.OS === "web") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = newLanguage;
    }

    dispatch(setLanguage({ currentLanguage: newLanguage, isRTL }));

    // Native reload for RTL changes
    if (Platform.OS !== "web") {
      try {
        if (__DEV__) {
          // DevSettings.reload() is more reliable for RTL changes in Expo Go/Development
          DevSettings.reload();
        } else {
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.error("Failed to reload app for RTL change:", error);
      }
    }

    return { currentLanguage: newLanguage, isRTL };
  },
);

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<{ currentLanguage: string; isRTL: boolean }>,
    ) => {
      state.currentLanguage = action.payload.currentLanguage;
      state.isRTL = action.payload.isRTL;
    },
    syncLanguage: (state) => {
      state.currentLanguage = i18n.language;
      state.isRTL = I18nManager.isRTL;
    },
  },
});

export const { setLanguage, syncLanguage } = languageSlice.actions;

export default languageSlice.reducer;
