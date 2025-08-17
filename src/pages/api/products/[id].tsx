import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  // 1) Read the dynamic param from the URL: /api/products/123 → id = "123"
  const raw = req.query.id;
  const id = Array.isArray(raw) ? raw[0] : raw; // safety: Next can give arrays

  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  try {
    // 2) Proxy to the upstream single-product endpoint
    const r = await fetch(`https://fakestoreapi.com/products/${id}`);
    // 3) Map upstream statuses to ours
    if (r.status === 404) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (!r.ok) {
      res.status(r.status).json({ error: "Upstream error" });
      return;
    }
    // 4) Forward the JSON body if OK
    const data = await r.json();
    res.status(200).json(data);
  } catch {
    res.status(502).json({ error: "Upstream unavailable" });
  }
}
