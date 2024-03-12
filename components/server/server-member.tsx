"use client"

import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { Lock, ShieldCheck } from "lucide-react"
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
  [MemberRole.MODERATOR]: <ShieldCheck className="ml-2 size-4 text-primary" />,
  [MemberRole.ADMIN]: <Lock className="ml-2 size-4 text-destructive" />,
}

export const ServerMember = ({ member }: ServerMemberProps) => {
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
      size="sm"
      className={cn(
        "group my-1 flex w-full items-center justify-start gap-x-2 rounded-md p-2 text-card-foreground/70 transition hover:bg-primary/10 hover:text-primary/80",
        params?.memberId === member.id && "bg-primary/20 text-primary/90",
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="size-5" />
      <p className="text-[13px] font-medium opacity-90">
        {member.profile.name}
      </p>
      {icon}
    </Button>
  )
}
