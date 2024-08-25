import React, { useEffect, useState } from "react";

const SocketContext = React.createContext<WebSocket | null>(null);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newWs = new WebSocket('wss://dumdum12.azurewebsites.net/api/chat');
    setWs(newWs);

    console.log("WebSocket connection", newWs);

    newWs.onopen = () => {
      console.log('WebSocket is connected');
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newWs.onclose = () => {
      console.log('WebSocket is closed');
    };

    // Custom message handler
    newWs.onmessage = (event) => {
      console.log('Received data:', event.data);
    };

    // Clean up on component unmount
    return () => {
      newWs.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
  );
}

export default SocketContext;