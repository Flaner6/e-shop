import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
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

        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Your cart is empty.
          </Typography>
        </Box>

        <Button variant="contained" disabled>
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
