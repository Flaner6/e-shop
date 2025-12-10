import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { cartReducer } from "@/models/cart/slice";
import { productsReducer } from "@/models/products/slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      product: productsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
