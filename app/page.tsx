"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function HomePage() {
  let roomIdInput = ""
  const router = useRouter()

  const createRoom = async () => {
    const res = await fetch("/api/rooms/create")
    const roomId: string = await res.text()
    router.push(`/room/${roomId}`)
  }

  const joinRoom = async (roomId: string) => {
    router.push(`/room/${roomId}`)
  }
  return (
    <main className="flex size-full flex-col items-center justify-center gap-2">
      <article className="relative flex w-full flex-col items-center justify-center gap-2">
        <Button
          onClick={createRoom}
          className="absolute -top-[100%]"
          variant="outline"
        >
          Create room
        </Button>
        <Card className="flex w-full max-w-2xl gap-2 p-6">
          <Input
            className="flex-1"
            onChange={({ target }) => (roomIdInput = target.value)}
            type="text"
          />
          <Button onClick={() => joinRoom(roomIdInput)}>Join room</Button>
        </Card>
      </article>
    </main>
  )
}
