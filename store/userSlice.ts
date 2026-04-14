import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserAddress {
  id: string;
  type: string;
  title: string;
  state: string;
  city: string;
  street: string;
  buildingNumber: string;
  floor: string;
  apartment: string;
  postalCode: string;
  address?: string;
  country?: string;
  countryCode?: string;
  formattedAddress?: string;
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
  id?: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  image?: string;
}

export interface CartGroup {
  restaurantId: string;
  items: CartItem[];
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
  language: string;walletBalance: number;
  loyaltyPoints: number;
  addresses: UserAddress[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
  cart: CartGroup[];
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
    },
    updateUserAddress: (state, action: PayloadAction<UserAddress>) => {
      if (state.currentUser) {
        const index = state.currentUser.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          if (action.payload.isDefault) {
            state.currentUser.addresses = state.currentUser.addresses.map(addr => ({ ...addr, isDefault: false }));
          }
          state.currentUser.addresses[index] = action.payload;
        }
      }
    },
    updateUserProfile: (state, action: PayloadAction<{ firstName?: string; lastName?: string; email?: string; phone?: string }>) => {
      if (state.currentUser) {
        const { firstName, lastName, email, phone } = action.payload;
        if (firstName !== undefined) state.currentUser.name.first = firstName;
        if (lastName !== undefined) state.currentUser.name.last = lastName;
        if (email !== undefined) state.currentUser.email = email;
        if (phone !== undefined) state.currentUser.phone = phone;
        
        // Update full name
        state.currentUser.name.full = `${state.currentUser.name.first} ${state.currentUser.name.last}`.trim();
      }
    }
  },
});

export const { 
  setUser, 
  clearUser, 
  updateWalletBalance, 
  updateLoyaltyPoints, 
  addUserAddress, 
  updateUserAddress,
  updateUserProfile 
} = userSlice.actions;

export default userSlice.reducer;
