import { ModeToggle } from "@/components/mode-toggle"
import NavActions from "@/components/navigation/nav-actions"
import NavItem from "@/components/navigation/nav-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

import { UserButton } from "@clerk/nextjs"
import { Server } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function Navbar() {
  const profile = await currentProfile()
  if (!profile) return redirect("/")

  const servers = await db.server.findMany({
    where: {
      members: { some: { profileId: profile.id } },
    },
  })

  return (
    <nav className="flex size-full flex-col items-center space-y-4 py-3">
      <NavActions />
      <Separator className="mx-auto h-[2px] w-12 rounded-md bg-muted" />
      <ScrollArea className="w-full flex-1">
        {servers.map(({ id, name, imageUrl }: Server) => (
          <div key={id} className="mb-4">
            <NavItem id={id} name={name} imageUrl={imageUrl} />
          </div>
        ))}
      </ScrollArea>

      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "size-[48px]",
            },
          }}
        />
      </div>
    </nav>
  )
}
