import { Product } from "@/types/product";
import { Container, Typography, Box, Chip, Rating, Button } from "@mui/material";
import { connect } from "react-redux";

import { addCartItem } from "@/models/cart/actions";
import { selectProductById } from "@/models/products/selectors";
import type { RootState } from "@/store/createStore";

type OwnProps = { productId: number };
type StateProps = { product?: Product };
type DispatchProps = { addToCart: (p: Product) => void };

type Props = OwnProps & StateProps & DispatchProps;

const ProductPage: React.FC<Props> = ({ product, addToCart }) => {
  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading product...</Typography>
      </Container>
    );
  }

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

          {product.rating && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Rating value={product.rating.rate} precision={0.1} readOnly />
              <Typography variant="body2">
                ({product.rating.rate} / 5, {product.rating.count} reviews)
              </Typography>
            </Box>
          )}

          <Button variant="contained" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  product: selectProductById(state, ownProps.productId),
});

const addToCart = (product: Product) =>
  addCartItem({
    id: String(product.id),
    title: product.title,
    price: product.price,
    image: product.image,
  });

const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
