import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { createEpicMiddleware } from "redux-observable";

import { cartReducer } from "@/models/cart/slice";
import { productsReducer } from "@/models/products/slice";
import { searchReducer } from "@/models/search/slice";
import { rootEpic } from "./rootEpic";

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productsReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  const epicMiddleware = createEpicMiddleware<unknown, unknown, RootState>();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(epicMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  epicMiddleware.run(rootEpic);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
