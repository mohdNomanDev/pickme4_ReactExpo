import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: any;
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
    addItem: (
      state,
      action: PayloadAction<{ restaurantId: string; item: Omit<CartItem, "quantity"> }>
    ) => {
      const { restaurantId, item } = action.payload;

      const restaurant = state.cart.find((r) => r.restaurantId === restaurantId);

      if (restaurant) {
        const existingItem = restaurant.items.find((i) => i.name === item.name);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          restaurant.items.push({ ...item, quantity: 1 });
        }
      } else {
        state.cart.push({
          restaurantId,
          items: [{ ...item, quantity: 1 }],
        });
      }
    },

    increaseQty: (
      state,
      action: PayloadAction<{ restaurantId: string; itemName: string }>
    ) => {
      const { restaurantId, itemName } = action.payload;

      const restaurant = state.cart.find((r) => r.restaurantId === restaurantId);
      const item = restaurant?.items.find((i) => i.name === itemName);

      if (item) item.quantity += 1;
    },

    decreaseQty: (
      state,
      action: PayloadAction<{ restaurantId: string; itemName: string }>
    ) => {
      const { restaurantId, itemName } = action.payload;

      const restaurant = state.cart.find((r) => r.restaurantId === restaurantId);
      const itemIndex = restaurant?.items.findIndex((i) => i.name === itemName);

      if (itemIndex !== undefined && itemIndex !== -1) {
        const item = restaurant!.items[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          restaurant!.items.splice(itemIndex, 1);
        }
      }

      if (restaurant && restaurant.items.length === 0) {
        state.cart = state.cart.filter((r) => r.restaurantId !== restaurantId);
      }
    },
  },
});

export const { setCart, addItem, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
