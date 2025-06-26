"use client";
import { useEffect, useState } from "react";

const ClientTimestamp = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString());
  }, []);

  return <p>Client-side timestamp: {timestamp}</p>;
};
export default ClientTimestamp;
