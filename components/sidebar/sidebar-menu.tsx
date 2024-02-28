"use client"

import { Center } from "@/components/layout/flex"
import { bottomLinks, topLinks } from "@/components/sidebar/configuration"
import SidebarFooter from "@/components/sidebar/sidebar-footer"
import SidebarSection from "@/components/sidebar/sidebar-section"
import SidebarToggle from "@/components/sidebar/sidebar-toggle"
import { motion } from "framer-motion"
import { useState } from "react"

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <Center
      className="relative h-full w-fit flex-col border-r bg-card py-2"
      as="nav"
    >
      <SidebarHeader isOpen={isOpen} toggle={toggle} />
      <SidebarBody isOpen={isOpen}>
        {/* TOP SECTION */}
        <SidebarSection links={topLinks} isOpen={isOpen} />
        {/* BOTTOM SECTION */}
        <div className="w-full">
          <SidebarSection links={bottomLinks} isOpen={isOpen} />
          <SidebarFooter isOpen={isOpen} />
        </div>
      </SidebarBody>
    </Center>
  )
}

type Props = {
  isOpen: boolean
  toggle: () => void
}

function SidebarHeader({ isOpen, toggle }: Props) {
  return (
    <>
      <SidebarToggle isOpen={isOpen} toggle={toggle} />
      <motion.h1
        className="mb-12 mt-[11px] text-4xl font-bold"
        animate={{
          scale: isOpen ? 1.8 : 1,
          transition: { duration: 0.6 },
        }}
      >
        V
      </motion.h1>
    </>
  )
}

function SidebarBody({
  children,
  isOpen,
}: {
  children: React.ReactNode
  isOpen: boolean
}) {
  return (
    <motion.nav
      className="flex w-full flex-1 flex-col items-start justify-between"
      animate={{
        width: isOpen ? "300px" : "64px",
        transition: {
          duration: 0.6,
          type: "spring",
          damping: 14,
        },
      }}
    >
      {children}
    </motion.nav>
  )
}
