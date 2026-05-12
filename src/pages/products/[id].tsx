import Head from "next/head";
import { GetStaticPaths } from "next";

import ConnectedProductPage from "@/components/products/product-page/ProductPage";
import type { Product } from "@/types/product";
import { getBaseUrl } from "@/lib/baseUrl";
import { setProduct } from "@/models/products/actions";
import { wrapper } from "@/store/createStore";

type ProductDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const description = product.description.slice(0, 160);
  return (
    <>
      <Head>
        <title>{`${product.title} — E-Shop`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
      </Head>
      <ConnectedProductPage productId={product.id} />
    </>
  );
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/products`);
  const list = (await res.json()) as { id: number }[];

  const paths = list.map((p) => ({ params: { id: String(p.id) } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const idParam = Array.isArray(params?.id) ? params!.id[0] : params?.id;
  if (!idParam) return { notFound: true };

  const base = getBaseUrl();
  const res = await fetch(`${base}/api/products/${idParam}`);

  if (res.status === 404) return { notFound: true };
  if (!res.ok) throw new Error(`Internal API ${res.status}`);

  const product = (await res.json()) as Product;

  store.dispatch(setProduct(product));

  return {
    props: { product },
    revalidate: 60,
  };
});
