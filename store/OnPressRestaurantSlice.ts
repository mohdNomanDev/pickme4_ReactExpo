import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  restaurantId: string;
}

const initialState: CounterState = {
  restaurantId: "",
};

export const onPressRestaurantSlice = createSlice({
  name: "selectedRestaurant",
  initialState,
  reducers: {
    setRestaurantId: (state, action: PayloadAction<string>) => {
      state.restaurantId = action.payload;
    },
    removeRestaurantId: (state) => {
      state.restaurantId = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurantId, removeRestaurantId } = onPressRestaurantSlice.actions;

export default onPressRestaurantSlice.reducer;
