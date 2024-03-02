"use client"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SocketProvider } from "@/state/context/socket"
import ThemeProvider from "@/state/context/theme"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  session: Session | null
}>

const ProviderTree = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  )
}

export default ProviderTree
