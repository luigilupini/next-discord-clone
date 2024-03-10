import db from "@/lib/db"
import { currentUser, redirectToSignIn } from "@clerk/nextjs"

export const initialProfile = async () => {
  const user = await currentUser()
  if (!user) redirectToSignIn()

  const profile = await db.profile.findUnique({ where: { userId: user?.id } })
  if (profile) return profile

  // If no profile is found, create a new one!
  const newProfile = await db.profile.create({
    data: {
      userId: user?.id || "Anonymous",
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl || "",
      email: user?.emailAddresses[0].emailAddress || "Anonymous",
    },
  })
  return newProfile
}
