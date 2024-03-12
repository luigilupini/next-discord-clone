"use server"

import db from "@/lib/db"

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        // Here we use AND to find a conversation where memberOneId is equal to
        // memberOneId and memberTwoId is equal to memberTwoId!
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      // Once we find that conversation, we want to include the member profiles!
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    })
  } catch {
    return null
  }
}

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  try {
    return await db.conversation.create({
      data: { memberOneId, memberTwoId },
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    })
  } catch {
    return null
  }
}

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId))

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId)
  }

  return conversation
}
