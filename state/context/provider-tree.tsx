"use client"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SocketProvider } from "@/state/context/socket"
import ThemeProvider from "@/state/context/theme"
import { ClerkProvider } from "@clerk/nextjs"
import { PropsWithChildren } from "react"

const ProviderTree = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SocketProvider>
          <TooltipProvider>
            {children}

            <Toaster />
          </TooltipProvider>
        </SocketProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default ProviderTree
