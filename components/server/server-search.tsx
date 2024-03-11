"use client"

import { Search } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Props = {
  data: {
    label: string
    type: "channel" | "member"
    data:
      | {
          icon: React.ReactNode
          name: string
          id: string
        }[]
      | undefined
  }[]
}

export default function ServerSearch({ data }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const onClick = ({
    id,
    type,
  }: {
    id: string
    type: "channel" | "member"
  }) => {
    setOpen(false)
    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-x-2 rounded-md border px-2 py-2 opacity-70 transition hover:opacity-100"
      >
        <Search className="size-4 text-card-foreground/60" />
        <p className="text-sm font-semibold text-opacity-50 transition-all group-hover:opacity-100">
          Search
        </p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList className="bg-card">
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null
            return (
              <CommandGroup
                key={label}
                heading={label}
                className="m-1 rounded-md border border-dashed bg-popover text-xs text-popover-foreground"
              >
                {data?.map(({ id, icon, name }) => {
                  return (
                    <article key={id} className="relative">
                      <CommandItem
                        onSelect={() => onClick({ id, type })}
                        className="relative h-9 cursor-pointer"
                      >
                        <span className="ml-6 text-xs">{name}</span>
                      </CommandItem>
                      <span className="absolute left-2 top-1/2 -translate-y-1/2">
                        {icon}
                      </span>
                    </article>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
