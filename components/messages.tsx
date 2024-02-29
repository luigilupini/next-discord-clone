"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { pusherClient } from "@/lib/pusher"
import { cn, lastSeen } from "@/lib/utils"
import { Message } from "@prisma/client"
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
      <MessagesWrapper direction="incoming" className="mb-1">
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
    className={cn("ping flex size-full flex-col gap-1", className, {
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
  console.log("MessageCard: ", message)
  return (
    <Card
      className={cn(
        "flex size-fit min-w-48 max-w-md flex-col items-center gap-1 px-3 py-1 shadow-none",
        {
          "bg-success text-success-foreground": type === "incoming",
          "bg-primary text-primary-foreground": type === "initial",
        },
      )}
    >
      <div className="flex size-full items-center justify-between text-xs">
        <span className="font-semibold">{message.user?.name}</span>
        <span className="text-[10px]">{lastSeen(message.createdAt)}</span>
      </div>
      <div className="flex size-full flex-wrap items-start overflow-hidden text-xs font-normal">
        {message.text}
      </div>
    </Card>
  )
}
