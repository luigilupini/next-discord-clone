import { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex size-full items-center justify-center">
      {children}
    </main>
  )
}
