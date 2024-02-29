"use client"

import { cn, delay } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Copy } from "lucide-react"
import { ReactNode, useRef, useState } from "react"

export default function CopyContent({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  const copyClipboard = async () => {
    try {
      const text = textRef.current ? textRef.current.textContent : ""
      await navigator.clipboard.writeText(text || "")
      setCopied(true)
      await delay(800)
      setCopied(false)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const popVariant = {
    initial: { opacity: 0, x: -20, scale: 0.8 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { type: "spring", stiffness: 500, damping: 25 },
    },
  }

  return (
    <div
      className={cn(
        "relative flex w-fit place-items-center gap-[6px]",
        className,
      )}
    >
      <Copy
        size={13}
        onClick={copyClipboard}
        className={cn(
          "cursor-pointer transition-all duration-150 ease-in-out",
          {
            "scale-95 fill-primary/20 text-primary": copied,
          },
        )}
      />

      <span
        ref={textRef}
        className={cn("transition-all duration-150 ease-in-out", {
          "-translate-x-1 scale-95 text-primary": copied,
        })}
      >
        {children}
      </span>
      <AnimatePresence>
        {copied && (
          <motion.span
            variants={popVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute -top-3 left-3 rounded-md border border-primary-foreground bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
