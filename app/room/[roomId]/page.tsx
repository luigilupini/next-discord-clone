import CreateMessageForm from "@/components/form/create-message-form"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import Messages from "@/components/messages"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { chatroomUsers, userMessages } from "@/lib/actions/user-messages"
import { initials } from "@/lib/utils"
import { Antenna, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: { roomId: string }
}

export default async function RoomPage({ params }: PageProps) {
  const { roomId } = params
  const users = await chatroomUsers({ roomId })
  const initial = await userMessages({ roomId })
  return (
    <GridBase layout="basic" className="p-1">
      <GridHeader>
        <header className="flex size-full items-center justify-between">
          <nav className="flex items-center">
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
          </nav>

          <div className="flex items-center gap-4 drop-shadow-sm">
            <span className="text-sm">Members</span>
            <div className="flex items-center">
              {users.map((user) => (
                <article key={user.id} className="relative -ml-2">
                  <Avatar className="size-10 rounded-full">
                    <div className="size-full rounded-full border-[1px] border-border">
                      <AvatarImage
                        src={user!.image!}
                        alt="@user"
                        className="rounded-full border-[1px] border-primary"
                      />
                      <AvatarFallback className="rounded-full border-[2px] border-border">
                        {user?.name && initials(user?.name)}
                      </AvatarFallback>
                    </div>
                  </Avatar>
                  <div className="absolute left-0 top-1 z-50 flex size-[9px] items-center justify-center rounded-full border bg-success" />
                </article>
              ))}
            </div>
          </div>
        </header>
      </GridHeader>
      <GridBody className="relative">
        <div className="size-full rounded-md border bg-card p-2 text-card-foreground shadow-sm">
          <Messages roomId={roomId} messages={initial} />
        </div>
      </GridBody>
      <GridFooter className="px-1">
        <footer className="flex size-full items-center justify-between gap-2">
          <CreateMessageForm roomId={roomId} />
        </footer>
      </GridFooter>
    </GridBase>
  )
}
