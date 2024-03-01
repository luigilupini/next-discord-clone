"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { pusherClient } from "@/lib/pusher"
import { cn, lastSeen } from "@/lib/utils"
import { Message } from "@prisma/client"
import { Zap } from "lucide-react"
import { User } from "next-auth"
import { useEffect, useState } from "react"

type MessageWithUser = Message & {
  user: User | null
}

type Props = {
  roomId: string
  messages: MessageWithUser[]
}

export default function Messages({ roomId, messages }: Props) {
  const [incomingMessages, setIncomingMessages] = useState<any[]>([])

  useEffect(() => {
    pusherClient.subscribe(roomId)
    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [text, ...prev])
    })
    return () => pusherClient.unsubscribe(roomId)
  }, [])

  return (
    <ScrollArea className="size-full py-2 text-sm">
      <MessagesWrapper direction="incoming" className="mb-2">
        {incomingMessages.map((message, index) => (
          <MessageCard key={index} message={message} type="incoming" />
        ))}
      </MessagesWrapper>

      <MessagesWrapper direction="initial">
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} type="initial" />
        ))}
      </MessagesWrapper>
    </ScrollArea>
  )
}

const MessagesWrapper = ({
  children,
  direction,
  className,
}: {
  children: React.ReactNode
  direction?: "initial" | "incoming"
  className?: string
}) => (
  <div
    className={cn("flex size-full flex-col gap-2 px-2", className, {
      "flex-col-reverse justify-start": direction === "initial",
      "flex-col justify-end": direction === "incoming",
    })}
  >
    {children}
  </div>
)

const MessageCard = ({
  message,
  type,
}: {
  message: MessageWithUser
  type: "initial" | "incoming"
}) => {
  return (
    <Card
      className={cn(
        "flex size-fit min-w-56 max-w-md flex-col items-center gap-[5px] rounded px-2 py-1",
        {
          "border-success bg-success text-success-foreground":
            type === "incoming",
          "border-secondary bg-secondary text-secondary-foreground":
            type === "initial",
        },
      )}
    >
      <header className="flex size-full items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{message.user?.name}</span>
          {type === "incoming" && <Zap size={11} />}
        </div>
        <span className="text-[10px] opacity-80">
          {lastSeen(message.createdAt)}
        </span>
      </header>
      <section className="flex size-full flex-wrap items-start overflow-hidden text-xs font-normal">
        {message.text}
      </section>
      <footer className="-mt-[2px] flex size-full h-4 items-center justify-end text-[9px] opacity-80">
        {message.user?.email}
      </footer>
    </Card>
  )
}
