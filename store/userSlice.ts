import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserAddress {
  id: string;
  type: string;
  title: string;
  city: string;
  district: string;
  street: string;
  buildingNumber: string;
  floor: string;
  apartment: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  notes: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4?: string;
  brand?: string;
  phone?: string;
  isDefault: boolean;
}

export interface UserPreferences {
  favoriteCuisines: string[];
  allergies: string[];
  notifications: {
    push: boolean;
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
}

export interface CartItem {
  itemId: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  notes: string;
}

export interface OrderHistoryItem {
  orderId: string;
  restaurantId: string;
  status: string;
  date: string;
  total: number;
}

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
    full: string;
    ar: string;
  };
  email: string;
  phone: string;
  avatar: string;
  gender: string;
  language: string;
  isRTL: boolean;
  walletBalance: number;
  loyaltyPoints: number;
  addresses: UserAddress[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
  cart: CartItem[];
  orderHistory: OrderHistoryItem[];
  createdAt: string;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateWalletBalance: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.walletBalance = action.payload;
      }
    },
    updateLoyaltyPoints: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.loyaltyPoints = action.payload;
      }
    },
    addUserAddress: (state, action: PayloadAction<UserAddress>) => {
      if (state.currentUser) {
        // If the new address is default, update others
        if (action.payload.isDefault) {
          state.currentUser.addresses = state.currentUser.addresses.map(addr => ({ ...addr, isDefault: false }));
        }
        state.currentUser.addresses.push(action.payload);
      }
    }
  },
});

export const { setUser, clearUser, updateWalletBalance, updateLoyaltyPoints, addUserAddress } = userSlice.actions;

export default userSlice.reducer;
