"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { pusherClient } from "@/lib/pusher"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type MessagesProps = {
  initialMessages: { text: string; id: string }[]
  roomId: string
}

export default function Messages({ initialMessages, roomId }: MessagesProps) {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([])

  useEffect(() => {
    pusherClient.subscribe(roomId)
    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [text, ...prev])
    })
    return () => pusherClient.unsubscribe(roomId)
  }, [])

  console.log("Messages Component: ")

  console.log("Initial ")
  console.table(initialMessages)

  console.log("Incoming ")
  console.table(incomingMessages)

  return (
    <ScrollArea className="size-full py-2 text-sm">
      <MessagesWrapper direction="initial">
        {initialMessages.map(({ id, text }) => (
          <Message key={id} text={text} direction="initial" />
        ))}
        <MessagesWrapper direction="incoming">
          {incomingMessages.map((text, i) => (
            <Message key={i} text={text} direction="incoming" />
          ))}
        </MessagesWrapper>
      </MessagesWrapper>
    </ScrollArea>
  )
}

const Message = ({
  text,
  direction,
}: {
  text: string
  direction?: "initial" | "incoming"
}) => (
  <Badge
    className={cn("flex w-fit items-center", {
      "bg-primary text-primary-foreground": direction === "initial",
      "bg-success text-success-foreground": direction === "incoming",
    })}
  >
    {text}
  </Badge>
)

const MessagesWrapper = ({
  children,
  direction,
}: {
  children: React.ReactNode
  direction?: "initial" | "incoming"
}) => (
  <div
    className={cn("flex size-full flex-col gap-1", {
      "flex-col-reverse justify-start": direction === "initial",
      "flex-col justify-end": direction === "incoming",
    })}
  >
    {children}
  </div>
)
