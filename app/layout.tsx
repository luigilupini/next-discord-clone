import { ThemeToggle } from "@/components/theme-toggle"
import { rubik } from "@/lib/typeface/fonts"
import { cn } from "@/lib/utils"
import ProviderTree from "@/state/context/provider-tree"
import { PropsWithChildren } from "react"

import "@/styles/globals.css"

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn("antialiased", rubik.className)}
      suppressHydrationWarning
    >
      <body className="relative h-screen w-screen overflow-hidden">
        <ProviderTree>
          <main className="mx-auto flex size-full max-w-5xl flex-col">
            {children}
          </main>
        </ProviderTree>
        <ThemeToggle />
      </body>
    </html>
  )
}
