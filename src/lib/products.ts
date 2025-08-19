import type { Product } from "@/types/product";

export type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

const BASE = "https://fakestoreapi.com";

const normalize = (product: FakeStoreProduct): Product => {
  const { id, title, price, description, category, image, rating } = product;

  return {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: rating ? { rate: rating.rate, count: rating.count } : undefined,
  };
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`Upstream error ${res.status} for ${url}`);
  return res.json() as Promise<T>;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const data = await fetchJson<FakeStoreProduct[]>(`${BASE}/products`);
  return (Array.isArray(data) ? data : []).map(normalize);
};

export const getProductById = async (id: string | number): Promise<Product | null> => {
  const res = await fetch(`${BASE}/products/${id}`, { headers: { accept: "application/json" } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Upstream error ${res.status}`);
  return normalize(await res.json());
};
