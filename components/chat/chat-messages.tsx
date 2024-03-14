"use client"

import { useChatQuery } from "@/lib/hooks/use-chat-query"
import { Member, Profile } from "@prisma/client"
import { format } from "date-fns"
import { Loader2, ServerCrash } from "lucide-react"
import { Message } from "postcss"
import { Fragment } from "react"
import ChatItem from "./chat-item"
import ChatWelcome from "./chat-welcome"

const DATE_FORMAT = "d MMM yyyy, HH:mm"

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

type MessageWithMemberProfile = Message & {
  member: Member & { profile: Profile }
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
  const queryKey = `chat:${chatId}`
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  })
  if (status === "loading") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center opacity-70">
        <Loader2 className="my-4 size-7 animate-spin" />
        <p className="text-xs">Loading messages...</p>
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center opacity-70">
        <ServerCrash className="my-4 size-7" />
        <p className="text-xs">Something went wrong!</p>
      </div>
    )
  }
  return (
    <div className="flex flex-1 flex-col overflow-y-auto rounded-md py-4">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.items.map((message: MessageWithMemberProfile) => {
              console.log(message)
              return (
                <ChatItem
                  key={message.id}
                  id={message.id}
                  currentMember={member}
                  member={message.member}
                  content={message.content}
                  fileUrl={message.fileUrl}
                  deleted={message.deleted}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
