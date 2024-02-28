"use client"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import ThemeProvider from "@/context/theme"
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
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default ProviderTree
