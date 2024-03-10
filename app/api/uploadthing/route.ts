import { createNextRouteHandler } from "uploadthing/next"
import { ourFileRouter } from "./core"

// Export routes for our Next.js app router
// This is is the same pattern Auth.js uses for Get and Post requests
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
})
