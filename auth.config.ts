import { NextAuthConfig } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import GoogleProvider from "next-auth/providers/google"

export default {
  providers: [
    AzureADProvider({
      tenantId: process.env.AUTH_AZURE_TENANT,
      clientId: process.env.AUTH_AZURE_ID,
      clientSecret: process.env.AUTH_AZURE_SECRET,
      authorization: {
        params: {
          scope:
            "openid profile email offline_access User.ReadWrite.All Directory.ReadWrite.All",
        },
      },
      account(account) {
        return account
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
} as NextAuthConfig
