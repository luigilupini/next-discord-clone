import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

type FlexProps = PropsWithChildren<{
  className?: string
  as?:
    | "div"
    | "span"
    | "section"
    | "header"
    | "nav"
    | "footer"
    | "main"
    | "article"
    | "aside"
    | "ul"
    | "ol"
    | "li"
}>

export function Center({ children, className, as = "div" }: FlexProps) {
  const Component = as
  return (
    <Component className={cn("flex items-center justify-center", className)}>
      {children}
    </Component>
  )
}

export function Between({ className, children, as = "div" }: FlexProps) {
  const Component = as
  return (
    <Component className={cn("flex items-center justify-between", className)}>
      {children}
    </Component>
  )
}
