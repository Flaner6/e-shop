import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import type { AppDispatch, RootState } from "@/store/createStore";
import { selectCartItems, selectCartSubtotal } from "@/models/cart/selectors";
import { removeAllOfProduct, incrementCartItem, decrementCartItem } from "@/models/cart/actions";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => selectCartItems(state));
  const subtotal = useSelector((state: RootState) => selectCartSubtotal(state));

  const handleRemove = (id: string) => dispatch(removeAllOfProduct(id));
  const handleIncrement = (id: string) => dispatch(incrementCartItem(id));
  const handleDecrement = (id: string) => dispatch(decrementCartItem(id));

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={4} width={360} display="flex" flexDirection="column" height="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Cart</Typography>
          <IconButton aria-label="Close cart" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

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

export default CartDrawer;
