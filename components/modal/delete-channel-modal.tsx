"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useModalStore from "@/state/zustand/use-modal-store"
import axios from "axios"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useState } from "react"

export default function DeleteChannelModal() {
  const { isOpen, onOpen, onClose, type, data } = useModalStore()
  const isModalOpen = isOpen && type === "deleteChannel"
  const { server, channel } = data

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      console.log(url)
      await axios.delete(url)
      onClose()
      router.push(`/servers/${server?.id}`)
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-card p-0 text-card-foreground">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Leave Channel
          </DialogTitle>
          <DialogDescription className="text-center opacity-70">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-primary">{channel?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-muted/40 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} variant="default" onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
