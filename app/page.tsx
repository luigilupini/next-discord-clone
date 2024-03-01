import Footer from "@/components/footer"
import CreateForm from "@/components/form/create-room-form"
import JoinForm from "@/components/form/join-form"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import RoomList from "@/components/rooms-list"

export default function HomePage() {
  return (
    <GridBase layout="basic">
      <GridBody className="-mt-2">
        <GridHeader className="py-2 pr-2">
          <h1 className="text-3xl font-bold">Channels</h1>
          <div className="flex items-center gap-2">
            <CreateForm />
            <RoomList />
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
