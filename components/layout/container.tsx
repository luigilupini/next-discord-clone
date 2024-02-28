import { Center } from "@/components/layout/flex"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function EmptyContent({
  title = "Empty",
  className,
}: {
  title?: string
  className?: string
}) {
  return (
    <Card className={cn("size-full", className)}>
      <Center className="size-full">
        <p className="text-xs opacity-80">{title}</p>
      </Center>
    </Card>
  )
}
