"use client"

import CreateServerModal from "@/components/modal/create-server-modal"
import EditServerModal from "@/components/modal/edit-server-modal"
import InviteModal from "@/components/modal/invite-modal"
import { useMounted } from "@/lib/hooks/use-mounted"

export const ModalProvider = () => {
  const mounted = useMounted()
  if (!mounted) return null
  return (
    <>
      {/* Here we list all available modals application wide */}
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </>
  )
}
