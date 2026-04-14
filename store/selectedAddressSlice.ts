import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  id?: string;
  title?: string; // e.g., "Home", "Work", "Office"
  formattedAddress: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  street?: string;
  state?: string;
  city?: string;
}

export interface SelectedAddressState {
  selectedAddress: Address | null;
}

const initialState: SelectedAddressState = {
  selectedAddress: null,
};

export const selectedAddressSlice = createSlice({
  name: 'selectedAddress',
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<Address | null>) => {
      state.selectedAddress = action.payload;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
  },
});

export const { setSelectedAddress, clearSelectedAddress } = selectedAddressSlice.actions;

export default selectedAddressSlice.reducer;
