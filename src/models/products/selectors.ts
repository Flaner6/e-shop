import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/createStore";

export const products = (state: RootState) => state.products;

export const selectProductById = createSelector(
  [products, (_: RootState, id: number) => id],
  (productsState, id) => productsState.byId[id]
);

export const selectAllProducts = createSelector(products, (p) => Object.values(p.byId));
