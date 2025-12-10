import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "./createStore";

export type HydrateAction = {
  type: typeof HYDRATE;
  payload: RootState;
};
