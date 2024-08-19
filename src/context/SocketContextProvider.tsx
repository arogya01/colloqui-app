import { io, Socket } from "socket.io-client";

import { WSS_URL } from "../config";
import React from "react";

const SocketContext = React.createContext<Socket | null>(null);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wsURL = `${WSS_URL}/api/chat`;
  const socket = io(wsURL);
  console.log("scoket connection", socket);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
