import BadgeAmount from "@/components/badge-amount"
import CopyContent from "@/components/copy-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import db from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { MessagesSquare } from "lucide-react"

export default async function Rooms() {
  const rooms = await db.chatRoom.findMany()
  return (
    <Sheet>
      <SheetTrigger asChild className="relative">
        <Button type="submit" variant="outline">
          <span className="flex items-center gap-2">
            <span className="animate-fade">Rooms</span>
            <MessagesSquare
              size={18}
              className="origin-bottom-left animate-pulse animate-normal animate-duration-1000 animate-once"
            />
            <BadgeAmount amount={rooms.length} />
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Open Channels</SheetTitle>
          <SheetDescription className="text-[13px]">
            Copy one of the below channel names and join
          </SheetDescription>
        </SheetHeader>
        <article className="mt-6 flex flex-col gap-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center justify-between gap-2"
            >
              <Badge
                className="flex w-full items-center justify-between border-border py-2 font-normal"
                variant="outline"
              >
                <CopyContent className="z-50 font-jetbrains_mono font-medium">
                  {room.id}
                </CopyContent>
                <span className="text-xs opacity-90">
                  {formatDate(room.createdAt, "medium")}
                </span>
              </Badge>
            </div>
          ))}
        </article>
      </SheetContent>
    </Sheet>
  )
}
