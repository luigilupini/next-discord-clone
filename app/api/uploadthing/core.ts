import { auth } from "@clerk/nextjs"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

// Clerk callback handles authentication and returns the userId
// We check this on each interaction with the server with middleware
const onAuth = () => {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")
  return { userId: userId }
}

// `FileRouter` for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Below we define many cases for ourFileRoutes to handle!
  // First case is handling of `serverImage` using the above `f` constant
  // Here we accept and image of max size 4MB and max file count of 1
  // Lastly `messageFile` is used to accept images in our messages
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // This code runs on your server before upload
    .middleware(() => onAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    // This code runs on your server before upload
    .middleware(() => onAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter // 👈🏻 Ensure that we satisfy a FileRouter type

export type OurFileRouter = typeof ourFileRouter

// ! Important: make sure your `route.ts` files uses this FileRouter
