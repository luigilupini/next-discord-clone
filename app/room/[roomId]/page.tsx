import MessageForm from "@/components/form/message-form"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
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
      <GridHeader>
        <header className="flex size-full items-center justify-between gap-2">
          <div className="flex gap-1">
            <Link href="/" className="flex items-center gap-2 font-normal">
              Home
            </Link>
            <span className="font-extralight">/</span>
            <div className="flex items-center gap-2 font-semibold">Room</div>
          </div>
          <span className="rounded-lg border px-2 font-jetbrains_mono text-sm font-normal text-primary">
            {roomId}
          </span>
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
