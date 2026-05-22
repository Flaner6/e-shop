import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";
import type { SearchState } from "./types";

const initialState: SearchState = {
  query: "",
  results: [],
  status: "idle",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchQueryChanged: (state, action: PayloadAction<{ query: string }>) => {
      state.query = action.payload.query;
    },
    searchStarted: (state) => {
      state.status = "loading";
      state.error = undefined;
    },
    searchSucceeded: (state, action: PayloadAction<{ results: Product[] }>) => {
      state.status = "success";
      state.results = action.payload.results;
    },
    searchFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.status = "error";
      state.error = action.payload.error;
    },
    searchCleared: (state) => {
      state.query = "";
      state.results = [];
      state.status = "idle";
      state.error = undefined;
    },
  },
});

export const { searchQueryChanged, searchStarted, searchSucceeded, searchFailed, searchCleared } =
  searchSlice.actions;

export const searchReducer = searchSlice.reducer;
