import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppMode = 'food' | 'ride';

interface AppModeState {
  mode: AppMode;
}

const initialState: AppModeState = {
  mode: 'food',
};

export const appModeSlice = createSlice({
  name: 'appMode',
  initialState,
  reducers: {
    setAppMode: (state, action: PayloadAction<AppMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setAppMode } = appModeSlice.actions;
export default appModeSlice.reducer;
