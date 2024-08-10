import DefaultEventsMap, { io, Socket } from "socket.io-client";

import { BASE_URL } from "../config";
import React from "react";

const SocketContext = React.createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wsURL = `${BASE_URL}/api/chat`;
  const socket = io(BASE_URL);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
