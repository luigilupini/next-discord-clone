import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
  try {
    const profile = await currentProfile()
    const { content, fileUrl } = await req.json()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")
    const channelId = searchParams.get("channelId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!serverId) return new NextResponse("Server ID missing", { status: 400 })
    if (!channelId) return new NextResponse("Channel ID", { status: 400 })
    if (!content) return new NextResponse("Content missing", { status: 400 })

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          // Ensure the profile is a member of the server
          some: { profileId: profile.id },
        },
      },
      include: { members: true },
    })
    if (!server) return new NextResponse("Server not found", { status: 404 })

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    })
    if (!channel) return new NextResponse("Channel not found", { status: 404 })

    const member = server.members.find(
      (member) => member.profileId === profile.id,
    )
    if (!member) return new NextResponse("Member not found", { status: 404 })

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id, // Use the member from above query!
      },
      include: {
        member: { include: { profile: true } },
      },
    })
    // ⭐️ Important: This needs to be consistent
    const channelKey = `chat:${channelId}:messages`

    return NextResponse.json({
      status: 201,
      channelKey: channelKey,
      message: message,
    })
  } catch (error) {
    console.log("[MESSAGES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
