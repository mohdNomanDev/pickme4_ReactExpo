import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
};

const initialState: ThemeState = {
  mode: 'system',
};

export const THEME_KEY = 'user-theme-preference';

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // Persist to storage
      AsyncStorage.setItem(THEME_KEY, action.payload);
    },
    syncTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    }
  },
});

export const { setTheme, syncTheme } = themeSlice.actions;

export default themeSlice.reducer;
