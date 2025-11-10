// src/store/createStore.ts
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@/models/cart/slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// ✅ typed helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
