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
    const socketInstance = new (IoClient as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      },
    )
    socketInstance.on("connect", () => setIsConnected(true))
    socketInstance.on("disconnect", () => setIsConnected(false))
    console.log("socketInstance", socketInstance)
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
