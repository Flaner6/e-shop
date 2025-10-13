import { Box, Container } from "@mui/material";
import NavBar from "../nav-bar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box>
    <NavBar />
    <Container sx={{ py: 4 }}>{children}</Container>
  </Box>
);

export default Layout;
