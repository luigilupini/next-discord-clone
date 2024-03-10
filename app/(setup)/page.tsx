import Footer from "@/components/footer"
import GridBase, {
  GridBody,
  GridFooter,
  GridHeader,
} from "@/components/layout/grid"
import InitialModal from "@/components/modal/initial-modal"
import { initialProfile } from "@/lib/actions/initial-profile"
import db from "@/lib/db"
import { redirect } from "next/navigation"

export default async function SetupPage() {
  const profile = await initialProfile()

  // Find the first server where the profile is a member of 🔎
  // If found, we will load that server/channel for that user!
  const server = await db.server.findFirst({
    where: { members: { some: { profileId: profile.id } } },
  })
  if (server) return redirect(`/server/${server.id}`)

  return (
    <GridBase layout="basic">
      <GridHeader className="py-2 pr-2">
        <h1 className="text-2xl font-bold">Create a Server</h1>
      </GridHeader>
      <GridBody className="-mt-2">
        <article className="relative flex size-full flex-col items-end justify-center gap-4 px-4">
          <InitialModal />
        </article>
      </GridBody>
      <GridFooter>
        <Footer />
      </GridFooter>
    </GridBase>
  )
}
