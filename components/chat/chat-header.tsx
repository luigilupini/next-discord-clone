import MobileToggle from "@/components/mobile-toggle"
import SocketIndicator from "@/components/socket/socket-indicator"
import UserAvatar from "@/components/user-avatar"

import { Hash } from "lucide-react"
import ChatVideoButton from "./chat-video-button"

type Props = {
  serverId: string
  name: string
  type: "channel" | "conversation"
  imageUrl?: string
}

export default function ChatHeader({ serverId, name, type, imageUrl }: Props) {
  return (
    <header className="text-md flex h-12 items-center border-b bg-card px-3 font-semibold text-card-foreground/80">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="mr-2 size-5 text-card-foreground/60" />
      )}
      {type === "conversation" && (
        <UserAvatar
          src={imageUrl}
          className="mr-3 size-6 border border-primary shadow-sm"
        />
      )}
      <p className="text-md font-semibold">{name}</p>

      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </header>
  )
}
