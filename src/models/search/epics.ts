import { type Epic, combineEpics } from "redux-observable";
import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";
import type { RootState } from "@/store/createStore";
import type { Product } from "@/types/product";
import { searchQueryChanged, searchStarted, searchSucceeded, searchFailed } from "./slice";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

export const searchProductsEpic: Epic<unknown, unknown, RootState> = (action$) =>
  action$.pipe(
    filter(searchQueryChanged.match),
    map((action) => action.payload.query.trim()),
    debounceTime(DEBOUNCE_MS),
    distinctUntilChanged(),
    filter((q) => q.length >= MIN_QUERY_LENGTH),
    switchMap((q) =>
      fromFetch(`/api/products?q=${encodeURIComponent(q)}`).pipe(
        switchMap(async (res) => {
          if (!res.ok) throw new Error(`API ${res.status}`);
          const products = (await res.json()) as Product[];
          return searchSucceeded({ results: products });
        }),
        startWith(searchStarted()),
        catchError((err: Error) => of(searchFailed({ error: err.message })))
      )
    )
  );

export const searchEpic = combineEpics(searchProductsEpic);
