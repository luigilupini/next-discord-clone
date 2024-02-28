import { auth } from "@/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { geist } from "@/lib/typeface/fonts"
import { cn } from "@/lib/utils"
import ProviderTree from "@/state/context/provider-tree"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

import "@/styles/globals.css"

export default async function RootLayout({ children }: PropsWithChildren) {
  let session = await auth()
  if (!session) redirect("/api/auth/signin")
  return (
    <html
      lang="en"
      className={cn("antialiased", geist.className)}
      suppressHydrationWarning
    >
      <body className="screen-full flex overflow-hidden">
        <ProviderTree session={session}>
          <main className="mx-auto size-full max-w-7xl">
            {children}
            <ThemeToggle />
          </main>
        </ProviderTree>
      </body>
    </html>
  )
}
