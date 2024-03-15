"use client"

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { io as IoClient, Socket } from "socket.io-client"

type SocketContextProps = {
  socket: Socket | null
  isConnected: boolean
  emitNewMessage: (channelId: string, message: any) => void
  emitMessageUpdate: (updateId: string, message: any) => void
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
  emitNewMessage: () => {},
  emitMessageUpdate: () => {},
})

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = new (IoClient as any)("http://localhost:3030")
    socketInstance.on("connect", () => setIsConnected(true))
    socketInstance.on("disconnect", () => setIsConnected(false))
    setSocket(socketInstance)
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // Function to emit a new message event
  const emitNewMessage = (channelId: string, message: any) => {
    // console.log("emitNewMessage", channelId, message)
    socket?.emit("new-message", { channelId, message })
  }
  // Function to emit a message update event
  const emitMessageUpdate = (updateId: string, message: any) => {
    // console.log("emitMessageUpdate", updateId, message)
    socket?.emit("update-message", { updateId, message })
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        emitNewMessage,
        emitMessageUpdate,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)

/* ⭐️ Client 'connect' listener:
This built in listener will ensure that your client socket makes an
on("connect", () => {...}), a listener. This sets up the client to react to a
established connection from the client's perspective. When the client
successfully connects or reconnects to the server, this event is triggered. This
is a client-side event, signifies that the connection to the server (or specific
namespace) is made. It's an ideal place for the client to initialize
communications, emitting a event for the server to listen against.

> socketInstance.on("connect", () => setIsConnected(true))

⭐️ Socket Server Event:
At your express/socket server, the socket.io on("connection", (socket) => {...})
or socketNamespace function, listens for incoming connections. When a client
successfully connects to the server (or namespace within the server), this event
is triggered. This built server-side listener is triggered whenever a new client
`connect`. The server uses this opportunity to set up the event listeners like
our ("socket-listen") specific to this new connection. Check the server code for
more info on this event listener. */
