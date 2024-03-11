import { ChannelType, MemberRole } from "@prisma/client"
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react"
import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

import ServerHeader from "./server-header"

type Props = {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
}

export default async function ServerSidebar({ serverId }: Props) {
  const profile = await currentProfile()
  if (!profile) return redirect("/")

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
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
    <nav className="flex h-full w-full flex-col border-r bg-muted text-muted-foreground">
      <ServerHeader server={server} role={role} />
    </nav>
  )
}
