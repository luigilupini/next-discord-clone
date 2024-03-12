import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { Params } from "@/lib/definitions"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type Props = {
  params: Params
}

export default async function ServerIdPage({ params }: Props) {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: { some: { profileId: profile.id } },
    },
    include: {
      channels: {
        where: { name: "general" },
        orderBy: { createdAt: "asc" },
      },
    },
  })
  const isInitialGeneralChannel = server?.channels[0]
  if (isInitialGeneralChannel?.name === "general") {
    console.log(`If you navigate to the server page, this should redirect to
    the initial general channel. We protecting the main server page route from
    being accessed directly. You are being redirected below!`)
  }

  return redirect(
    `/servers/${params.serverId}/channels/${isInitialGeneralChannel?.id}`,
  )
}
