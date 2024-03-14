import { Hash } from "lucide-react"

type Props = {
  name: string
  type: "channel" | "conversation"
}

export default function ChatWelcome({ name, type }: Props) {
  return (
    <div className="mb-4 space-y-2 px-4">
      {type === "channel" && (
        <div className="flex size-[75px] items-center justify-center rounded-full bg-card text-card-foreground shadow-sm">
          <Hash className="size-12" />
        </div>
      )}
      <p className="text-xl font-bold">
        {type === "channel" ? `Welcome to #` : ``}
        {name}
      </p>
      <p className="text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}.`}
      </p>
    </div>
  )
}
