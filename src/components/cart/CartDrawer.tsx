import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/models/cart/selectors";
import type { RootState } from "@/store/createStore";
import CartItem from "./CartItem";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const items = useSelector<RootState, ReturnType<typeof selectCartItems>>(selectCartItems);
  const subtotal = items.reduce((sum, it) => sum + it.price, 0);

  const handleRemove = (id: string) => {
    console.log("TODO: remove from cart:", id);
    // Future: dispatch(removeCartItem(id));
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
            items.map((it) => <CartItem key={it.id} item={it} onRemove={handleRemove} />)
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

export default CartDrawer;
