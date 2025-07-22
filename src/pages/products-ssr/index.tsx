import { useState } from "react";
import { GetServerSideProps } from "next";
import { ClientTimestamp } from "@/components";
import { Button, Container, Typography, Box, List, ListItem } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReplayIcon from "@mui/icons-material/Replay";

type Product = { id: number; title: string };

export default function SSRDemo({
  products,
  fetchedAt,
}: {
  products: Product[];
  fetchedAt: string;
}) {
  const [tick, setTick] = useState(0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3">Server-Side Rendering (SSR) Demo</Typography>

      <Typography variant="body1">Server time (on request): {fetchedAt}</Typography>
      <ClientTimestamp key={tick} />

      <Box sx={{ mt: 2 }}>
        <Button onClick={() => window.location.reload()} variant="outlined">
          <RefreshIcon sx={{ mr: 1 }} /> Reload (fetch new server data)
        </Button>
        <Button onClick={() => setTick((t) => t + 1)} variant="outlined" sx={{ ml: 2 }}>
          <ReplayIcon sx={{ mr: 1 }} /> Re-render Client Only
        </Button>
      </Box>

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
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
      fetchedAt: new Date().toLocaleTimeString(),
    },
  };
};
