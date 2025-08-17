import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1) Only allow GET for this simple route
  if (req.method !== "GET") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    // 2) Fetch from the upstream API (Fake Store)
    const r = await fetch("https://fakestoreapi.com/products");
    // 3) If upstream fails, bubble up an error quickly
    if (!r.ok) {
      res.status(r.status).json({ error: "Upstream error" });
      return;
    }
    // 4) Parse JSON from upstream and return it as-is
    const data = await r.json();
    res.status(200).json(data);
  } catch {
    // 5) Network/other errors
    res.status(502).json({ error: "Upstream unavailable" });
  }
}
