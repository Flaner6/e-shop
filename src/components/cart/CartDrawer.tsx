import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";

import CartItem from "./CartItem";
import type { AppDispatch, RootState } from "@/store/createStore";
import { selectCartItems, selectCartSubtotal } from "@/models/cart/selectors";
import { removeAllOfProduct, incrementCartItem, decrementCartItem } from "@/models/cart/actions";
import type { CartItem as CartItemType } from "@/models/cart/types";

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

interface StateProps {
  items: CartItemType[];
  subtotal: number;
}

interface DispatchProps {
  removeProduct: (id: string) => void;
  incrementProduct: (id: string) => void;
  decrementProduct: (id: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const CartDrawer: React.FC<Props> = ({
  open,
  onClose,
  items,
  subtotal,
  removeProduct,
  incrementProduct,
  decrementProduct,
}) => {
  const handleRemove = (id: string) => {
    removeProduct(id);
  };

  const handleIncrement = (id: string) => {
    incrementProduct(id);
  };

  const handleDecrement = (id: string) => {
    decrementProduct(id);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={4} width={360} display="flex" flexDirection="column" height="100%">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Cart</Typography>
          <IconButton aria-label="Close cart" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Content */}
        <Box flex={1} overflow="auto">
          {items.length === 0 ? (
            <Box flex={1} display="flex" alignItems="center" justifyContent="center" height="100%">
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Your cart is empty.
              </Typography>
            </Box>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))
          )}
        </Box>

        {/* Footer */}
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1">Subtotal</Typography>
          <Typography variant="subtitle1">${subtotal.toFixed(2)}</Typography>
        </Box>
        <Button variant="contained" disabled={items.length === 0}>
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  items: selectCartItems(state),
  subtotal: selectCartSubtotal(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  removeProduct: (id: string) => dispatch(removeAllOfProduct(id)),
  incrementProduct: (id: string) => dispatch(incrementCartItem(id)),
  decrementProduct: (id: string) => dispatch(decrementCartItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDrawer);
