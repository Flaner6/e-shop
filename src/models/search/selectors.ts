import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/createStore";

export const search = (state: RootState) => state.search;

export const selectSearchQuery = createSelector(search, (s) => s.query);
export const selectSearchResults = createSelector(search, (s) => s.results);
export const selectSearchStatus = createSelector(search, (s) => s.status);
export const selectSearchError = createSelector(search, (s) => s.error);

export const selectIsSearchActive = createSelector(selectSearchQuery, (q) => q.trim().length >= 2);
