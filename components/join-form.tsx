"use client"

import { Button } from "@/components/ui/button"
import { joinRoom } from "@/lib/actions/join-room"
import { delay } from "@/lib/utils"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import FluidSpinner from "./loader/fluid"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"

export default function JoinForm() {
  const [isLoading, setIsLoading] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const { execute, result, status, reset } = useAction(joinRoom, {
    onSuccess: ({ roomId, success }) => {
      closeRef.current?.click()
      success &&
        toast({
          variant: "default",
          title: "Success!",
          className: "bg-success text-success-foreground",
          description: `${success.message} ${roomId}`,
        })
      router.push(`/room/${roomId}`)
      setIsLoading(false)
    },
    onError: ({ validationErrors, serverError }) => {
      validationErrors &&
        toast({
          variant: "destructive",
          title: "Oops!",
          description: validationErrors.roomId,
          className: "bg-destructive text-destructive-foreground",
        })
      serverError &&
        toast({
          variant: "destructive",
          title: "Oops!",
          description: serverError,
          className: "bg-destructive text-destructive-foreground",
        })
      setIsLoading(false)
    },
  })

  return (
    <Card className="flex w-full max-w-2xl gap-2 p-6">
      <form
        action={async (values) => {
          await delay(1000)
          execute(values)
        }}
        className="flex w-full items-center gap-2"
      >
        <Input
          onChange={(e) => e.target.value}
          type="text"
          name="roomId"
          placeholder="Enter room name"
          className="bg-background placeholder:opacity-70"
        />

        <Button
          type="submit"
          variant="secondary"
          disabled={status === "executing"}
          className="w-24"
          onClick={() => setIsLoading(true)}
          spellCheck={false}
        >
          {isLoading ? <FluidSpinner /> : "Join"}
        </Button>
      </form>
    </Card>
  )
}
