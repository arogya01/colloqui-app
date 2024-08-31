import { useContext } from "react";
import SocketContext from "../context/SocketContextProvider";


export const useSocketContext = () => {
    const value = useContext(SocketContext);
    if (process.env.NODE_ENV !== "production") {
      if (!value) {
        throw new Error("useSocketContext must be wrapped in a <SocketContextProvider />");
      }
    }
  
    return value;
}