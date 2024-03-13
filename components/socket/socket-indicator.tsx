"use client"

import { Badge } from "@/components/ui/badge"
import useSocketStore from "@/state/zustand/use-socket-store"
import { useEffect } from "react"

export default function SocketIndicator() {
  const { socket, switchNamespace } = useSocketStore()

  useEffect(() => {
    switchNamespace("socket")

    // Client emits event "socket-listen"
    const handleConnect = () => {
      socket?.emit("socket-listen", {
        event: "socket-listen",
        status: 201,
        message: socket?.id,
      })
    }
    // ⭐️ Client 'connect' listener: This built in listener will ensure that
    // your client socket makes an on("connect", () => {...}), a listener. This
    // sets up the client to react to a established connection from the client's
    // perspective. When the client successfully connects or reconnects to the
    // server, this event is triggered. This is a client-side event, signifies
    // that the connection to the server (or specific namespace) is made. It's
    // an ideal place for the client to initialize communications, emitting a
    // "socket-listen" event for the server to listen against.
    socket?.on("connect", handleConnect) // Built in client event listener

    // The "connect" listener on the client side and our server's handling of
    // the "connection" event are indeed related, but they serve different roles
    // in the client-server communication lifecycle of a socket application.

    // ⭐️ Socket Server Event: At your express/socket server, the socket.io
    // on("connection", (socket) => {...}) or socketNamespace function, listens
    // for incoming connections. When a client successfully connects to the
    // server (or namespace within the server), this event is triggered. This
    // built server-side listener is triggered whenever a new client `connect`.
    // The server uses this opportunity to set up the event listeners like our
    // ("socket-listen") specific to this new connection.

    // Each client connection, the server gets a unique socket instance through
    // which it can communicate with that client.

    // Client will listen on a server event "socket-response"
    const handleResponse = (data: unknown) => {
      console.log("socket-response:", data)
      // Do something with the data received from the server
      // Update client state or UI based on the data...
    }
    // ⭐️ Custom Server Event Listener: We set up a listener "socket-response", a
    // custom server event that presumably tells the client something about its
    // connection status or other relevant information.
    socket?.on("socket-response", handleResponse)

    // Cleanup function to remove the event listener when the component unmounts!
    return () => {
      socket?.off("connect", handleConnect)
      socket?.off("socket-response", handleResponse)
    }
  }, [socket])

  if (!socket?.connected) {
    return (
      <Badge
        variant="outline"
        className="flex items-center justify-center gap-1 bg-warning text-[11px] font-semibold text-warning-foreground"
      >
        Fallback: polling every 1s
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="flex items-center justify-center gap-1 bg-success text-[11px] font-semibold text-success-foreground"
    >
      Live: real-time updates
    </Badge>
  )
}
