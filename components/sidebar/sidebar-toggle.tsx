import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SidebarToggle({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: () => void
}) {
  return (
    <button
      className="absolute -right-2 top-[28px] z-50 flex cursor-pointer place-content-center rounded-full border bg-card/50 text-card-foreground/50 backdrop-blur-3xl transition-colors duration-300 ease-in-out hover:bg-card hover:text-card-foreground"
      onClick={toggle}
    >
      {isOpen ? (
        <ChevronLeft className="size-[22px] p-[3px]" />
      ) : (
        <ChevronRight className="size-[22px] p-[3px]" />
      )}
    </button>
  )
}
