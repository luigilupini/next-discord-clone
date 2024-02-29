import "next-auth"

declare module "next-auth" {
  /**
   * Extends the built-in session types from NextAuth.js
   */
  interface Session {
    id?: string // Optionally include the `id` property
  }
}
