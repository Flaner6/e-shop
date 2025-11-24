import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import type { CartItem as CartItemType } from "@/models/cart/types";

interface CartItemProps {
  item: CartItemType;
  onRemove?: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onIncrement, onDecrement }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 2,
        mb: 2,
      }}
    >
      {item.image && (
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          sx={{
            width: 56,
            height: 56,
            objectFit: "contain",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      )}

      <Box flex={1} minWidth={0}>
        <Typography variant="subtitle2" noWrap title={item.title}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price.toFixed(2)}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <IconButton
            size="small"
            onClick={() => onDecrement?.(item.id)}
            aria-label="Decrease quantity"
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{item.quantity}</Typography>
          <IconButton
            size="small"
            onClick={() => onIncrement?.(item.id)}
            aria-label="Increase quantity"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {onRemove && (
        <IconButton size="small" onClick={() => onRemove(item.id)} aria-label="Remove item">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default CartItem;
