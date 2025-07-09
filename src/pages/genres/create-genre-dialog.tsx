"use client"

import GenreForm from "./genre-form"
import { useCreateGenre } from "../../hooks/use-genres"
import type { GenreFormData } from "./genre-form-schema"
import Dialog from "../../components/ui/dialog"

interface CreateGenreDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateGenreDialog({ isOpen, onClose, onSuccess }: CreateGenreDialogProps) {
  const { mutate: createGenre, isPending } = useCreateGenre(() => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: GenreFormData & { image?: File }) => {
    const formData = new FormData()
    formData.append("name", data.name)
    if (data.description) formData.append("description", data.description)
    if (data.color) formData.append("color", data.color)
    if (data.image) formData.append("image", data.image)
    formData.append("is_active", data.is_active.toString())

    createGenre(formData)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إضافة نوع موسيقي جديد" size="lg">
      <GenreForm onSubmit={handleSubmit} isLoading={isPending} submitText="إضافة النوع الموسيقي" onCancel={onClose} />
    </Dialog>
  )
}
