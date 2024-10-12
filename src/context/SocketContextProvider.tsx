import React, { useEffect, useState, useCallback, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useSession } from "../hooks/useSession";
import { CHAT_EVENTS } from "../config";
import { useGetProfile } from "../hooks/services/useGetProfile";
import { transformConversations, transformMessages } from "../utils/dataFilterFn";

// Define the shape of our context
interface SocketContextType {
  ws: WebSocket | null;
  conversations: any[]; // Replace 'any' with your conversation type
  fetchConversations: () => void;
  currConversations: Array<Record<string, unknown>>;
  fetchMessages: (id:number) => void; 
  createConversations: ({participants, message, groupName}: {
    participants: number[],
  message: {
    senderId: number;
    value: string;
    valueType: any;
  },
  groupName?: string  
  }) => void;
}

const SocketContext = React.createContext<SocketContextType | null>(null);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [conversations, setConversations] = useState<any[]>([]); // Replace 'any' with your conversation type
  const [currConversation, setCurrConversation] = useState(); 
  const { session = '' } = useSession();
  const {data : {userId = '' }  = {}} = useGetProfile();
  const wsRef = useRef<WebSocket | null>(null);
  console.log('userId',userId);
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    const newWs = new WebSocket('wss://dumdum12.azurewebsites.net/api/colloqui/chat?id=19', session);
    wsRef.current = newWs;
    setWs(newWs);

    newWs.onopen = () => {
      console.log('WebSocket is connected');
      fetchConversations();
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
      if(error?.message){
        console.error("websocket error",error.message); 
      }
      ws?.close(); 

    };

    newWs.onclose = () => {
      console.log('WebSocket is closed');
    };

    newWs.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log('Received data:', response);

      if (response.type === 'FETCH_CONVERSATIONS') {
        setConversations(transformConversations(response.data.conversations));
      }

      if(response.type === "CONVERSATION_CREATED"){
        console.log('conversation recieved'); 
        console.log('resp.data',response.data);
        const {conversationId} = response.data;
        fetchMessages(conversationId); 
      }

      if(response.type === CHAT_EVENTS.FETCH_MESSAGES){
        console.log('message recieved',response);
        const {messages = []} = response.data || {};
        console.log('messages',messages);
        const transformedMessages = transformMessages(messages);
        setCurrConversation(transformedMessages);
      }

      if(response.type === CHAT_EVENTS.MESSAGE_SENT){
        console.log('message sent',response); 
        const {data : {
          createdMessage : {
            conversationId = '', 
          } = {}
        } = {}} = response || {};        
        fetchMessages(conversationId);  
      }
      // Handle other message types as needed
    };
  }, [session]);

  const fetchMessages = (id:number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('fetchMessages',id);
      wsRef.current.send(JSON.stringify({
        type: CHAT_EVENTS.FETCH_MESSAGES,
        conversationId: Number(id)
      }));
    } else {
      console.log('WebSocket is not open. Cannot fetch messages.');
    }
  }

  const createMessage = ({conversationId, message, senderId}: {
    conversationId: number,
    message: string,
    senderId: number    
  }) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: CHAT_EVENTS.SEND_MESSAGE,
        conversationId, 
        value: message, 
        valueType: 'TEXT', 
        senderId
      }));
    } else {
      console.log('WebSocket is not open. Cannot create message.');
    }
  }

  const fetchConversations = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'FETCH_CONVERSATIONS',
        userId: Number(userId)
      }));
    } else {
      console.log('WebSocket is not open. Cannot fetch conversations.');
    }
  }, []);

  const createConversations = ({participants, message, groupName = ''}: {
    participants: number[],
  message: {
    senderId: number;
    value: string;
    valueType: any;
  },
  groupName?: string

  }) => {
    console.log("createConversations",{participants, message, groupName});
    if(wsRef.current?.readyState === WebSocket.OPEN){
      wsRef.current.send(JSON.stringify({
        type: 'CREATE_CONVERSATION',
        data:{
          participants,
          message,
          groupName
        }
      }));
    }
  }

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
    <SocketContext.Provider value={{ ws, conversations, fetchConversations , createConversations , currConversation, fetchMessages, createMessage}}>
      {children}
    </SocketContext.Provider>
  );
}
export default SocketContext;