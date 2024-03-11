"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useOrigin } from "@/lib/hooks/use-origin"
import { delay } from "@/lib/utils"
import useModalStore from "@/state/zustand/modal-store"
import axios from "axios"
import { Check, Copy, RefreshCw } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function InviteModal() {
  const { isOpen, onOpen, onClose, type, data } = useModalStore()
  const isModalOpen = isOpen && type === "invite"
  const { server } = data

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const origin = useOrigin()
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = async () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    await delay(2000)
    setCopied(false)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      )
      onOpen("invite", { server: response.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  const Icon = copied ? Check : Copy
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-card p-0 text-card-foreground">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends to Your Server
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <Label className="text-xs font-bold uppercase opacity-80">
            Server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isLoading}
              className="border-0 bg-muted text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
              variant="secondary"
            >
              <Icon className="size-4" />
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="mt-4 text-xs"
          >
            Generate a new link
            <RefreshCw className="ml-2 size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
