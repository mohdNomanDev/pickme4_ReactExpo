import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageType = "success" | "error" | "info";
export type MessagePosition = "top" | "bottom";

interface MessageState {
  visible: boolean;
  message: string;
  type: MessageType;
  position: MessagePosition;
  duration: number;
}

const initialState: MessageState = {
  visible: false,
  message: "",
  type: "info",
  position: "top",
  duration: 3000,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (
      state,
      action: PayloadAction<{
        message: string;
        type?: MessageType;
        position?: MessagePosition;
        duration?: number;
      }>
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
      state.position = action.payload.position || "top";
      state.duration = action.payload.duration || 3000;
    },
    hideMessage: (state) => {
      state.visible = false;
    },
  },
});

export const { showMessage, hideMessage } = messageSlice.actions;
export default messageSlice.reducer;
