import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NavBar from "../nav-bar/NavBar";
import { hydrateCartRequested } from "@/models/cart/actions";
import type { AppDispatch } from "@/store/createStore";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(hydrateCartRequested());
  }, [dispatch]);

  return (
    <Box>
      <NavBar />
      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  );
};

export default Layout;
