// https://clerk.com/docs/quickstarts/nextjs
// Add authentication to your app Now that Clerk is installed and mounted in
// your application, you can decide which pages are public and which should
// require authentication to access:

// Create a middleware.ts file at the root of your project, or in your src/ directory if you have one.
// In your middleware.ts, export Clerk's authMiddleware() helper:

// With authMiddleware(), authentication will be enabled by default on all
// routes that your Next.js middleware runs on, blocking access to all signed
// out visitors. You can specify valid routes using Next.js's matcher. Add the
// following code to your middleware.ts to protect your entire application:
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Routes that can be accessed while signed out
  // publicRoutes: ['/anyone-can-visit-this-route'],
  publicRoutes: ["/api/uploadthing"],
  // Routes that can always be accessed, and have
  // no authentication information
  // ignoredRoutes: ['/no-auth-in-this-route'],
})

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
