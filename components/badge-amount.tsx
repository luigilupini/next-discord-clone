"use client"

import { motion } from "framer-motion"

export default function BadgeAmount({ amount }: { amount: number }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
      className="absolute -right-2 -top-2 flex size-5 transform items-center justify-center rounded-full bg-primary p-1 text-xs text-primary-foreground"
    >
      {amount}
    </motion.span>
  )
}
