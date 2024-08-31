import React, { useEffect, useState, useCallback, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useSession } from "../hooks/useSession";

// Define the shape of our context
interface SocketContextType {
  ws: WebSocket | null;
  conversations: any[]; // Replace 'any' with your conversation type
  fetchConversations: () => void;
}

const SocketContext = React.createContext<SocketContextType | null>(null);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [conversations, setConversations] = useState<any[]>([]); // Replace 'any' with your conversation type
  const { session = '' , userId = '' } = useSession();
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    const newWs = new WebSocket('wss://dumdum12.azurewebsites.net/api/colloqui/chat?id=22', session);
    wsRef.current = newWs;
    setWs(newWs);

    newWs.onopen = () => {
      console.log('WebSocket is connected');
      fetchConversations();
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newWs.onclose = () => {
      console.log('WebSocket is closed');
    };

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);

      if (data.type === 'FETCH_CONVERSATIONS') {
        setConversations(data.data.conversations);
      }
      // Handle other message types as needed
    };
  }, [session]);

  const fetchConversations = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'FETCH_CONVERSATIONS',
        userId: userId
      }));
    } else {
      console.log('WebSocket is not open. Cannot fetch conversations.');
    }
  }, []);

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!');
      connectWebSocket();
    } else if (nextAppState === 'background') {
      console.log('App has gone to the background!');
      wsRef.current?.close();
    }
  }, [connectWebSocket]);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    // Initial connection
    connectWebSocket();

    // Clean up on component unmount
    return () => {
      appStateSubscription.remove();
      wsRef.current?.close();
    };
  }, [connectWebSocket, handleAppStateChange]);

  return (
    <SocketContext.Provider value={{ ws, conversations, fetchConversations }}>
      {children}
    </SocketContext.Provider>
  );
}
export default SocketContext;