"use client"

import GenreForm from "./genre-form"
import { useUpdateGenre } from "../../hooks/use-genres"
import type { GenreFormData } from "./genre-form-schema"
import Dialog from "../../components/ui/dialog"
import { Genre } from "../../types"

interface UpdateGenreDialogProps {
  isOpen: boolean
  onClose: () => void
  genre: Genre | null
  onSuccess?: () => void
}

export default function UpdateGenreDialog({ isOpen, onClose, genre, onSuccess }: UpdateGenreDialogProps) {
  const { mutate: updateGenre, isPending } = useUpdateGenre(genre?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: GenreFormData & { image?: File }) => {
    if (!genre) return

    const formData = new FormData()
    formData.append("name", data.name)
    if (data.description) formData.append("description", data.description)
    if (data.color) formData.append("color", data.color)
    if (data.image) formData.append("image", data.image)
    formData.append("is_active", data.is_active.toString())

    updateGenre(formData)
  }

  if (!genre) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل النوع الموسيقي" size="lg">
      <GenreForm
        initialData={genre}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="حفظ التغييرات"
        onCancel={onClose}
      />
    </Dialog>
  )
}
