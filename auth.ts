import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import prisma from "./prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    // https://authjs.dev/guides/basics/callbacks#sign-in-callback
    async signIn({ user, account, email, credentials, profile }) {
      // console.log("Signin", { user, account, email, credentials, profile  })
      // Check if this is a verification request
      // Check if the user's email is within the user table
      // Prevent verification email for non-invited users
      // if (account?.provider === "email" && email?.verificationRequest) {
      //   const isInvited = await checkInvitedUser(user.email)
      //   if (!isInvited) return false
      // }
      // Allow sign-in for other providers or if the email user is invited
      return true
    },
    async jwt({ token, isNewUser }) {
      // console.log("JWT Token", token)
      return token
    },
    async session({ session }) {
      // console.log("Session", session)
      return session
    },
  },
})
