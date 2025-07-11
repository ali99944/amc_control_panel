"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeletePlaylist, type Playlist } from "../../hooks/use-playlists"

interface DeletePlaylistDialogProps {
  isOpen: boolean
  onClose: () => void
  playlist: Playlist | null
  onSuccess?: () => void
}

export default function DeletePlaylistDialog({ isOpen, onClose, playlist, onSuccess }: DeletePlaylistDialogProps) {
  const { mutate: deletePlaylist, isPending } = useDeletePlaylist(playlist?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!playlist) return
    deletePlaylist({ id: playlist.id })
  }

  if (!playlist) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف قائمة التشغيل"
      message={`هل أنت متأكد من حذف قائمة التشغيل "${playlist.name}"؟ تحتوي على ${playlist.songs_count} أغنية. هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف قائمة التشغيل"
      loading={isPending}
    />
  )
}
