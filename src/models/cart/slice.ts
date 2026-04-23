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
    addCartItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const { id, title, price, image } = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id,
          title,
          price,
          image,
          quantity: 1,
        });
      }
    },

    incrementCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((it) => it.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementCartItem: (state, action: PayloadAction<string>) => {
      const idx = state.items.findIndex((it) => it.id === action.payload);
      if (idx === -1) return;

      const item = state.items[idx];
      if (item.quantity <= 1) {
        state.items.splice(idx, 1);
      } else {
        item.quantity -= 1;
      }
    },

    removeAllOfProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addCartItem,
  incrementCartItem,
  decrementCartItem,
  removeAllOfProduct,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
