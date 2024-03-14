import { Member } from "@prisma/client"
import ChatWelcome from "./chat-welcome"

type Props = {
  name: string
  member: Member
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, string>
  paramKey: "channelId" | "conversationId"
  paramValue: string
  type: "channel" | "conversation"
}

export default function ChatMessages({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: Props) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto rounded-md py-4">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  )
}
