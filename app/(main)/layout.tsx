import Navbar from "@/components/navigation/navbar"
import { Card } from "@/components/ui/card"
import { PropsWithChildren } from "react"

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="size-full">
      <Card className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col rounded-none border-none shadow-none md:flex">
        <Navbar />
      </Card>
      <section className="h-full md:pl-[72px]">{children}</section>
    </main>
  )
}
