"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSocket } from "@/state/context/leaf/socket"
import { useEffect, useState } from "react"

export default function SocketIndicator() {
  const { socket, isConnected } = useSocket()
  const [logger, setLogger] = useState<string[]>([])
  useEffect(() => {
    // console.log(socket?.id)
    socket?.emit("socket-listen-test", {
      event: "socket-listen",
      status: 201,
      message: socket?.id,
    })

    socket?.on("socket-response-test", (data: unknown) => {
      setLogger(data as string[])
    })
  }, [])
  // console.log(logger)
  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center justify-center gap-1 border-none bg-warning text-[11px] font-semibold text-warning-foreground",
        { "bg-primary text-primary-foreground": isConnected },
      )}
    >
      {isConnected ? "Live: real-time updates" : "Fallback: polling every 1s"}
    </Badge>
  )
}
