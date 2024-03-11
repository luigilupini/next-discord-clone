import { Channel, ChannelType, Server } from "@prisma/client"
import { StateCreator, create } from "zustand"
import { devtools } from "zustand/middleware"

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

type ModalData = {
  server?: Server
  channel?: Channel
  channelType?: ChannelType
  apiUrl?: string
  query?: Record<string, any>
}

type ModalStore = {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

const createModalSlice: StateCreator<ModalStore> = (set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
})

const useModalStore = create(devtools(createModalSlice, "ModalStore" as any))

export default useModalStore
