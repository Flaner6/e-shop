"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import {
  ChatContainer,
  MessagesContainer,
  UserMessage,
  BotMessage,
  InputContainer,
} from "./Chat.styled";

const Chat = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setInput("");
  };

  return (
    <ChatContainer elevation={3}>
      <MessagesContainer>
        {messages.map((msg, i) =>
          msg.isUser ? (
            <UserMessage key={i}>{msg.text}</UserMessage>
          ) : (
            <BotMessage key={i}>{msg.text}</BotMessage>
          )
        )}
      </MessagesContainer>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </InputContainer>
      </form>
    </ChatContainer>
  );
};

export default Chat;
