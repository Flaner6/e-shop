// src/pages/products/index.tsx
import Head from "next/head";
import { GetStaticProps } from "next";
import ProductsList from "@/components/products/products-list/ProductsList";
import type { Product } from "@/types/product";
import { getBaseUrl } from "@/lib/baseUrl";

type Props = { products: Product[]; fetchedAt: string };

const ProductsIndex = ({ products, fetchedAt }: Props) => (
  <>
    <Head>
      <title>Products — E-Shop</title>
      <meta name="description" content="Browse our full product catalog." />
      <meta property="og:title" content="Products — E-Shop" />
      <meta property="og:description" content="Browse our full product catalog." />
      <meta property="og:type" content="website" />
    </Head>
    <ProductsList
      products={products}
      fetchedAt={fetchedAt}
      title="Products"
      showTimestamp={false}
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const base = getBaseUrl(); // absolute origin
  const res = await fetch(`${base}/api/products`);
  if (!res.ok) throw new Error(`Internal API ${res.status}`);

  const products = (await res.json()) as Product[];
  return {
    props: { products, fetchedAt: new Date().toISOString() },
    revalidate: 60, // ISR
  };
};

export default ProductsIndex;
