import Footer from "@/components/footer"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import SocketIndicator from "@/components/socket/socket-indicator"

export default function HomePage() {
  return (
    <GridBase layout="basic">
      <GridHeader className="py-2 pr-2">
        <h1 className="text-2xl font-bold">Socket.io</h1>
        <div className="flex items-center justify-center gap-2">
          <SocketIndicator />
        </div>
      </GridHeader>

      <GridBody className="-mt-2">Body here!</GridBody>
      <GridFooter>
        <Footer />
      </GridFooter>
    </GridBase>
  )
}
