import { createAction } from "@reduxjs/toolkit";

export const getProductByIdRequested = createAction<{ id: number }>(
  "product/getProductByIdRequested"
);

export { setProduct, setProductsBatch, clearProduct } from "./slice";
