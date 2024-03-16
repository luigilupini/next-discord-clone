import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { directMessageId: string } },
) {
  try {
    const profile = await currentProfile()

    const { content } = await req.json()
    const { directMessageId } = params
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get("conversationId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!directMessageId) return new NextResponse("Message ID", { status: 400 })
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
    if (!conversation) return new NextResponse("conversation", { status: 404 })

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo
    if (!member) return new NextResponse("Member not found", { status: 404 })

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        member: { include: { profile: true } },
      },
    })
    if (!directMessage || directMessage.deleted)
      return new NextResponse("Message Not Found", { status: 404 })

    const isMessageOwner = directMessage.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) return new NextResponse("Unauthorized", { status: 401 })
    if (!isMessageOwner)
      return new NextResponse("Unauthorized", { status: 401 })

    directMessage = await db.directMessage.update({
      where: { id: directMessageId as string },
      data: { content },
      include: {
        member: { include: { profile: true } },
      },
    })
    // ⭐️ Important: This needs to be consistent
    const updateKey = `chat:${conversationId}:messages:update`

    return NextResponse.json({
      status: 201,
      updateKey: updateKey,
      message: directMessage,
    })
  } catch (error) {
    console.log("[MESSAGES_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { directMessageId: string } },
) {
  try {
    const profile = await currentProfile()
    const { directMessageId } = params
    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get("serverId")
    const conversationId = searchParams.get("conversationId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!directMessageId) return new NextResponse("Message ID", { status: 400 })
    if (!conversationId) return new NextResponse("Channel ID", { status: 400 })

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
    if (!conversation) return new NextResponse("conversation", { status: 404 })

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo
    if (!member) return new NextResponse("Member not found", { status: 404 })

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        member: { include: { profile: true } },
      },
    })
    if (!directMessage || directMessage.deleted)
      return new NextResponse("Message Not Found", { status: 404 })

    const isMessageOwner = directMessage.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) return new NextResponse("Unauthorized", { status: 401 })

    directMessage = await db.directMessage.update({
      where: { id: directMessageId as string },
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
    const updateKey = `chat:${conversationId}:messages:update`

    return NextResponse.json({
      status: 201,
      updateKey: updateKey,
      message: directMessage,
    })
  } catch (error) {
    console.log("[MESSAGES_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
