import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { messageId: string } },
) {
  try {
    const profile = await currentProfile()
    const { content } = await req.json()
    const { messageId } = params
    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get("serverId")
    const channelId = searchParams.get("channelId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!messageId) return new NextResponse("Message ID", { status: 400 })
    if (!serverId) return new NextResponse("Server ID", { status: 400 })
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

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: { include: { profile: true } },
      },
    })
    if (!message || message.deleted)
      return new NextResponse("Message Not Found", { status: 404 })

    const isMessageOwner = message.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) return new NextResponse("Unauthorized", { status: 401 })
    if (!isMessageOwner)
      return new NextResponse("Unauthorized", { status: 401 })

    message = await db.message.update({
      where: { id: messageId as string },
      data: { content },
      include: {
        member: { include: { profile: true } },
      },
    })
    // ⭐️ Important: This needs to be consistent
    const updateKey = `chat:${channelId}:messages:update`

    return NextResponse.json({
      status: 201,
      updateKey: updateKey,
      message: message,
    })
  } catch (error) {
    console.log("[MESSAGES_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } },
) {
  try {
    const profile = await currentProfile()
    const { messageId } = params
    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get("serverId")
    const channelId = searchParams.get("channelId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!messageId) return new NextResponse("Message ID", { status: 400 })
    if (!serverId) return new NextResponse("Server ID", { status: 400 })
    if (!channelId) return new NextResponse("Channel ID", { status: 400 })

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

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: { include: { profile: true } },
      },
    })
    if (!message || message.deleted)
      return new NextResponse("Message Not Found", { status: 404 })

    const isMessageOwner = message.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) return new NextResponse("Unauthorized", { status: 401 })

    message = await db.message.update({
      where: { id: messageId as string },
      data: {
        fileUrl: null,
        content: "This message has been deleted.",
        deleted: true,
      },
      include: {
        member: { include: { profile: true } },
      },
    })
    // ⭐️ Important: This needs to be consistent
    const updateKey = `chat:${channelId}:messages:update`

    return NextResponse.json({
      status: 201,
      updateKey: updateKey,
      message: message,
    })
  } catch (error) {
    console.log("[MESSAGES_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
