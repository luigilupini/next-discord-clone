import { NextAuthConfig } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import GoogleProvider from "next-auth/providers/google"

export default {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
} as NextAuthConfig
