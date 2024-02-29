"use server"

import db from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { createSafeActionClient as safeAction } from "next-safe-action"
import { z } from "zod"
import * as zfd from "zod-form-data"

export const action = safeAction()

const schema = zfd.formData({
  text: z
    .string({ required_error: "Please enter a message" })
    .min(3, "Please use at least 3 characters")
    .max(150, "Please use less than 15 characters"),
  roomId: z
    .string({ required_error: "Please enter a valid room name" })
    .min(3, "Please use at least 3 characters")
    .max(150, "Please use less than 15 characters"),
  userId: z
    .string({ required_error: "Please enter a valid user name" })
    .min(3, "Please use at least 3 characters")
    .max(150, "Please use less than 15 characters"),
})

export const sendMessage = action(schema, async ({ text, roomId, userId }) => {
  try {
    // https://pusher.com/docs/channels/getting_started/javascript/#trigger-events-from-your-server
    // pusher.trigger('my-channel', 'my-event', {:message => 'hello world'})
    console.log({ text, roomId, userId })
    pusherServer.trigger(roomId, "incoming-message", text)
    const result = await db.message.create({
      data: {
        text: text,
        chatRoomId: roomId,
        userId: userId,
      },
    })
    console.log(result)
    if (!result) throw new Error("Chat could not be created.")
    // revalidatePath(`/room/${roomId}`)
    return {
      text: text,
      roomId: roomId,
      success: { message: "Chat has submitted successfully" },
    }
  } catch (error) {
    throw new Error(`error: ${error}`)
  }
})
