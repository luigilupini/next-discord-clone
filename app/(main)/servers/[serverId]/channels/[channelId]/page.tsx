import { Params } from "@/lib/definitions"

type Props = {
  params: Params
}

export default function ChannelIdPage({ params }: Props) {
  console.log(params)
  return (
    <main className="flex h-full flex-col bg-muted text-muted-foreground">
      <p>ChannelIdPage</p>
    </main>
  )
}
