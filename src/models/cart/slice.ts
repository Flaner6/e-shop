import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./types";

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
