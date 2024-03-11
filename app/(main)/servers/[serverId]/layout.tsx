import ServerSidebar from "@/components/server/sidebar"
import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { Params } from "@/lib/definitions"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  params: Params
}>

export default async function ServerIdLayout({ params, children }: Props) {
  const { serverId } = params

  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const server = await db.server.findFirst({
    where: {
      id: serverId,
      // Only a user that is a member of the server can view it!
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })
  if (!server) return redirect("/servers")

  return (
    <main className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        <ServerSidebar serverId={serverId} />
      </div>
      <section className="h-full md:pl-60">{children}</section>
    </main>
  )
}
