import { ClientTimestamp } from "@/components";

type Product = { id: number; title: string };

export default function SSGDemo({
  products,
  fetchedAt,
}: {
  products: Product[];
  fetchedAt: string;
}) {
  return (
    <div>
      <h1>SSG Demo</h1>
      <p>Server-side fetched at (build time): {fetchedAt}</p>
      <ClientTimestamp />
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
      fetchedAt: new Date().toLocaleTimeString(),
    },
    revalidate: 60, // ISR support: optional
  };
}
