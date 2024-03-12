"use client"

import CreateChannelModal from "@/components/modal/create-channel-modal"
import CreateServerModal from "@/components/modal/create-server-modal"
import DeleteChannelModal from "@/components/modal/delete-channel-modal"
import EditChannelModal from "@/components/modal/edit-channel-modal"
import EditServerModal from "@/components/modal/edit-server-modal"
import InviteModal from "@/components/modal/invite-modal"
import LeaveServerModal from "@/components/modal/leave-server-modal"
import MembersModal from "@/components/modal/members-modal"

import { useMounted } from "@/lib/hooks/use-mounted"

export const ModalProvider = () => {
  const mounted = useMounted()
  if (!mounted) return null
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  )
}