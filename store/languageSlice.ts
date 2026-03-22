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

    // Set layout direction internally
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    if (Platform.OS === "web") {
      // On Web, update DOM safely and dispatch immediately since CSS handles RTL automatically
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = newLanguage;
      dispatch(setLanguage({ currentLanguage: newLanguage, isRTL }));
    } else {
      // On Native, we DO NOT dispatch the state change yet.
      // Dispatching would cause a React re-render of components (e.g. text alignment) 
      // while the underlying Yoga layout engine is still tied to the old I18nManager state,
      // resulting in a visually broken layout before the reload occurs.
      
      setTimeout(async () => {
        try {
          if (__DEV__) {
            // DevSettings.reload() handles bridge reloads gracefully in development
            DevSettings.reload();
          } else {
            // Updates.reloadAsync() handles production bundle reloads
            await Updates.reloadAsync();
          }
        } catch (error) {
          console.error("Failed to reload app for RTL change:", error);
          // Fallback dispatch if reload somehow fails
          dispatch(setLanguage({ currentLanguage: newLanguage, isRTL }));
        }
      }, 50);
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
