"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { initials } from "@/lib/utils"
import { motion } from "framer-motion"
import { DoorOpen } from "lucide-react"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Footer() {
  const { data: session } = useSession()
  return (
    <motion.footer
      className="-mt-2 px-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        delay: 2,
        type: "spring",
        ease: "easeInOut",
      }}
    >
      <Card className="flex w-full rounded-b-none rounded-t-xl border-b-transparent p-2">
        {session && <Authorized session={session} />}
      </Card>
    </motion.footer>
  )
}

function Authorized({ session }: { session: Session }) {
  const { user } = session
  return (
    <article className="flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        <Avatar className="size-10">
          <div className="size-full rounded-full border-[1px]">
            <AvatarImage
              src={session!.user!.image!}
              alt="@user"
              className="rounded-full border-[2px] border-transparent"
            />
            <AvatarFallback className="rounded-full border-[2px] border-transparent">
              {user?.name && initials(user?.name)}
            </AvatarFallback>
          </div>
        </Avatar>
        <p className="flex flex-col">
          <span className="inline-block max-w-[195px] truncate text-start text-[13px] font-semibold">
            {user?.name}
          </span>
          <span className="-mt-[2px] inline-block max-w-[195px] truncate text-start text-[12px]">
            {user?.email}
          </span>
        </p>
      </div>

      <Button asChild variant="ghost">
        <Link
          href="/api/auth/signout"
          className="flex items-center justify-center gap-2 opacity-80 hover:bg-transparent hover:opacity-100"
        >
          Leave
          <DoorOpen size={16} />
        </Link>
      </Button>
    </article>
  )
}
