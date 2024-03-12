import { cn } from "@/lib/utils"
import useGridStore, { GridType } from "@/state/zustand/use-grid-store"
import { PropsWithChildren } from "react"

// Define the props type
type Props = PropsWithChildren<{
  className?: string
  ping?: boolean
  layout: GridType
}>

// Our main GridBase component
export default function GridBase({
  children,
  className,
  ping = false,
  layout,
}: Props) {
  useGridStore.getState().setLayout(layout)
  const base = useGridStore.getState().layoutStyles.base
  return (
    <main
      className={cn("overflow-hidden", base, className, {
        ping: ping,
      })}
    >
      {children}
    </main>
  )
}

type ChildProps = PropsWithChildren<{
  className?: string
  ping?: boolean
}>

// Standalone component
export function GridHeader({ children, className, ping = false }: ChildProps) {
  const header = useGridStore.getState().layoutStyles.header
  return (
    <header
      className={cn(`flex items-center justify-between ${header}`, className, {
        ping: ping,
      })}
    >
      {children}
    </header>
  )
}

// Standalone component
export function GridBody({ children, className, ping = false }: ChildProps) {
  const body = useGridStore.getState().layoutStyles.body
  return (
    <section className={cn("overflow-hidden", body, className, { ping: ping })}>
      {children}
    </section>
  )
}

// Standalone component
export function GridFooter({ children, className, ping = false }: ChildProps) {
  const footer = useGridStore.getState().layoutStyles.footer
  return (
    <footer
      className={cn("overflow-hidden", footer, className, { ping: ping })}
    >
      {children}
    </footer>
  )
}

// Standalone component
export async function GridSide({
  children,
  className,
  ping = false,
}: ChildProps) {
  const side = useGridStore.getState().layoutStyles.aside
  return (
    <aside className={cn("overflow-hidden", side, className, { ping: ping })}>
      {children}
    </aside>
  )
}

// Standalone component
export function GridEnd({ children, className, ping = false }: ChildProps) {
  const end = useGridStore.getState().layoutStyles.end
  return (
    <aside className={cn("overflow-hidden", end, className, { ping: ping })}>
      {children}
    </aside>
  )
}

// Here we attach sub-components to GridBase
GridBase.Header = GridHeader
GridBase.Body = GridBody
GridBase.Footer = GridFooter
GridBase.Side = GridSide
GridBase.End = GridEnd
