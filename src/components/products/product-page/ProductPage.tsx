import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Container, Typography, Box, Chip, Rating, Button } from "@mui/material";
import { connect } from "react-redux";

import { addCartItem } from "@/models/cart/actions";
import { selectProductById } from "@/models/products/selectors";
import { getProductByIdRequested } from "@/models/products/actions";
import type { RootState } from "@/store/createStore";

type OwnProps = { productId: number };
type StateProps = { product?: Product };

type DispatchProps = {
  requestProduct: (id: number) => void;
  addToCart: (p: Product) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

const ProductPage: React.FC<Props> = ({ productId, product, requestProduct, addToCart }) => {
  useEffect(() => {
    if (!product) {
      requestProduct(productId);
    }
  }, [productId, product, requestProduct]);

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
        <Box sx={{ position: "relative", width: 200, height: 200, flexShrink: 0 }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="200px"
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>

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

const mapDispatchToProps: DispatchProps = {
  requestProduct: (id: number) => getProductByIdRequested({ id }),

  addToCart: (product: Product) =>
    addCartItem({
      id: String(product.id),
      title: product.title,
      price: product.price,
      image: product.image,
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
