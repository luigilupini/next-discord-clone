import { Channel, ChannelType, Server } from "@prisma/client"
import { StateCreator, create } from "zustand"
import { devtools } from "zustand/middleware"

// Here we define all possible modals
export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage"

// Data that can be passed to a modal
type Data = {
  server?: Server
  channel?: Channel
  channelType?: ChannelType
  apiUrl?: string
  query?: Record<string, any>
}

// Our store type!
type ModalStore = {
  type: ModalType | null
  data: Data
  isOpen: boolean
  onOpen: (type: ModalType, data?: Data) => void
  onClose: () => void
}

const createModalSlice: StateCreator<ModalStore> = (set) => ({
  // Initial state
  type: null,
  data: {},
  isOpen: false,
  // Actions to manipulate state
  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
})

const useModalStore = create(devtools(createModalSlice, "ModalStore" as any))

export default useModalStore
