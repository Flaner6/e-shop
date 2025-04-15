"use client";

import { useState } from "react";
import { Box, Slide } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Chat } from "@/components";
import { ChatButton, ChatPaper, ChatHeader, ChatContent } from "./ChatWindow.styled";

const ChatWindow = () => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {!open && (
        <ChatButton onClick={toggleChat}>
          <ChatIcon />
        </ChatButton>
      )}

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <ChatPaper>
          <ChatHeader>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Chat
            </Box>
          </ChatHeader>
          <ChatContent>
            <Chat />
          </ChatContent>
        </ChatPaper>
      </Slide>
    </>
  );
};

export default ChatWindow;
