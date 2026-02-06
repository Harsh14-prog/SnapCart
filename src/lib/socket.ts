"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    console.log(
      "Connecting socket to:",
      process.env.NEXT_PUBLIC_SOCKET_SERVER
    );

    socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER!, {
      withCredentials: true,
    });
  }
  return socket;
};
