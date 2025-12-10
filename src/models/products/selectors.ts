import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/createStore";

export const product = (state: RootState) => state.product;

export const selectProductById = createSelector(
  [product, (_: RootState, id: number) => id],
  (productsState, id) => productsState.byId[id]
);

export const selectAllProducts = createSelector(product, (p) => Object.values(p.byId));
