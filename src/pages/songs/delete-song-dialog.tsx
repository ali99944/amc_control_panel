"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteSong } from "../../hooks/use-songs"
import { Song } from "../../types/song"

interface DeleteSongDialogProps {
  isOpen: boolean
  onClose: () => void
  song: Song | null
  onSuccess?: () => void
}

export default function DeleteSongDialog({ isOpen, onClose, song, onSuccess }: DeleteSongDialogProps) {
  const { mutate: deleteSong, isPending } = useDeleteSong(song?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!song) return
    deleteSong({ id: song.id })
  }

  if (!song) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف الأغنية"
      message={`هل أنت متأكد من حذف الأغنية "${song.title}"؟ سيتم حذف جميع النسخ والإحصائيات المرتبطة بها. هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف الأغنية"
      loading={isPending}
    />
  )
}
