"use client"

import { PropsWithChildren } from "react"

import { Toaster } from "@/components/ui/toaster"
import { useMounted } from "@/lib/hooks/use-mounted"
import ThemeProvider from "@/state/context/leaf/theme"
import { ClerkProvider } from "@clerk/nextjs"
import { ModalProvider } from "./leaf/modal"

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
        <ModalProvider />
        {children}
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default ProviderTree
