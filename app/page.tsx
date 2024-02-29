import CreateForm from "@/components/form/create-room-form"
import JoinForm from "@/components/form/join-form"
import Rooms from "@/components/rooms"

export default function HomePage() {
  return (
    <main className="flex size-full flex-col items-center justify-center gap-2">
      <div className="flex w-full max-w-xl flex-col gap-4">
        <article className="relative flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <CreateForm />
            <Rooms />
          </div>
          <JoinForm />
        </article>
      </div>
    </main>
  )
}
