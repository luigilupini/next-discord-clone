import authConfig from "@/auth.config"
import prisma from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

let sessionSub: string | undefined

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
      return true
    },
    async jwt({ token, user, isNewUser }) {
      sessionSub = token.sub
      return token
    },
    async session({ session }) {
      session.id = sessionSub
      return session
    },
  },
})
