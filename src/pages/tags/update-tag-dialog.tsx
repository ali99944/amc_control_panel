"use client"
import Dialog from "../../components/ui/dialog"
import { useUpdateTag } from "../../hooks/use-tags"
import { Tag } from "../../types/tag"
import TagForm from "./tag-form"
import type { TagFormData } from "./tag-form-schema"

interface UpdateTagDialogProps {
  isOpen: boolean
  onClose: () => void
  tag: Tag | null
  onSuccess?: () => void
}

export default function UpdateTagDialog({ isOpen, onClose, tag, onSuccess }: UpdateTagDialogProps) {
  const { mutate: updateTag, isPending } = useUpdateTag(() => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: TagFormData) => {
    if (!tag) return

    updateTag({
      id: tag.id,
      name: data.name,
      description: data.description || undefined,
    })
  }

  if (!tag) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل التاغ" size="md">
      <TagForm
        initialData={tag}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="حفظ التغييرات"
        onCancel={onClose}
      />
    </Dialog>
  )
}
