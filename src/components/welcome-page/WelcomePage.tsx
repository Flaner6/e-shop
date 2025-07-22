"use client";

import { Box, Typography, Paper, Button } from "@mui/material";
import { ChatWindow } from "@/components";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the E-Shop!
      </Typography>
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Start Shopping Today
        </Typography>
        <Typography paragraph color="text.secondary">
          Discover our amazing products and great deals
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button component={Link} href="/products" variant="contained" color="primary">
            Static Products
          </Button>
          <Button component={Link} href="/products-ssr" variant="outlined" color="primary">
            Server-side Products
          </Button>
        </Box>
      </Paper>
      <ChatWindow />
    </Box>
  );
};

export default WelcomePage;
