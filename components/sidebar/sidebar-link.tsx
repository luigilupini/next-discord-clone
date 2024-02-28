"use client"

import { cn } from "@/lib/utils"
import { showVariants } from "@/styles/animations/sidebar"
import { AnimatePresence, motion } from "framer-motion"
import {
  Activity,
  BarChart2 as BarChart,
  Box,
  CreditCard,
  Database,
  Home,
  LayoutGrid,
  Package2 as Package,
  Settings,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const icons = {
  Box,
  Activity,
  BarChart,
  CreditCard,
  Database,
  Home,
  LayoutGrid,
  Package,
  Settings,
  Users,
}

type Props = {
  link: {
    label: string
    icon:
      | "Activity"
      | "Box"
      | "BarChart"
      | "CreditCard"
      | "Database"
      | "Home"
      | "LayoutGrid"
      | "Package"
      | "Settings"
      | "Users"
    href: string
    id: number
  }
  isOpen: boolean
}

export default function SidebarLink({ link, isOpen }: Props) {
  const pathname = usePathname()
  const isHomeLink = link.href === "/"
  const isActive = isHomeLink
    ? pathname === link.href
    : pathname.startsWith(link.href)
  const Icon = icons[link.icon]
  return (
    <Link
      href={link.href}
      className={cn(
        "mb-4 flex h-9 w-full items-center justify-start gap-3 rounded-md p-2 text-[13px] shadow-none transition-all duration-75 ease-in-out",
        { "bg-secondary text-secondary-foreground": isActive },
        { "text-secondary-foreground/70 hover:bg-secondary/80": !isActive },
      )}
    >
      <div className="ml-[3px]">
        <Icon size={18} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={showVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full text-center"
          >
            <span className="whitespace-nowrap font-normal">{link.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  )
}
