import { styled } from "@mui/material/styles";
import { IconButton, Paper, Box } from "@mui/material";

export const ChatButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: 16,
  right: 16,
  zIndex: 1500,
  backgroundColor: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const ChatPaper = styled(Paper)({
  position: "fixed",
  bottom: 16,
  right: 16,
  width: "300px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  zIndex: 1500,
});

export const ChatHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ChatContent = styled(Box)({
  flex: 1,
  overflowY: "auto",
});
