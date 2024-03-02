import Footer from "@/components/footer"
import JoinForm from "@/components/form/join-form"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import SocketIndicator from "@/components/socket/socket-indicator"

export default function HomePage() {
  return (
    <GridBase layout="basic">
      <GridBody className="-mt-2">
        <GridHeader className="py-2 pr-2">
          <h1 className="text-2xl font-bold">Socket.io</h1>
          <div className="flex items-center justify-center gap-2">
            <SocketIndicator />
          </div>
        </GridHeader>
        <article className="relative flex size-full flex-col items-end justify-center gap-4 px-4">
          <JoinForm />
        </article>
      </GridBody>
      <GridFooter>
        <Footer />
      </GridFooter>
    </GridBase>
  )
}
