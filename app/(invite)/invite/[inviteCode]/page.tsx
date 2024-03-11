import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { Params } from "@/lib/definitions"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type Props = {
  params: Params
}

export default async function InviteCodePage({ params }: Props) {
  // 1) If no user has signed in, otherwise redirect to sign in
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  // 2) Check if we have an invite code, otherwise redirect back home
  let { inviteCode } = params
  if (!inviteCode) return redirect("/")

  // 3) Check if the user is already a member of the server!
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: { id: profile.id },
      },
    },
  })
  if (existingServer) return redirect(`/servers/${existingServer.id}`)

  // 4) Lastly, if none of the above, we update server with new member!
  const server = await db.server.update({
    where: { inviteCode: inviteCode },
    // Create a new member for the server with a unique profileId
    // We modify the data, we modify the server, and we create a new member!
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  })
  if (server) return redirect(`/servers/${server.id}`)

  // 👇🏻 We don't return anything because the above actions take place
  return null
}
