"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { PropsWithChildren, useState } from "react"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [audioIndex, setAudioIndex] = useState(0)
  const audioFiles = ["/sounds/switch-on.mp3", "/sounds/switch-off.mp3"]

  const handleClick = (theme: string) => {
    setTheme(theme)
    const audio = new Audio(audioFiles[audioIndex])
    audio.play()
    setAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length)
  }

  return (
    <WrapperBoundary>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="border-none bg-primary text-primary-foreground backdrop-blur-3xl hover:bg-primary/80 hover:text-primary-foreground/80"
        >
          <Button variant="ghost" className="rounded-full p-2">
            <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mr-4">
          <DropdownMenuItem onClick={() => handleClick("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleClick("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </WrapperBoundary>
  )
}

function WrapperBoundary({ children }: PropsWithChildren) {
  return (
    <div className="absolute -right-12 -top-12 z-50 cursor-pointer bg-transparent p-6 transition-all delay-300 duration-300 ease-in-out hover:-translate-x-8 hover:translate-y-8">
      {children}
    </div>
  )
}
