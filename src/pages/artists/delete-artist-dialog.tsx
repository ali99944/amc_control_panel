"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteArtist } from "../../hooks/use-artists"
import { Artist } from "../../types/artist"

interface DeleteArtistDialogProps {
  isOpen: boolean
  onClose: () => void
  artist: Artist | null
  onSuccess?: () => void
}

export default function DeleteArtistDialog({ isOpen, onClose, artist, onSuccess }: DeleteArtistDialogProps) {
  const { mutate: deleteArtist, isPending } = useDeleteArtist(artist?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!artist) return
    deleteArtist({ id: artist.id })
  }

  if (!artist) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف الفنان"
      message={`هل أنت متأكد من حذف الفنان "${artist.name}"؟ سيتم حذف جميع أغانيه وألبوماته المرتبطة به. هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف الفنان"
      loading={isPending}
    />
  )
}
