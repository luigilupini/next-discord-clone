"use client"

import { pusherClient } from "@/lib/pusher"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"

interface MessagesProps {
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

  return (
    <ScrollArea className="ping size-full text-sm">
      <div className="ping flex size-full flex-col-reverse justify-start gap-1">
        {initialMessages.map((message, index) => (
          <Badge
            key={message.id}
            className={cn("ping flex w-fit items-center justify-start")}
          >
            {message.text}
          </Badge>
        ))}
        <div className="ping flex size-full flex-col justify-end gap-1">
          {incomingMessages.map((text, i) => (
            <Badge key={i} className="w-fit bg-success text-success-foreground">
              {text}
            </Badge>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
