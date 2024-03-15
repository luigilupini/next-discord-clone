"use client"

import { PropsWithChildren } from "react"

import { Toaster } from "@/components/ui/toaster"
import { useMounted } from "@/lib/hooks/use-mounted"
import { ModalProvider } from "@/state/context/leaf/modal"
import { QueryProvider } from "@/state/context/leaf/query"
import ThemeProvider from "@/state/context/leaf/theme"

import { ClerkProvider } from "@clerk/nextjs"
import { SocketProvider } from "./leaf/socket"

const ProviderTree = ({ children }: PropsWithChildren) => {
  const mounted = useMounted()
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
          <QueryProvider>
            <ModalProvider />
            {children}
          </QueryProvider>
          <Toaster />
        </SocketProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default ProviderTree
