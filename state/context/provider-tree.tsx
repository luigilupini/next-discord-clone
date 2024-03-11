"use client"

import { Toaster } from "@/components/ui/toaster"
import { SocketProvider } from "@/state/context/socket"
import ThemeProvider from "@/state/context/theme"
import { ClerkProvider } from "@clerk/nextjs"
import { PropsWithChildren, useEffect, useState } from "react"

const ProviderTree = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SocketProvider>
          {children}
          <Toaster />
        </SocketProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default ProviderTree
