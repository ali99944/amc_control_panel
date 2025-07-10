"use client"
import Dialog from "../../components/ui/dialog"
import { useCreateTag } from "../../hooks/use-tags"
import TagForm from "./tag-form"
import type { TagFormData } from "./tag-form-schema"

interface CreateTagDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateTagDialog({ isOpen, onClose, onSuccess }: CreateTagDialogProps) {
  const { mutate: createTag, isPending } = useCreateTag(() => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: TagFormData) => {
    createTag({
      name: data.name,
      description: data.description || undefined,
    })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إنشاء تاغ جديد" size="md">
      <TagForm onSubmit={handleSubmit} isLoading={isPending} submitText="إنشاء التاغ" onCancel={onClose} />
    </Dialog>
  )
}
