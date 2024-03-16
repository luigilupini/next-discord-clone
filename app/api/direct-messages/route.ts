import { DirectMessage } from "@prisma/client"
import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/actions/current-profile"
import db from "@/lib/db"

const MESSAGES_BATCH = 10

export async function GET(req: Request) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get("cursor")
    const conversationId = searchParams.get("conversationId")

    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!conversationId) return new NextResponse("ID missing", { status: 400 })

    let messages: DirectMessage[] = []

    if (cursor) {
      messages = await db.directMessage.findMany({
        // If we have a cursor, we want to fetch the next batch of messages
        // based on the cursor position!
        skip: 1,
        cursor: { id: cursor },
        take: MESSAGES_BATCH,
        // ...
        where: { conversationId },
        include: { member: { include: { profile: true } } },
        orderBy: { createdAt: "desc" },
      })
      // Otherwise, if we don't have a cursor, we want to fetch the first batch
      // of messages based on the conversationId like above!
    } else {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: { conversationId },
        include: { member: { include: { profile: true } } },
        orderBy: { createdAt: "desc" },
      })
    }

    // We create the next cursor for the next infinite query using the
    // information from the currently fetched batch of messages! Here
    // if MESSAGES_BATCH is 10, we want the last message in the array
    // to be the next cursor! And if less than 10, that means we have
    // reached the end of our infinite query/load, and no need to change
    // the next cursor! And that is going to tell tanstack query that we
    // have reached the end and there is no next page of data to fetch.
    let nextCursor = null
    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    })
  } catch (error) {
    console.log("[DIRECT_MSG_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
