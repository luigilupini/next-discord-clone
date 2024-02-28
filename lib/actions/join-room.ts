"use server"

import { createSafeActionClient as safeAction } from "next-safe-action"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import * as zfd from "zod-form-data"
import db from "../db"

export const action = safeAction()

const updateSchema = zfd.formData({
  roomId: z
    .string({ required_error: "Please enter a valid room name" })
    .min(3, "Please use at least 3 characters")
    .max(150, "Please use less than 15 characters"),
})

export const joinRoom = action(updateSchema, async ({ roomId }) => {
  try {
    const result = await db.chatRoom.findFirst({
      where: { id: roomId },
    })
    if (!result) throw new Error("Room not found or does not exist.")
    revalidatePath(`/room/${roomId}`)
    return {
      roomId: roomId,
      success: { message: "Room found: " },
    }
  } catch (error) {
    throw new Error(`error: ${error}`)
  }
})
