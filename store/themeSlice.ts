import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "system",
};

export const THEME_KEY = "user-theme-preference";

export const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === "string" && THEME_MODES.includes(value as ThemeMode);

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    syncTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme, syncTheme } = themeSlice.actions;

export default themeSlice.reducer;
