import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } },
) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!serverId) return new NextResponse("Server ID missing", { status: 400 })
    if (!params.memberId) return new NextResponse("ID missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          // Here we delete the member from the server
          deleteMany: {
            id: params.memberId,
            // Ensure the member is not the currently logged in user! This is an
            // extra measure to ensure the owner/admin of the server can not
            // kick themselves out of the server.
            profileId: { not: profile.id },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } },
) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)
    const { role } = await req.json()
    const serverId = searchParams.get("serverId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!serverId) return new NextResponse("Server ID missing", { status: 400 })
    if (!params.memberId) return new NextResponse("ID missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          // Here we update the role of the member
          update: {
            where: {
              id: params.memberId,
              // Ensure the member is not the currently logged in user!
              // This is an extra measure to ensure the owner/admin of the
              // server can not change their own role.
              profileId: { not: profile.id },
            },
            data: { role },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
