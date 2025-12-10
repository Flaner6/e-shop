import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { Product } from "@/types/product";
import { HydrateAction } from "@/store/types";

export type ProductsState = {
  byId: Record<number, Product>;
};

const initialState: ProductsState = {
  byId: {},
};

const productsSlice = createSlice({
  name: "product",
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
    clearProduct: (state) => {
      state.byId = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      const incoming = action.payload.product as ProductsState | undefined;
      if (!incoming) return state;
      return {
        ...state,
        ...incoming,
      };
    });
  },
});

export const { setProduct, setProductsBatch, clearProduct } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
