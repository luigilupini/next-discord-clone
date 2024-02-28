import { NextAuthConfig } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

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
  ],
} as NextAuthConfig
