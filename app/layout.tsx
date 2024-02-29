import { auth } from "@/auth"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { rubik } from "@/lib/typeface/fonts"
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
      className={cn("antialiased", rubik.className)}
      suppressHydrationWarning
    >
      <body className="h-screen w-screen overflow-hidden">
        <ProviderTree session={session}>
          <main className="mx-auto flex size-full max-w-5xl flex-col">
            {children}
            <ThemeToggle />
            <Footer />
          </main>
        </ProviderTree>
      </body>
    </html>
  )
}
