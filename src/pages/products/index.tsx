import { GetStaticProps } from "next";
import ProductsList from "@/components/products/products-list/ProductsList";

type Product = { id: number; title: string };

const ProductsIndex = ({ products, fetchedAt }: { products: Product[]; fetchedAt: string }) => (
  <ProductsList products={products} fetchedAt={fetchedAt} title="Products" showTimestamp={false} />
);

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
      fetchedAt: new Date().toLocaleTimeString(),
    },
    revalidate: 60,
  };
};

export default ProductsIndex;
