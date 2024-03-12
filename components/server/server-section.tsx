"use client"

import { ChannelType, MemberRole } from "@prisma/client"
import { Plus, Settings } from "lucide-react"

import { ActionTooltip } from "@/components/action-tooltip"
import useModalStore from "@/state/zustand/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types"

type Props = {
  label: string
  role?: MemberRole
  sectionType: "channels" | "members"
  channelType?: ChannelType
  server?: ServerWithMembersWithProfiles
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: Props) => {
  const { onOpen } = useModalStore()
  return (
    <section className="flex items-center justify-between">
      <p className="w-full text-xs font-semibold uppercase">-- {label}</p>

      {/* Here we ensure that guests cannot create channels and that only
      admins/moderators can manage members and channels */}
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button onClick={() => onOpen("createChannel", { channelType })}>
            <Plus className="size-4 rounded-md border p-[1px] opacity-60 hover:opacity-100" />
          </button>
        </ActionTooltip>
      )}
      {/* Here we ensure that guests and moderators cannot create channels and
      that only admins can manage members and channels */}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button onClick={() => onOpen("members", { server })}>
            <Settings className="size-4 rounded-md p-[1px] opacity-60 hover:opacity-100" />
          </button>
        </ActionTooltip>
      )}
    </section>
  )
}
