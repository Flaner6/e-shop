import { Container, Typography, Box, Chip, Rating } from "@mui/material";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export const ProductPage = ({ product }: { product: Product }) => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{ maxWidth: 200, maxHeight: 200, objectFit: "contain" }}
        />
        <Box>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Chip label={product.category} sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={product.rating.rate} precision={0.1} readOnly />
            <Typography variant="body2">
              ({product.rating.rate} / 5, {product.rating.count} reviews)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductPage;
