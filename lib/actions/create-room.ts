"use server"

import { redirect } from "next/navigation"
import db from "../db"
import { delay } from "../utils"

export const createRoom = async () => {
  const room = await db.chatRoom.create({
    data: {},
  })
  await delay(1000)
  redirect(`/room/${room.id}`)
}
