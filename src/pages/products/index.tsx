// src/pages/products/index.tsx
import { GetStaticProps } from "next";
import ProductsList from "@/components/products/products-list/ProductsList";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";

type Props = { products: Product[]; fetchedAt: string };

const ProductsIndex = ({ products, fetchedAt }: Props) => (
  <ProductsList products={products} fetchedAt={fetchedAt} title="Products" showTimestamp={false} />
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const products = await getAllProducts();
    return {
      props: {
        products,
        fetchedAt: new Date().toISOString(),
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: { products: [], fetchedAt: new Date().toISOString() },
      revalidate: 30,
    };
  }
};

export default ProductsIndex;
