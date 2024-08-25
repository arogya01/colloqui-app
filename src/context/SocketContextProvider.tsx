import React, { useEffect, useState } from "react";
import { useSession } from "../hooks/useSession";

const SocketContext = React.createContext<WebSocket | null>(null);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const options = {
    headers: {
      'Sec-WebSocket-Protocol': 'your-access-token'
    }
  };

  const {session = ''} = useSession();
  

  useEffect(() => {
    const newWs = new WebSocket('wss://dumdum12.azurewebsites.net/api/colloqui/chat?id=22',session);
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