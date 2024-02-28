"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { initials } from "@/lib/utils"
import { opacityVariants, showVariants } from "@/styles/animations/sidebar"
import { AnimatePresence, motion } from "framer-motion"
import { LogOut, User } from "lucide-react"
import { Session } from "next-auth"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function SidebarFooter({ isOpen }: { isOpen: boolean }) {
  const { data: session } = useSession()
  return (
    <article className="mb-2 mt-8 flex h-10 w-full items-center justify-start gap-3 rounded-lg px-3">
      {!session && <UnAuthorized isOpen={isOpen} />}
      {session && <Authorized session={session} isOpen={isOpen} />}
    </article>
  )
}

function Authorized({
  session,
  isOpen,
}: {
  session: Session
  isOpen: boolean
}) {
  const { user } = session
  return (
    <>
      <Link
        href={`/profile/${user?.name}`}
        className="cursor-pointer rounded-full shadow transition-all duration-300 ease-in-out hover:shadow-[-10px_-10px_30px_4px_hsl(var(--secondary)/0.2),_5px_5px_15px_4px_hsl(var(--primary)/0.35)]"
      >
        <Avatar className="size-10">
          <div className="size-full rounded-full border-[1px] border-primary/90 ">
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
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={opacityVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="relative flex w-full flex-col text-center"
          >
            <span className="inline-block max-w-[195px] truncate text-start text-[13px] font-semibold">
              {user?.name}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <LogOut
                  className="absolute -right-0 top-[3px] inline-block size-4 cursor-pointer opacity-90 transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-100"
                  onClick={(e) => signOut()}
                />
              </TooltipTrigger>
              <TooltipContent>Logout</TooltipContent>
            </Tooltip>

            <span className="inline-block max-w-[195px] truncate text-start text-[12px]">
              {user?.email}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function UnAuthorized({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <User
        width={140}
        height={140}
        className="size-10 min-w-min rounded-full border-2 border-primary/70 bg-muted object-cover p-2 text-muted-foreground"
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={showVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="relative w-full text-center"
          >
            <span className="block whitespace-nowrap text-start text-[13px]">
              You are not signed in
            </span>
            <span
              className="block cursor-pointer whitespace-nowrap text-start text-[13px] font-semibold"
              onClick={(e) => signIn()}
            >
              Sign in
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
