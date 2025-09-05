"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { io as ClientIO, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      transports: ["websocket", "polling"],
      upgrade: true,
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      forceNew: true,
    });

    // Enhanced connection event handlers
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      console.log("Transport:", socketInstance.io.engine.transport.name);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    // Log transport upgrades
    socketInstance.io.engine.on("upgrade", () => {
      console.log("Upgraded to:", socketInstance.io.engine.transport.name);
    });

    // Log transport upgrades attempts
    socketInstance.io.engine.on("upgradeError", (error) => {
      console.error("Upgrade error:", error);
    });

    setSocket(socketInstance);

    return () => {
      console.log("Cleaning up socket connection");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
