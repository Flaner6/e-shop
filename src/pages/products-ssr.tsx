import { Button } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

type Product = { id: number; title: string };

export default function SSRDemo({
  products,
  fetchedAt,
  userAgent,
}: {
  products: Product[];
  fetchedAt: string;
  userAgent: string;
}) {
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    setClientTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Server-Side Rendering (SSR) Demo</h1>

      <p>
        <strong>Server time (on request):</strong> {fetchedAt}
      </p>
      <p>
        <strong>Client time (after hydration):</strong> {clientTime}
      </p>
      <p>
        <strong>User-Agent (from request headers):</strong> {userAgent}
      </p>

      <Button onClick={() => window.location.reload()} style={{ marginTop: "1rem" }}>
        🔄 Reload to Fetch Fresh Server Data
      </Button>

      <div
        style={{ marginTop: "2rem", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}
      >
        <p>
          <strong>What this teaches you:</strong>
          <br />
          This page is rendered <em>on every request</em> (SSR). Notice how the server-side time
          updates every time you reload the page, and how it can differ from the client time. This
          shows the data is not pre-built at build time, but fetched and rendered per request.
        </p>
      </div>

      <h2 style={{ marginTop: "2rem" }}>🛍️ Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
      fetchedAt: new Date().toLocaleTimeString(),
      userAgent: context.req.headers["user-agent"] || "Unknown",
    },
  };
}
