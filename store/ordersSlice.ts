import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Rider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plateNumber: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface ActiveOrder {
  orderId: string;
  restaurantId: string;
  restaurantName: string;
  itemsCount: number;
  status: string;
  statusLabel: string;
  estimatedDeliveryTime: string;
  remainingTime: number;
  progress: number;
  deliveryType: string;
  rider: Rider | null;
  actions: {
    canContact: boolean;
    canTrack: boolean;
  };
  createdAt: string;
}

export interface OrderHistory {
  orderId: string;
  restaurantId: string;
  restaurantName: string;
  status: string;
  statusLabel: string;
  itemsCount: number;
  totalAmount: number;
  currency: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  actions: {
    canReorder: boolean;
    canRate?: boolean;
    canRetry?: boolean;
  };
}

interface OrdersState {
  activeOrders: ActiveOrder[];
  orderHistory: OrderHistory[];
  activeTab: "active" | "history";
}

const initialState: OrdersState = {
  activeOrders: [],
  orderHistory: [],
  activeTab: "active",
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{ activeOrders: ActiveOrder[]; orderHistory: OrderHistory[] }>
    ) => {
      state.activeOrders = action.payload.activeOrders;
      state.orderHistory = action.payload.orderHistory;
    },
    setActiveTab: (state, action: PayloadAction<"active" | "history">) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setOrders, setActiveTab } = ordersSlice.actions;
export default ordersSlice.reducer;
