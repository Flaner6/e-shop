import { GetStaticPaths, GetStaticProps } from "next";
import ProductPage from "@/components/products/product-page/ProductPage";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

const ProductDetail = ({ product }: { product: Product }) => {
  return <ProductPage product={product} />;
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  const paths = products.map((product: { id: number }) => ({
    params: { id: product.id.toString() },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return { notFound: true };
  const product = await res.json();
  return {
    props: { product },
    revalidate: 60,
  };
};
