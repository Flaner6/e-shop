// src/store/createStore.ts
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@/models/cart/slice";
import { productsReducer } from "@/models/products/slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
