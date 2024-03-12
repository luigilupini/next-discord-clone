"use client"

import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { ShieldAlert, ShieldCheck } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import UserAvatar from "@/components/user-avatar"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface ServerMemberProps {
  member: Member & { profile: Profile }
  server: Server
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
}

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams()
  const router = useRouter()

  const icon = roleIconMap[member.role]

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "group my-1 mb-1 flex w-full items-center justify-start gap-x-2 rounded-md px-2 py-2 text-card-foreground/60 hover:text-card-foreground",
        params?.memberId === member.id && "bg-destructive",
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="size-5" />
      <p
        className={cn(
          "text-[13px] font-medium",
          params?.memberId === member.id && "text-destructive-foreground",
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </Button>
  )
}
