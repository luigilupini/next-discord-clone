"use client"

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { io as IoClient } from "socket.io-client"

type SocketContextType = {
  socket: any | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = new (IoClient as any)("http://localhost:3030")
    socketInstance.on("connect", () => {
      console.log(`🔌 connect: ${socketInstance.id}`)
      setIsConnected(true)
      // Sever listens on socket.on(client-ready)
      socketInstance.emit("client-ready", {
        message: "💬 message from client",
      })
    })
    // Client listens on socket.on(server-event)
    socketInstance.on("server-event", (data: any) => {
      console.log("🧦 server-event:", data)
    })

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server")
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
