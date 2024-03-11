import { NextResponse } from "next/server"
import { v4 as uuid } from "uuid"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile()

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!params.serverId) return new NextResponse("Id Error", { status: 400 })

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        // Generate a new invite code!
        inviteCode: uuid(),
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log("[SERVER_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
