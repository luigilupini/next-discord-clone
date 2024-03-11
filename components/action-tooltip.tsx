"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  label: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}>

export const ActionTooltip = ({ label, children, side, align }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-muted text-muted-foreground"
        >
          <span className="text-[11px] font-medium capitalize">
            {label.toLowerCase()}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
