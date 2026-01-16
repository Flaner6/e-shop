import { styled, Typography } from "@mui/material";
import Link from "next/link";

export const TitleLink = styled(Link)({
  textDecoration: "none",
});

export const NavTitle = styled(Typography)({
  cursor: "pointer",
  "&:hover": {
    opacity: 0.85,
  },
});
