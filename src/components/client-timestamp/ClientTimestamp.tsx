"use client";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ClientTimestamp = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString());
  }, []);

  return (
    <Typography variant="body1" sx={{ mt: 1 }}>
      Client-side timestamp: {timestamp}
    </Typography>
  );
};
export default ClientTimestamp;
