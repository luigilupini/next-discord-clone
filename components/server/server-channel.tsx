"use client"

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { Edit2, Hash, Lock, Mic, Trash, Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { ActionTooltip } from "@/components/action-tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import useModalStore, { ModalType } from "@/state/zustand/use-modal-store"

type Props = {
  channel: Channel
  server: Server
  role?: MemberRole
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
}

export const ServerChannel = ({ channel, server, role }: Props) => {
  const { onOpen } = useModalStore()
  const params = useParams()
  const router = useRouter()

  const Icon = iconMap[channel.type]

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation()
    onOpen(action, { channel, server })
  }
  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
  }

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={cn(
        "group my-1 flex w-full items-center justify-start gap-x-2 rounded-md p-2 text-card-foreground/70 transition hover:text-card-foreground",
        params?.channelId === channel.id && "bg-primary/20 text-primary/90",
      )}
    >
      <Icon className="size-4 flex-shrink-0" />
      <p className="line-clamp-1 text-[13px] font-medium lowercase">
        {channel.name}
      </p>

      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center justify-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit2
              onClick={(e) => onAction(e, "editChannel")}
              className="hidden size-3 fill-primary/30 hover:text-primary group-hover:block"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "deleteChannel")}
              className="hidden size-3 fill-primary/30 hover:text-primary group-hover:block"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <ActionTooltip label="Locked">
          <Lock className="ml-auto size-3 fill-primary/30 text-primary" />
        </ActionTooltip>
      )}
    </Button>
  )
}
