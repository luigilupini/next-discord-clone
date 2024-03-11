"use client"

import { ActionTooltip } from "@/components/action-tooltip"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

type Props = {
  id: string
  name: string
  imageUrl: string
}

export default function NavItem({ id, name, imageUrl }: Props) {
  const { serverId } = useParams()
  const router = useRouter()
  const onClick = () => router.push(`/servers/${id}`)
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 w-[4px] rounded-r-full bg-primary transition-all",
            serverId !== id && "group-hover:h-[20px]",
            serverId === id ? "h-[36px]" : "h-[8px]",
          )}
        />
        <div
          className={cn(
            "group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]",
            serverId === id && "rounded-[16px] bg-primary/10 text-primary",
          )}
        >
          <Image
            fill
            src={imageUrl}
            alt="channel"
            className="object-cover shadow-sm"
          />
        </div>
      </button>
    </ActionTooltip>
  )
}
