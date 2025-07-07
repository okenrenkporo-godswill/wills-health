// hooks/useChatSocket.ts
import { useEffect, useRef, useState } from "react";

export function useChatSocket(roomId: number, token: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/chat/${roomId}?token=${token}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onerror = (err) => console.error("WebSocket error", err);
    socket.onclose = () => console.log("WebSocket closed");

    return () => {
      socket.close();
    };
  }, [roomId, token]);

  const sendMessage = (msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return { messages, sendMessage };
}
