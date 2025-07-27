import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteAlbum } from "../../hooks/use-albums"
import { Album } from "../../types/album"

interface DeleteAlbumDialogProps {
  isOpen: boolean
  onClose: () => void
  album: Album | null
  onSuccess?: () => void
}

export default function DeleteAlbumDialog({ isOpen, onClose, album, onSuccess }: DeleteAlbumDialogProps) {
  const { mutate: deleteAlbum, isPending } = useDeleteAlbum(album?.id ,() => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!album) return
    deleteAlbum({ id: album.id })
  }

  if (!album) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف الألبوم"
      message={
        album.songs_count > 0
          ? `هل أنت متأكد من حذف الألبوم "${album.name}"؟ يحتوي هذا الألبوم على ${album.songs_count} أغنية. سيتم حذف جميع الأغاني المرتبطة بالألبوم. هذا الإجراء لا يمكن التراجع عنه.`
          : `هل أنت متأكد من حذف الألبوم "${album.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`
      }
      confirmText="حذف الألبوم"
      loading={isPending}
    />
  )
}
