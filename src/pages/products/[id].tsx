import { GetStaticPaths, GetStaticProps } from "next";
import ProductPage from "@/components/products/product-page/ProductPage";
import { getAllProducts, getProductById } from "@/lib/products";
import type { Product } from "@/types/product";

const ProductDetail = ({ product }: { product: Product }) => {
  return <ProductPage product={product} />;
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await getAllProducts();
    const paths = products.map((p) => ({ params: { id: String(p.id) } }));
    return { paths, fallback: "blocking" };
  } catch {

    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<{ product: Product }> = async ({ params }) => {
  const id = Array.isArray(params?.id) ? params!.id[0] : params?.id;
  if (!id || isNaN(Number(id))) return { notFound: true };

  const product = await getProductById(id);
  if (!product) return { notFound: true };

  return {
    props: { product },
    revalidate: 60,
  };
};
