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
import qs from "query-string"
import { useState } from "react"

export default function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModalStore()
  const isModalOpen = isOpen && type === "deleteMessage"
  const { apiUrl, query } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })
      console.log(url)
      await axios.delete(url)
      onClose()
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center opacity-70">
            Are you sure you want to delete this message? <br /> It will be
            <span className="font-bold"> permanently </span> deleted.
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
