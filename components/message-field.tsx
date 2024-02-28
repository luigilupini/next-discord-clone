"use client"

import axios from "axios"
import { SendHorizonal } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface MessageFieldProps {
  roomId: string
}

export default function MessageField({ roomId }: MessageFieldProps) {
  let input = ""

  const sendMessage = async (text: string) => {
    await axios.post("/api/message", { text, roomId })
  }

  return (
    <>
      <Input
        onChange={({ target }) => (input = target.value)}
        type="text"
        placeholder="Type a message here"
      />
      <Button
        onClick={() => sendMessage(input || "")}
        className="flex items-center justify-center gap-2"
      >
        Send <SendHorizonal size={16} />
      </Button>
    </>
  )
}
