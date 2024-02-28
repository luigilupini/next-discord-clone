import CreateForm from "@/components/create-form"
import JoinForm from "@/components/join-form"

export default function HomePage() {
  return (
    <main className="flex size-full flex-col items-center justify-center gap-2">
      <div className="w-full max-w-xl">
        <article className="relative flex flex-col items-start gap-4">
          <CreateForm />
          <JoinForm />
        </article>
      </div>
    </main>
  )
}
