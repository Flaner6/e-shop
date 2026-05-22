// src/pages/products/index.tsx
import Head from "next/head";
import { GetStaticProps } from "next";
import { useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";

import ProductsList from "@/components/products/products-list/ProductsList";
import { SearchBar } from "@/components/products";
import type { Product } from "@/types/product";
import { getBaseUrl } from "@/lib/baseUrl";
import {
  selectIsSearchActive,
  selectSearchResults,
  selectSearchStatus,
} from "@/models/search/selectors";

type Props = { products: Product[]; fetchedAt: string };

const ProductsIndex = ({ products, fetchedAt }: Props) => {
  const isSearchActive = useSelector(selectIsSearchActive);
  const searchResults = useSelector(selectSearchResults);
  const searchStatus = useSelector(selectSearchStatus);

  const list = isSearchActive ? searchResults : products;
  const showEmpty = isSearchActive && searchStatus === "success" && searchResults.length === 0;

  return (
    <>
      <Head>
        <title>Products — E-Shop</title>
        <meta name="description" content="Browse our full product catalog." />
        <meta property="og:title" content="Products — E-Shop" />
        <meta property="og:description" content="Browse our full product catalog." />
        <meta property="og:type" content="website" />
      </Head>
      <Container sx={{ py: 4 }}>
        <SearchBar />
        {showEmpty ? (
          <Typography color="text.secondary">No products match your search.</Typography>
        ) : (
          <ProductsList
            products={list}
            fetchedAt={fetchedAt}
            title="Products"
            showTimestamp={false}
          />
        )}
      </Container>
    </>
  );
};

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
