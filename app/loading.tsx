import FluidSpinner from "@/components/loader/fluid"

export default function PageLoader() {
  return (
    <main className="flex size-full items-center justify-center">
      <FluidSpinner className="size-[10%] drop-shadow-sm" />
    </main>
  )
}
