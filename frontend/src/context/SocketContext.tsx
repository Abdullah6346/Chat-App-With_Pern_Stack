import React from "react";
import {
  createContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useContext,
} from "react";

import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";
interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);
const socketURL =
  import.meta.env.MODE == "development"
    ? "localhost:3001"
    : "https://chat-app-withpernstack-production.up.railway.app";
//eslint-disable-next-line
export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const { authUser, isLoading } = useAuthContext();
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
      });
      socketRef.current = socket;
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!authUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
