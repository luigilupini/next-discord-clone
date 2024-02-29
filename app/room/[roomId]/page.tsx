import MessageForm from "@/components/form/create-message-form"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import Messages from "@/components/messages"
import { Button } from "@/components/ui/button"
import db from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Antenna, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: { roomId: string }
}

export default async function RoomPage({ params }: PageProps) {
  const { roomId } = params
  const existingMessages = await db.message.findMany({
    where: { chatRoomId: roomId },
  })
  const serializedMessages = existingMessages.map(
    ({ text, id, createdAt }) => ({
      text: text,
      id: id,
      date: formatDate(createdAt, "medium"),
    }),
  )
  return (
    <GridBase layout="basic">
      <GridHeader>
        <header className="flex size-full items-center">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex gap-1 rounded-l-full rounded-r-none border-r bg-secondary/50 shadow-none"
          >
            <Link href="/" className="flex items-center font-normal">
              <ChevronLeft size={18} />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="pointer-events-none -ml-[1px] flex gap-2 rounded-l-none rounded-r-full font-jetbrains_mono font-medium shadow-none"
          >
            <Antenna
              size={14}
              className="animate-pulse animate-duration-1000 animate-once animate-ease-in-out"
            />
            {roomId}
          </Button>
        </header>
      </GridHeader>
      <GridBody className="relative">
        <div className="size-full rounded-md bg-card p-6 py-4 text-card-foreground">
          <Messages roomId={roomId} initialMessages={serializedMessages} />
        </div>
      </GridBody>
      <GridFooter className="px-1">
        <footer className="flex size-full items-center justify-between gap-2">
          <MessageForm roomId={roomId} />
        </footer>
      </GridFooter>
    </GridBase>
  )
}
