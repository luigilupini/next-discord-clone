"use client"

import { Button } from "@/components/ui/button"
import { createRoom } from "@/lib/actions/create-room"
import { Hammer } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

export default async function CreateForm() {
  const [state, formAction] = useFormState(createRoom, { message: null })
  return (
    <form action={formAction}>
      <CreateButton />
      {state.message && <p>{state.message}</p>}
    </form>
  )
}

const CreateButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="default">
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="animate-fade">Building</span>
          <Hammer
            size={18}
            className="origin-bottom-left animate-wiggle-more fill-primary-foreground/20 text-primary-foreground animate-normal animate-duration-1000 animate-infinite"
          />
        </span>
      ) : (
        "Create room"
      )}
    </Button>
  )
}
