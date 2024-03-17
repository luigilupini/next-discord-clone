// import { ThemeToggle } from "@/components/theme-toggle"
import { local } from "@/lib/typeface/fonts"
import { cn } from "@/lib/utils"
import ProviderTree from "@/state/context/provider-tree"
import { PropsWithChildren } from "react"

import "@/styles/globals.css"

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn("antialiased", local.className)}
      suppressHydrationWarning
    >
      <body className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
        <ProviderTree>
          <main className="size-full">{children}</main>
          {/* <ThemeToggle /> */}
        </ProviderTree>
      </body>
    </html>
  )
}
