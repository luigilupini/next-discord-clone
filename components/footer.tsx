"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { initials } from "@/lib/utils"
import { motion } from "framer-motion"
import { DoorClosed, DoorOpen } from "lucide-react"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const { data: session } = useSession()
  return (
    <motion.footer
      className="w-full"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1,
        ease: "easeInOut",
      }}
    >
      <Card className="flex w-full px-1 py-[3px] shadow-none">
        {session && <Authorized session={session} />}
      </Card>
    </motion.footer>
  )
}

function Authorized({ session }: { session: Session }) {
  const [hover, setHover] = useState(false)
  const { user } = session
  return (
    <article className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="size-10 rounded-full shadow-sm">
          <div className="size-full rounded-full border-[1px] border-primary/80">
            <AvatarImage
              src={session!.user!.image!}
              alt="@user"
              className="rounded-full border-[2px] border-transparent"
            />
            <AvatarFallback className="rounded-full border-[2px] border-primary">
              {user?.name && initials(user?.name)}
            </AvatarFallback>
          </div>
        </Avatar>
        <p className="flex flex-col">
          <span className="inline-block max-w-[195px] truncate text-start text-[13px] font-semibold">
            {user?.name}
          </span>
          <span className="-mt-[1px] inline-block max-w-[195px] truncate text-start text-[12px]">
            {user?.email}
          </span>
        </p>
      </div>

      <Button
        asChild
        variant="ghost"
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
      >
        <Link
          href="/api/auth/signout"
          className="flex items-center justify-center gap-2 text-sm font-normal opacity-70 transition-all duration-300 ease-in-out hover:bg-secondary hover:fill-primary"
        >
          Leave
          {hover && <DoorOpen size={18} className="animate-pulse" />}
          {!hover && <DoorClosed size={18} />}
        </Link>
      </Button>
    </article>
  )
}
