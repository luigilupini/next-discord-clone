import { Params } from "@/lib/definitions"

type Props = {
  params: Params
}

export default function ConversionsIdPage({ params }: Props) {
  console.log(params)
  return (
    <main className="flex h-full flex-col bg-muted text-muted-foreground">
      <p>ConversionsIdPage</p>
    </main>
  )
}
