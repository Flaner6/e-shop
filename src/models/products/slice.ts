import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

export type ProductsState = {
  byId: Record<number, Product>;
};

const initialState: ProductsState = {
  byId: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.byId[action.payload.id] = action.payload;
    },
    setProductsBatch: (state, action: PayloadAction<Product[]>) => {
      for (const p of action.payload) {
        state.byId[p.id] = p;
      }
    },
    clearProducts: (state) => {
      state.byId = {};
    },
  },
});

export const { setProduct, setProductsBatch, clearProducts } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
