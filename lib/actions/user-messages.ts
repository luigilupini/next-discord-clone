"use server"

import db from "@/lib/db"

export async function userMessages({ roomId }: { roomId: string }) {
  return await db.message.findMany({
    where: {
      chatRoomId: roomId,
    },
    include: {
      user: true,
    },
  })
}

export async function chatroomUsers({ roomId }: { roomId: string }) {
  return await db.user.findMany({
    where: {
      Message: {
        some: {
          chatRoomId: roomId,
        },
      },
    },
  })
}
