import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface bookmarkState {
  value: number[];
}

const initialState: bookmarkState = {
  value: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    toogleBookmark: (state, action: PayloadAction<number>) => {
      if (state.value.includes(action.payload)) {
        state.value = state.value.filter((id) => id !== action.payload);
      } else {
        state.value.push(action.payload);
      }
    },
  },
});

export const IsBookmarked = (
  state: { bookmark: bookmarkState },
  id: number,
) => {
  return state.bookmark.value.includes(id);
};

// Action creators are generated for each case reducer function
export const { toogleBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
