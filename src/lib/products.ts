import type { Product } from "@/types/product";

const BASE = "https://fakestoreapi.com";

const normalize = (p: any): Product => {
  const { id, title, price, description, category, image, rating } = p;

  return {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: rating
      ? { rate: rating.rate, count: rating.count }
      : undefined,
  };
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const r = await fetch(url, { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error(`Upstream error ${r.status} for ${url}`);
  return r.json() as Promise<T>;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const data = await fetchJson<any[]>(`${BASE}/products`);
  return (Array.isArray(data) ? data : []).map(normalize);
};

export const getProductById = async (id: string | number): Promise<Product | null> => {
  const r = await fetch(`${BASE}/products/${id}`, { headers: { accept: "application/json" } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Upstream error ${r.status}`);
  return normalize(await r.json());
};