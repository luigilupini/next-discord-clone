import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { io as ioClient } from "socket.io-client"
import { Socket } from "socket.io-client/build/esm/socket"

const socket: Socket = ioClient("http://localhost:3030")

type ContextType = {
  socket: Socket
  isConnected: boolean
}

// Initialize with a socket connection
const SocketContext = createContext<ContextType>({
  socket: socket,
  isConnected: false,
})

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const onConnect = () => {
      console.log(`🔌 connect: ${socket.id}`)
      setIsConnected(true)
    }

    const onDisconnect = () => {
      console.log("Disconnected from socket server")
      setIsConnected(false)
    }

    // Server listens on socket.on(client-ready)
    const onServer = (data: any) => {
      console.log("🧦 server-event:", data)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("server-event", onServer)

    // Return to cleanup any open connections to the socket server
    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("server-event", onServer)
      // Ensure isConnected is false when the component unmounts
      setIsConnected(false)
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
