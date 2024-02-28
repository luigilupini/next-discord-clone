import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import MessageForm from "@/components/message-form"
import Messages from "@/components/messages"
import db from "@/lib/db"
import { formatDate } from "@/lib/utils"
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
      <GridHeader className="px-1">
        <header className="flex size-full items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-normal">
            Home
          </Link>
          <span className="font-extralight">/</span>
          <div className="flex items-center gap-2 font-semibold">
            Room
            <span className="font-normal text-primary">{roomId}</span>
          </div>
        </header>
      </GridHeader>
      <GridBody className="relative">
        <div className="size-full rounded-md bg-card p-6 py-4 text-card-foreground">
          <span className="absolute right-4 top-2 text-sm opacity-70">
            Messages
          </span>
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
