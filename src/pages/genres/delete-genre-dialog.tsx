"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteGenre } from "../../hooks/use-genres"
import { Genre } from "../../types"

interface DeleteGenreDialogProps {
  isOpen: boolean
  onClose: () => void
  genre: Genre | null
  onSuccess?: () => void
}

export default function DeleteGenreDialog({ isOpen, onClose, genre, onSuccess }: DeleteGenreDialogProps) {
  const { mutate: deleteGenre, isPending } = useDeleteGenre(genre?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!genre) return
    deleteGenre({ id: genre.id })
  }

  if (!genre) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف النوع الموسيقي"
      message={`هل أنت متأكد من حذف النوع الموسيقي "${genre.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف"
      loading={isPending}
    />
  )
}
