import ChatHeader from "@/components/chat/chat-header"
import ChatInput from "@/components/chat/chat-input"
import ChatMessages from "@/components/chat/chat-messages"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { Params } from "@/lib/definitions"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type Props = {
  params: Params
}

export default async function ChannelIdPage({ params }: Props) {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const { channelId, serverId } = params
  const channel = await db.channel.findUnique({
    where: { id: channelId },
  })
  const member = await db.member.findFirst({
    where: { serverId: serverId, profileId: profile.id },
  })
  // Here we redirect a user if they attempting to access a channel they don't
  // have access to or if the channel doesn't exist!
  if (!channel || !member) return redirect(`/`)

  return (
    <main className="flex h-full flex-col bg-muted text-muted-foreground">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />

      <ChatMessages
        name={channel.name}
        member={member}
        chatId={channel.id}
        apiUrl="/api/messages"
        socketUrl="/api/socket"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
        type="channel"
      />

      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </main>
  )
}
