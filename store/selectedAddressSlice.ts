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
  locationSource: "saved" | "device";
}

const initialState: SelectedAddressState = {
  selectedAddress: null,
  locationSource: "device", // Default to device
};

export const selectedAddressSlice = createSlice({
  name: 'selectedAddress',
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<Address | null>) => {
      state.selectedAddress = action.payload;
      state.locationSource = action.payload ? "saved" : "device";
    },
    setLocationSource: (state, action: PayloadAction<"saved" | "device">) => {
      state.locationSource = action.payload;
      if (action.payload === "device") {
        state.selectedAddress = null;
      }
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
      state.locationSource = "device";
    },
  },
});

export const { setSelectedAddress, setLocationSource, clearSelectedAddress } = selectedAddressSlice.actions;

export default selectedAddressSlice.reducer;
