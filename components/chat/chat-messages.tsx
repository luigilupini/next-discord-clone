"use client"

import { useChatQuery } from "@/lib/hooks/use-chat-query"
import { useChatScroll } from "@/lib/hooks/use-chat-scroll"
import { useChatSocket } from "@/lib/hooks/use-chat-socket"
import { Member, Profile } from "@prisma/client"
import { format } from "date-fns"
import { Loader2, ServerCrash } from "lucide-react"
import { Message } from "postcss"
import { ElementRef, Fragment, useRef } from "react"
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
  const addKey = `chat:${chatId}:messages`
  const updateKey = `chat:${chatId}:messages:update`

  const topRef = useRef<ElementRef<"div">>(null)
  const bottomRef = useRef<ElementRef<"div">>(null)

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

  useChatSocket({ queryKey, addKey, updateKey })
  useChatScroll({
    topRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items.length ?? 0,
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
    <div
      ref={topRef}
      className="flex flex-1 flex-col overflow-y-auto rounded-md py-4"
    >
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="my-4 h-6 w-6 animate-spin text-zinc-500" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="my-4 text-xs text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-col-reverse">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.items.map((message: MessageWithMemberProfile) => {
              // console.log(message)
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
      <div ref={bottomRef} />
    </div>
  )
}
