import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";

export const ChatContainer = styled(Paper)(({ theme: { spacing } }) => ({
  padding: spacing(2),
  height: "500px",
  display: "flex",
  flexDirection: "column",
  gap: spacing(2),
}));

export const MessagesContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const MessageBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  maxWidth: "70%",
  wordBreak: "break-word",
}));

export const UserMessage = styled(MessageBox)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  alignSelf: "flex-end",
}));

export const BotMessage = styled(MessageBox)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  alignSelf: "flex-start",
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));
