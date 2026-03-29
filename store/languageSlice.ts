import { createSlice } from "@reduxjs/toolkit";

export interface LanguageState {
  currentLanguage: string;
}

const initialState: LanguageState = {
  currentLanguage: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {},
});

export default languageSlice.reducer;
