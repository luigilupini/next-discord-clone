import ChatHeader from "@/components/chat/chat-header"
import { getOrCreateConversation } from "@/lib/actions/conversations"
import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { ServerProps } from "@/lib/definitions"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function MemberIdPage({
  params,
  searchParams,
}: ServerProps) {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: { profile: true },
  })
  // If no current member can be found we redirect to the setup/home page!
  if (!currentMember) return redirect("/")

  const conversation = await getOrCreateConversation(
    currentMember.id, // 👈🏻 Logged in user Id
    params.memberId, // 👈🏻 Member clicked on that is passed in URL
  )
  if (!conversation) return redirect(`/servers/${params.serverId}`)

  // The below will determine the opposite/other member in the conversation! We
  // comparing the profile.id of the current user with memberOne and memberTwo.
  // If the profile.id is equal to memberOne.profileId then we know that
  // memberTwo is the otherMember and vice versa.
  const { memberOne, memberTwo } = conversation
  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <main className="flex h-full flex-col bg-muted text-muted-foreground">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
    </main>
  )
}
