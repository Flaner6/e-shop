// src/pages/products/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ConnectedProductPage from "@/components/products/product-page/ProductPage";
import type { Product } from "@/types/product";
import { getBaseUrl } from "@/lib/baseUrl";
import { setProduct } from "@/models/products/actions";
import type { AppDispatch } from "@/store/createStore";

const ProductDetail = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setProduct(product));
  }, [dispatch, product]);

  return <ConnectedProductPage productId={product.id} />;
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/products`);
  const list = (await res.json()) as { id: number }[];

  const paths = list.map((p) => ({ params: { id: String(p.id) } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{ product: Product }> = async ({ params }) => {
  const id = Array.isArray(params?.id) ? params!.id[0] : params?.id;
  if (!id) return { notFound: true };

  const base = getBaseUrl();
  const res = await fetch(`${base}/api/products/${id}`);

  if (res.status === 404) return { notFound: true };
  if (!res.ok) throw new Error(`Internal API ${res.status}`);

  const product = (await res.json()) as Product;

  return { props: { product }, revalidate: 60 };
};
