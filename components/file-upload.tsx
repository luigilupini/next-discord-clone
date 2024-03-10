"use client"

import { Button } from "@/components/ui/button"
import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"
import { X } from "lucide-react"
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
        <Image src={value} alt="image" className="rounded-full" layout="fill" />
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
