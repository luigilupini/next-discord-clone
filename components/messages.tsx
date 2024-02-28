"use client"

import { pusherClient } from "@/lib/pusher"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"

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
  console.log("incomingMessages", incomingMessages)
  return (
    <div className="ping flex size-full flex-col-reverse justify-start gap-1 text-sm">
      {initialMessages.map((message, index) => (
        <Badge
          key={message.id}
          className={cn("ping flex w-fit items-center justify-start")}
        >
          {message.text}
        </Badge>
      ))}
      {incomingMessages.map((text, i) => (
        <p key={i} className="text-success">
          {text}
        </p>
      ))}
    </div>
  )
}
