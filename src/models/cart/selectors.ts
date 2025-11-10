import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/createStore";

export const cart = ({ cart }: RootState) => cart;

export const selectCartItems = createSelector(cart, (cart) => cart.items);
export const selectCartCount = createSelector(selectCartItems, (cart) => cart.length);
