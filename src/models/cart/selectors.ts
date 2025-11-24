import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/createStore";

export const cart = ({ cart }: RootState) => cart;

export const selectCartItems = createSelector(cart, (c) => c.items);

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((total, it) => total + it.quantity, 0)
);

export const selectCartSubtotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, it) => sum + it.price * it.quantity, 0)
);
