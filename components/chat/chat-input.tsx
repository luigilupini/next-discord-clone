"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useForm } from "react-hook-form"
import * as z from "zod"

import EmojiPicker from "@/components/emoji-picker"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useModal from "@/state/zustand/use-modal-store"

type Props = {
  name: string
  apiUrl: string
  query: Record<string, any>
  type: "channel" | "conversation"
}

const formSchema = z.object({
  content: z.string().min(1),
})

export default function ChatInput({ apiUrl, query, name, type }: Props) {
  const { onOpen } = useModal()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    https: try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })
      await axios.post(url, values)
      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <footer className="text-md flex w-full items-center justify-center px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative p-4 pb-6">
                    <Button
                      type="button"
                      onClick={() => onOpen("messageFile", { apiUrl, query })}
                      className="absolute left-8 top-7 flex size-[24px] items-center justify-center rounded-full p-1 transition"
                    >
                      <Plus />
                    </Button>

                    <Input
                      disabled={isLoading}
                      className="border-0 border-none bg-card px-14 py-6 text-[13px] text-card-foreground placeholder:text-card-foreground/60"
                      placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                      {...field}
                    />
                    <div className="absolute right-8 top-7">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </footer>
  )
}
