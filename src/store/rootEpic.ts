import { combineEpics } from "redux-observable";
import { productsEpic } from "@/models/products/epics";
import { cartEpic } from "@/models/cart/epics";

export const rootEpic = combineEpics(productsEpic, cartEpic);
