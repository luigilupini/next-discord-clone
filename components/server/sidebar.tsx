import { ChannelType, MemberRole } from "@prisma/client"
import { Hash, Lock, Mic, ShieldCheck, User, Video } from "lucide-react"
import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

import { ScrollArea } from "@/components/ui/scroll-area"
import ServerHeader from "./server-header"
import ServerSearch from "./server-search"

type Props = {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 size-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 size-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 size-4" />,
}

const roleIconMap = {
  [MemberRole.GUEST]: <User className="mr-2 size-4" />,
  [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 size-4 text-primary" />,
  [MemberRole.ADMIN]: <Lock className="mr-2 size-4 text-destructive" />,
}

export default async function ServerSidebar({ serverId }: Props) {
  const profile = await currentProfile()
  if (!profile) return redirect("/")

  const server = await db.server.findUnique({
    where: { id: serverId },
    // Included in the server query are the channels and members
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  })
  if (!server) return redirect("/")

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  )
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  )
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  )

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id, // 👈🏻 exclude the current user
  )
  const role = server.members.find(
    (member) => member.profileId === profile.id, // 👈🏻 find the current user and role
  )?.role

  return (
    <nav className="flex h-full w-full flex-col border-r bg-card text-card-foreground">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-2">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </nav>
  )
}
