"use client"

import { Badge } from "@/components/ui/badge"
import { useSocket } from "@/state/context/leaf/socket"

export default function SocketIndicator() {
  const { isConnected } = useSocket()
  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-warning text-warning-foreground">
        Fallback: Polling every 1s
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-success text-success-foreground">
      Live: Real-time updates
    </Badge>
  )
}
