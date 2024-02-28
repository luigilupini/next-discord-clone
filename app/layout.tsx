import { auth } from "@/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { inter } from "@/lib/typeface/fonts"
import { cn } from "@/lib/utils"
import ProviderTree from "@/state/context/provider-tree"
import type { Metadata } from "next"
import { PropsWithChildren } from "react"

import "@/styles/globals.css"

export default async function RootLayout({ children }: PropsWithChildren) {
  let session = await auth()
  return (
    <html
      lang="en"
      className={cn("antialiased", inter.className)}
      suppressHydrationWarning
    >
      <body className="screen-full flex overflow-hidden">
        <ProviderTree session={session}>
          <main className="flex-1">
            {children}
            <ThemeToggle />
          </main>
        </ProviderTree>
      </body>
    </html>
  )
}
