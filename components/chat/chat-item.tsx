"use client"

import { ActionTooltip } from "@/components/action-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import UserAvatar from "@/components/user-avatar"
import { cn } from "@/lib/utils"
import { useSocket } from "@/state/context/leaf/socket"
import useModalStore from "@/state/zustand/use-modal-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Member, MemberRole, Profile } from "@prisma/client"
import axios from "axios"
import {
  Edit2,
  FileIcon,
  ShieldAlert,
  ShieldCheck,
  Trash,
  User,
} from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import qs from "query-string"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

type Props = {
  id: string
  content: string
  member: Member & { profile: Profile }
  timestamp: string
  fileUrl?: string
  deleted: boolean
  currentMember: Member
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, string>
}

const roleIconMap = {
  [MemberRole.GUEST]: (
    <User className="ml-auto hidden size-3 fill-primary/30 hover:text-primary group-hover:block" />
  ),
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-auto hidden size-3 fill-primary/30 hover:text-primary group-hover:block" />
  ),
  [MemberRole.ADMIN]: (
    <ShieldAlert className="ml-auto hidden size-3 fill-primary/30 hover:text-primary group-hover:block" />
  ),
}

const formSchema = z.object({
  content: z.string().min(1),
})

export default function ChatItem({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: Props) {
  const { onOpen } = useModalStore()
  const { emitMessageUpdate } = useSocket()
  const [isEditing, setIsEditing] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  })

  const onMemberClick = () => {
    if (member.id === currentMember.id) return
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      })
      // api/socket/messages/[messageId]
      const response = await axios.patch(url, values)
      const { message, updateKey } = response.data
      emitMessageUpdate(updateKey, message)
      form.reset()
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    form.reset({ content: content })
  }, [content])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keyDown", handleKeyDown)
  }, [])

  const fileType = fileUrl?.split(".").pop()

  const isAdmin = currentMember.role === MemberRole.ADMIN
  const isModerator = currentMember.role === MemberRole.MODERATOR
  const isOwner = currentMember.id === member.id
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner)
  const canEditMessage = !deleted && isOwner && !fileUrl
  const isPDF = fileType === "pdf" && fileUrl
  const isImage = !isPDF && fileUrl

  return (
    <article className="group relative flex w-full items-center p-1 transition">
      <div className="group flex w-full items-start gap-x-2 rounded-md p-2 hover:bg-card">
        <div
          onClick={onMemberClick}
          className="cursor-pointer transition hover:drop-shadow-sm"
        >
          <UserAvatar src={member.profile.imageUrl} className="size-6" />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center justify-center gap-2">
              <p
                onClick={onMemberClick}
                className="cursor-pointer text-sm font-semibold hover:underline"
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs opacity-50">{timestamp}</span>
          </div>

          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square relative mt-2 flex size-36 items-center overflow-hidden rounded-md border bg-secondary"
            >
              <Image
                src={fileUrl}
                alt={content}
                width={400}
                height={400}
                priority
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative mt-2 flex w-fit items-center gap-4 rounded-md bg-primary/10 p-2">
              <div className="flex items-center gap-1">
                <FileIcon className="size-6 fill-primary/20 stroke-primary" />
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  PDF File
                </a>
              </div>
              <Badge className="text-[10px]">{fileUrl}</Badge>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p className={cn("text-sm", deleted && "mt-1 text-xs italic")}>
              {content}
              {isUpdated && !deleted && (
                <span className="mx-2 text-[10px]">(edited)</span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className="flex w-full items-center gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="border-0 border-none bg-muted p-2 text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="default">
                  Save
                </Button>
              </form>
              <span className="mt-1 text-[10px] text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>

      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-x-4 rounded-sm border bg-card p-1 group-hover:flex">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit2
                onClick={() => setIsEditing(true)}
                className="ml-auto size-3 cursor-pointer opacity-50 transition hover:opacity-100"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="ml-auto size-3 cursor-pointer opacity-50 transition hover:opacity-100"
            />
          </ActionTooltip>
        </div>
      )}
    </article>
  )
}
