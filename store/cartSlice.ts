import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CartItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  restaurantId?: string; // Cross-reference
}

export interface CartRestaurant {
  restaurantId: string;
  items: CartItem[];
}

export interface CartState {
  cart: CartRestaurant[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartRestaurant[]>) => {
      state.cart = action.payload;
    },
    addItem: (state, action: PayloadAction<{ restaurantId: string; item: Omit<CartItem, "quantity"> }>) => {
      const { restaurantId, item } = action.payload;
      let restaurant = state.cart.find((r) => r.restaurantId === restaurantId);

      if (!restaurant) {
        restaurant = { restaurantId, items: [] };
        state.cart.push(restaurant);
      }

      const existingItem = restaurant.items.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        restaurant.items.push({ ...item, quantity: 1, restaurantId });
      }
    },

    increaseQty: (state, action: PayloadAction<{ restaurantId: string; itemName: string }>) => {
      const { restaurantId, itemName } = action.payload;
      const restaurant = state.cart.find((r) => r.restaurantId === restaurantId);
      const item = restaurant?.items.find((i) => i.name === itemName);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action: PayloadAction<{ restaurantId: string; itemName: string }>) => {
      const { restaurantId, itemName } = action.payload;
      const restaurantIndex = state.cart.findIndex((r) => r.restaurantId === restaurantId);
      if (restaurantIndex === -1) return;

      const restaurant = state.cart[restaurantIndex];
      const itemIndex = restaurant.items.findIndex((i) => i.name === itemName);
      if (itemIndex === -1) return;

      const item = restaurant.items[itemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        restaurant.items.splice(itemIndex, 1);
      }

      if (restaurant.items.length === 0) {
        state.cart.splice(restaurantIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
});

// SELECTORS
const selectCart = (state: RootState) => state.cart.cart;

/**
 * Optimized Selector: Calculate total items across all restaurants
 */
export const selectTotalItemCount = createSelector(
  [selectCart],
  (cart) => cart.reduce((total, rest) => total + rest.items.reduce((sum, item) => sum + item.quantity, 0), 0)
);

/**
 * Optimized Selector: Calculate subtotal
 */
export const selectCartSubtotal = createSelector(
  [selectCart],
  (cart) => cart.reduce((total, rest) => total + rest.items.reduce((sum, item) => sum + (item.price * item.quantity), 0), 0)
);

/**
 * Optimized Selector: Get items for a specific restaurant
 */
export const selectRestaurantItems = (restaurantId: string) => createSelector(
  [selectCart],
  (cart) => cart.find(r => r.restaurantId === restaurantId)?.items || []
);

export const { setCart, addItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
