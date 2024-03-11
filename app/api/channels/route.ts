import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

export async function POST(req: Request) {
  try {
    const profile = await currentProfile()
    const { name, type } = await req.json()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!serverId) return new NextResponse("ID missing", { status: 400 })
    if (name === "general") return new NextResponse("general", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        // Only a member of the server can create a channel!
        // But they have to additional be an admin or moderator.
        members: {
          some: {
            profileId: profile.id,
            // Only allow admins and moderators can create channels!
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      // After defining the where query, we create the channel!
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name: name,
            type: type,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("CHANNELS_POST", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
