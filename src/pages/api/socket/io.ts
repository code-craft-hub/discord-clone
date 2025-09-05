import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (_req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || "*",
        methods: ["GET", "POST"],
      },
      transports: ["websocket", "polling"],
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      console.log(`Transport: ${socket.conn.transport.name}`);

      socket.on("disconnect", (reason) => {
        console.log(`Socket disconnected: ${socket.id}, reason: ${reason}`);
      });

      socket.conn.on("upgrade", () => {
        console.log(`Socket upgraded to: ${socket.conn.transport.name}`);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
