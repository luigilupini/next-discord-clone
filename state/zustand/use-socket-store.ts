import { io as ioClient, Socket } from "socket.io-client"
import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

export type Namespace = "" | "socket" | "channel"

type SocketStore = {
  socket: Socket | null
  isConnected: boolean
  currentNamespace: Namespace // Track the current namespace
  switchNamespace: (namespace?: Namespace) => void
  disconnectSocket: () => void
}

const createSocketSlice: StateCreator<SocketStore> = (set, get) => ({
  // Initialize state with a socket connection
  socket: null,
  isConnected: false,
  currentNamespace: "",
  // Actions to initialize, switch, and disconnect the socket
  switchNamespace: (namespace: Namespace = "") => {
    const { socket, currentNamespace } = get()
    // Check if we're already connected to the desired namespace
    if (socket && currentNamespace === namespace) return
    // Otherwise, disconnect the current socket and connect to the new namespace!
    const disconnectSocket = () => {
      if (socket) {
        socket.disconnect()
        set({ socket: null, isConnected: false })
      }
    }
    // Ensure any existing socket is disconnected first before connecting to a
    // new namespace and updating the state with a new socket.
    disconnectSocket()

    // Connect to the new namespace and update the state with the new socket
    // connection and connection status.
    const newSocket = ioClient(`http://localhost:3030/${namespace}`, {
      autoConnect: true,
    })
    // Here we're listening for the "connect" and "disconnect" events to update
    // the state with the connection status.
    newSocket.on("connect", () => set({ isConnected: true }))
    newSocket.on("disconnect", () => set({ isConnected: false }))
    // Update the current namespace
    set({ socket: newSocket, currentNamespace: namespace })
  },
  disconnectSocket: () => {
    const { socket } = get()
    if (socket) {
      socket.disconnect()
      // Here we reset the state to the initial values when the socket is
      // disconnected, and the namespace is reset.
      set({ socket: null, isConnected: false, currentNamespace: "" })
    }
  },
})

// Automatically initialize the default namespace connection when the store is first used
const useSocketStore = create(devtools(createSocketSlice, "SocketStore" as any))

export default useSocketStore
