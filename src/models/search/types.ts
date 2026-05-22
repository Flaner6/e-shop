import type { Product } from "@/types/product";

export type SearchStatus = "idle" | "loading" | "success" | "error";

export type SearchState = {
  query: string;
  results: Product[];
  status: SearchStatus;
  error?: string;
};
