"use client"

import { MemberRole } from "@prisma/client"
import axios from "axios"
import {
  Check,
  Gavel,
  Loader2,
  Lock,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import UserAvatar from "@/components/user-avatar"
import useModalStore from "@/state/zustand/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types"

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-1" size={14} />,
  ADMIN: <Lock className="ml-1 text-destructive" size={14} />,
}

export default function MembersModal() {
  const { isOpen, onOpen, onClose, type, data } = useModalStore()
  const isModalOpen = isOpen && type === "members"
  const { server } = data as { server: ServerWithMembersWithProfiles }

  const [loadingId, setLoadingId] = useState("")

  const router = useRouter()

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id },
      })
      const response = await axios.delete(url)
      router.refresh()
      onOpen("members", { server: response.data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId("")
    }
  }

  const onRole = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id },
      })
      const response = await axios.patch(url, { role })
      router.refresh()
      onOpen("members", { server: response.data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId("")
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-card p-0 text-card-foreground">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center opacity-60">
            {server?.members.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-6 py-4">
          {server?.members.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-x-1 text-xs font-medium">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs opacity-50">{member.profile.email}</p>
              </div>

              {/* Here we are not showing options for Admins, as you can not kick and change admin roles. */}
              {/* The below applies to all members that are not the creator of the server! */}
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="size-4 opacity-50" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="mr-2 size-4" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRole(member.id, "GUEST")}
                              >
                                <Shield className="mr-2 size-4" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="ml-2 size-4" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onRole(member.id, "MODERATOR")}
                              >
                                <ShieldCheck className="mr-2 size-4" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="ml-2 size-4" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="mr-2 size-4" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto size-4 animate-spin opacity-50" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
