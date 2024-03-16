import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
  try {
    const profile = await currentProfile()
    const { content, fileUrl } = await req.json()
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get("conversationId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!conversationId) return new NextResponse("ID missing", { status: 400 })
    if (!content) return new NextResponse("Content missing", { status: 400 })

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          { memberOne: { profileId: profile.id } },
          { memberTwo: { profileId: profile.id } },
        ],
      },
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    })
    if (!conversation)
      return new NextResponse("No conversation", { status: 404 })

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo
    if (!member) return new NextResponse("Member not found", { status: 404 })

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId: conversationId as string,
        memberId: member.id, // Use the member from above query!
      },
      include: {
        member: { include: { profile: true } },
      },
    })
    // ⭐️ Important: This needs to be consistent
    const channelKey = `chat:${conversationId}:messages`

    return NextResponse.json({
      status: 201,
      channelKey: channelKey,
      message: message,
    })
  } catch (error) {
    console.log("[DIRECT_MSG_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { "Set-Cookie": `token=${token?.value}` },
  })
}
