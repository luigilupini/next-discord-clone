"use client"

import { Card } from "@/components/ui/card"
import { UserButton } from "@clerk/nextjs"
import { motion } from "framer-motion"

export default function Footer() {
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
        <UserButton afterSignOutUrl="/" />
      </Card>
    </motion.footer>
  )
}
