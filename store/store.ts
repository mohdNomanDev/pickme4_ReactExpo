import { configureStore } from "@reduxjs/toolkit";
import { bookmarkSlice } from "./bookmarkSlice";
import { languageSlice } from "./languageSlice";
import { onPressRestaurantSlice } from "./OnPressRestaurantSlice";
import selectedAddressReducer from "./selectedAddressSlice";
import {userSlice} from "./userSlice";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";
import appModeReducer from "./appModeSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    bookmark: bookmarkSlice.reducer,
    onPressRestaurant: onPressRestaurantSlice.reducer,
    selectedAddress: selectedAddressReducer,
    user: userSlice.reducer,
    cart: cartReducer,
    orders: ordersReducer,
    appMode: appModeReducer,
    message: messageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

