import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/models/cart/selectors";

import type { RootState } from "@/store/createStore";

import { AppBar, Badge, IconButton, Toolbar } from "@mui/material";
import CartDrawer from "../cart/CartDrawer";

import * as Styled from "./NavBar.styled";

interface NavBarProps {
  title?: string;
}

const NavBar: React.FC<NavBarProps> = ({ title = "e-shop" }) => {
  const [open, setOpen] = useState(false);

  const count = useSelector<RootState, number>(selectCartCount);

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Styled.TitleLink href="/" passHref>
            <Styled.NavTitle variant="h6">{title}</Styled.NavTitle>
          </Styled.TitleLink>
          <IconButton aria-label="Open cart" onClick={() => setOpen(true)}>
            <Badge badgeContent={count} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default NavBar;
