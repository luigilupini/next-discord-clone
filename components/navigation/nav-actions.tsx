"use client"

import { ActionTooltip } from "@/components/action-tooltip"
import useModalStore from "@/state/zustand/use-modal-store"
import { Plus } from "lucide-react"

export default function NavActions() {
  const { onOpen } = useModalStore()
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-muted transition-all group-hover:rounded-[16px] group-hover:bg-secondary">
            <Plus
              className="text-secondary transition group-hover:text-secondary-foreground"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
