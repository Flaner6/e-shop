import { createAction } from "@reduxjs/toolkit";

export const hydrateCartRequested = createAction("cart/hydrateCartRequested");

export {
  addCartItem,
  incrementCartItem,
  decrementCartItem,
  removeAllOfProduct,
  clearCart,
  setCartItems,
} from "./slice";
