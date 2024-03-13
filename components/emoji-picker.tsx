"use client"

import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Smile } from "lucide-react"
import { useTheme } from "next-themes"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  onChange: (value: string) => void
}

export default function EmojiPicker({ onChange }: Props) {
  const { resolvedTheme } = useTheme()
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-muted-foreground/50 transition hover:text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="mb-16 border-none bg-transparent shadow-none drop-shadow-none"
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}
