import { combineEpics } from "redux-observable";
import { productsEpic } from "@/models/products/epics";
import { cartEpic } from "@/models/cart/epics";
import { searchEpic } from "@/models/search/epics";

export const rootEpic = combineEpics(productsEpic, cartEpic, searchEpic);
