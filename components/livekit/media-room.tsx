"use client"

import { useUser } from "@clerk/nextjs"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import "@livekit/components-styles"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
  chatId: string
  video: boolean
  audio: boolean
}

export default function MediaRoom({ chatId, video, audio }: Props) {
  const { user } = useUser()
  const [token, setToken] = useState("")

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return

    const name = `${user.firstName} ${user.lastName}`

    const onLive = async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await res.json()
        setToken(data.token)
      } catch (e) {
        console.log(e)
      }
    }
    onLive()
  }, [user?.firstName, user?.lastName, chatId])

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center opacity-70">
        <Loader2 className="my-4 size-7 animate-spin" />
        <p className="text-xs">Loading messages...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="size-full">
        <LiveKitRoom
          data-lk-theme="default"
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          token={token}
          connect={true}
          video={video}
          audio={audio}
        >
          <VideoConference />
        </LiveKitRoom>
      </div>
    </div>
  )
}
