export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
  variant?: string;
};

export type CartState = {
  items: Record<string, CartItem>;
  itemCount: number;
  subtotal: number;
  changedAt: number | null;
};
