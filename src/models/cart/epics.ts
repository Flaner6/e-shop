import { type Epic, combineEpics } from "redux-observable";
import { filter, tap, ignoreElements, map } from "rxjs/operators";
import { debounceTime } from "rxjs/operators";
import type { RootState } from "@/store/createStore";
import {
  addCartItem,
  incrementCartItem,
  decrementCartItem,
  removeAllOfProduct,
  clearCart,
  setCartItems,
} from "./slice";
import { hydrateCartRequested } from "./actions";
import { selectCartItems } from "./selectors";

const CART_STORAGE_KEY = "e-shop-cart";

export const persistCartEpic: Epic<unknown, unknown, RootState> = (action$, state$) =>
  action$.pipe(
    filter(
      (action) =>
        addCartItem.match(action) ||
        incrementCartItem.match(action) ||
        decrementCartItem.match(action) ||
        removeAllOfProduct.match(action) ||
        clearCart.match(action)
    ),
    debounceTime(200),
    tap(() => {
      if (typeof window === "undefined") return;

      const state = state$.value;
      const items = selectCartItems(state);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }),
    ignoreElements()
  );

export const hydrateCartEpic: Epic<unknown, unknown, RootState> = (action$) =>
  action$.pipe(
    filter(hydrateCartRequested.match),
    map(() => {
      if (typeof window === "undefined") {
        return setCartItems([]);
      }

      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        return setCartItems([]);
      }

      try {
        const items = JSON.parse(raw);
        return setCartItems(Array.isArray(items) ? items : []);
      } catch {
        return setCartItems([]);
      }
    })
  );

export const cartEpic = combineEpics(persistCartEpic, hydrateCartEpic);
