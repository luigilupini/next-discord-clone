"use server"

import db from "@/lib/db"

export default async function userMessages({ roomId }: { roomId: string }) {
  // return await db.message.findMany({
  //   include: { user: true },
  // })

  return await db.message.findMany({
    where: {
      chatRoomId: roomId,
    },
    include: {
      user: true,
    },
  })
}
