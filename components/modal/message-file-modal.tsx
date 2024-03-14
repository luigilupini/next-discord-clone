"use client"

import FileUpload from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import useModalStore from "@/state/zustand/use-modal-store"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  fileUrl: z.string().min(1, { message: "Attachment is required" }),
})

export default function MessageFileModal() {
  const { isOpen, onClose, type, data } = useModalStore()
  const isModalOpen = isOpen && type === "messageFile"
  const { apiUrl, query } = data

  const router = useRouter()
  // Create a form instance with zod resolver 🧪
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fileUrl: "",
    },
  })
  // Lets extract the Loading state from the schema!
  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query: query,
      })
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      })
      form.reset()
      router.refresh()
      handleClose()
    } catch (error) {
      console.error("[INITIAL_MODAL]", error)
      throw new Error("Something went wrong while creating your server")
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-card p-0 text-card-foreground">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Add an Attachment
          </DialogTitle>
          <DialogDescription className="text-center">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          {/* Pass a native form element using the form state we spread above from useForm 🚀 */}
          {/* Additionally we can pass our onSubmit handler to the form component! */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="bg-muted/40 px-6 py-4">
              <Button type="submit" disabled={isLoading} variant="default">
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
