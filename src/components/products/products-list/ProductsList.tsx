import { Container, Typography, List, ListItem } from "@mui/material";
import { ClientTimestamp } from "@/components";
import Link from "next/link";

type Product = { id: number; title: string };

interface ProductsListProps {
  products: Product[];
  fetchedAt?: string;
  title?: string;
  showTimestamp?: boolean;
}

export const ProductsList = ({
  products,
  fetchedAt,
  title = "Product List",
  showTimestamp = true,
}: ProductsListProps) => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3">{title}</Typography>
      {fetchedAt && <Typography variant="body1">Server-side fetched at: {fetchedAt}</Typography>}
      {showTimestamp && <ClientTimestamp />}
      <Typography variant="h4" sx={{ mt: 4 }}>
        🛍️ Product List
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProductsList;
