import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Props = {
  src?: string
  className?: string
}

export default function UserAvatar({ src, className }: Props) {
  return (
    <Avatar className={cn("size-9", className)}>
      <AvatarImage src={src} />
    </Avatar>
  )
}
