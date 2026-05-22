import { Product } from "@/types/product";
import type { NextApiRequest, NextApiResponse } from "next";

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

const normalizeProduct = (raw: FakeStoreProduct): Product => ({
  id: raw.id,
  title: raw.title,
  price: raw.price,
  description: raw.description,
  category: raw.category,
  image: raw.image,
  rating: raw.rating ? { rate: raw.rating.rate, count: raw.rating.count } : undefined,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      headers: { accept: "application/json" },
    });
    if (!response.ok) return res.status(response.status).json({ error: "Upstream error" });

    const raw = (await response.json()) as FakeStoreProduct[];
    const products = (Array.isArray(raw) ? raw : []).map(normalizeProduct);

    const rawQ = req.query.q;
    const q = (Array.isArray(rawQ) ? rawQ[0] : rawQ)?.toLowerCase().trim();
    const filtered = q
      ? products.filter(
          (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        )
      : products;

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=600");
    return res.status(200).json(filtered);
  } catch {
    return res.status(502).json({ error: "Upstream unavailable" });
  }
}
