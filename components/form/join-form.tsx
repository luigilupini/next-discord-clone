"use client"

import FluidSpinner from "@/components/loader/fluid"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { joinRoom } from "@/lib/actions/join-room"
import { delay } from "@/lib/utils"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function JoinForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { execute, result, status, reset } = useAction(joinRoom, {
    onSuccess: ({ roomId, success }) => {
      success &&
        toast({
          variant: "default",
          title: "Notification",
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
    <Card className="flex w-full gap-2 p-6">
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
          placeholder="Enter a channel name"
          className="bg-background shadow-none placeholder:opacity-70"
        />

        <Button
          type="submit"
          variant="secondary"
          disabled={status === "executing"}
          className="w-24 shadow-none"
          onClick={() => setIsLoading(true)}
          spellCheck={false}
        >
          {isLoading ? <FluidSpinner /> : "Join"}
        </Button>
      </form>
    </Card>
  )
}
