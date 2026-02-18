import { type Epic, combineEpics } from "redux-observable";
import { filter, tap, ignoreElements } from "rxjs/operators";
import type { RootState } from "@/store/createStore";
import { getProductByIdRequested } from "./actions";

export const logProductRequestsEpic: Epic<unknown, unknown, RootState> = (action$) =>
  action$.pipe(
    filter(getProductByIdRequested.match),
    tap((action) => {
      console.log("Epic saw product request:", action.payload);
    }),
    ignoreElements()
  );

export const productsEpic = combineEpics(logProductRequestsEpic);
