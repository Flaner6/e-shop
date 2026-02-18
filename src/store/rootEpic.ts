import { combineEpics } from "redux-observable";

import { productsEpic } from "@/models/products/epics";

export const rootEpic = combineEpics(productsEpic);
