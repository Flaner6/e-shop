import { ClientTimestamp } from "@/components";
import { Container, List, ListItem, Typography } from "@mui/material";
import { GetStaticProps } from "next";

type Product = { id: number; title: string };

export const SSGDemo = ({ products, fetchedAt }: { products: Product[]; fetchedAt: string }) => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3">SSG Demo</Typography>
      <Typography variant="body1">Server-side fetched at (build time): {fetchedAt}</Typography>
      <ClientTimestamp />
      <Typography variant="h4" sx={{ mt: 4 }}>
        🛍️ Product List
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>{product.title}</ListItem>
        ))}
      </List>
    </Container>
  );
};

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

export default SSGDemo;
