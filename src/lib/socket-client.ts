"use client"

import { io as initIo, type Socket } from "socket.io-client"

/* ─── Notification payload type (matches backend) ─── */

export type NotificationData = {
  id: number
  title: string
  message: string
  type: string
  link: string | null
  metadata: Record<string, unknown> | null
  isRead: boolean
  createdAt: string
}

/* ─── Singleton socket ─── */

let socket: Socket | null = null

export function getSocket(): Socket | null {
  return socket
}

export function connectSocket(): Socket {
  if (socket?.connected) return socket

  // Derive socket URL from API URL (strip /api suffix)
  const socketUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000")
    .replace(/\/+$/, "")
    .replace(/\/api$/, "")

  socket = initIo(socketUrl, {
    path: "/socket.io/",
    transports: ["websocket", "polling"],
    withCredentials: true, // sends the lshs_session cookie
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
  })

  socket.on("connect", () => {
    console.log("[Socket.IO] Connected")
  })

  socket.on("disconnect", (reason) => {
    console.log("[Socket.IO] Disconnected:", reason)
  })

  socket.on("connect_error", (error) => {
    // Silent — auth failures are expected when session expires
    if (!error.message.includes("Unauthorized")) {
      console.warn("[Socket.IO] Connection error:", error.message)
    }
  })

  return socket
}

export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }
}