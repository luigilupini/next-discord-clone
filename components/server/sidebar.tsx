import { ChannelType, MemberRole } from "@prisma/client"
import { Hash, Lock, Mic, ShieldCheck, User, Video } from "lucide-react"
import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { ServerChannel } from "./server-channel"
import ServerHeader from "./server-header"
import { ServerMember } from "./server-member"
import ServerSearch from "./server-search"
import { ServerSection } from "./server-section"

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
    <nav className="flex h-full w-full flex-col border-r bg-card text-card-foreground/90">
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

        <Separator className="m-0 my-2 rounded-md bg-muted p-0" />
        {/* Using !! checks if the textChannels array is not empty */}
        {!!textChannels?.length && (
          <div className="mb-2 mt-6">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!audioChannels?.length && (
          <div className="mb-2 mt-6">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!videoChannels?.length && (
          <div className="mb-2 mt-6">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!members?.length && (
          <div className="mb-2 mt-6">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </nav>
  )
}
