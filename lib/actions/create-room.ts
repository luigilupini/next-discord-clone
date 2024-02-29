"use server"

import db from "@/lib/db"
import { delay } from "@/lib/utils"
import { redirect } from "next/navigation"

export const createRoom = async () => {
  const room = await db.chatRoom.create({
    data: {},
  })
  await delay(1000)
  redirect(`/room/${room.id}`)
}
