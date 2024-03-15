"use client"

import { Button } from "@/components/ui/button"
import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"
import { FileIcon, X } from "lucide-react"
import Image from "next/image"

type Props = {
  // We are matching the keys of our FileRouter core.ts file:
  endpoint: "messageFile" | "serverImage"
  value: string
  onChange: (url?: string) => void
}

export default function FileUpload({ endpoint, value, onChange }: Props) {
  const fileType = value?.split(".").pop()
  if (value && fileType !== "pdf") {
    return (
      <div className="relative size-20">
        <Image
          src={value}
          alt="image"
          className="size-full rounded-full object-cover"
          width={100}
          height={100}
          priority
        />
        <Button
          onClick={() => onChange("")}
          className="absolute right-0 top-0 size-fit rounded-full p-1"
          type="button"
          size="icon"
          variant="destructive"
        >
          <X className="size-4" />
        </Button>
      </div>
    )
  }
  if (value && fileType === "pdf") {
    return (
      <div className="relative mt-2 flex items-center rounded-md bg-background/20 p-2">
        <FileIcon className="size-10 fill-primary/20 stroke-primary" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-xs text-primary/40 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  }
  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          console.log(error)
        }}
      />
    </div>
  )
}
