import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  restaurantId: number;
}

const initialState: CounterState = {
  restaurantId: 0,
};

export const onPressRestaurantSlice = createSlice({
  name: "selectedRestaurant",
  initialState,
  reducers: {
    setRestaurantId: (state, action: PayloadAction<number>) => {
      state.restaurantId = action.payload;
    },
    removeRestaurantId: (state) => {
      state.restaurantId = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurantId, removeRestaurantId } = onPressRestaurantSlice.actions;

export default onPressRestaurantSlice.reducer;
