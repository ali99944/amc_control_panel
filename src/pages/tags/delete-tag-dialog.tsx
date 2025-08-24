import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteTag } from "../../hooks/use-tags"
import { Tag } from "../../types/tag"

interface DeleteTagDialogProps {
  isOpen: boolean
  onClose: () => void
  tag: Tag | null
  onSuccess?: () => void
}

export default function DeleteTagDialog({ isOpen, onClose, tag, onSuccess }: DeleteTagDialogProps) {
  const { mutate: deleteTag, isPending } = useDeleteTag(tag?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!tag) return
    deleteTag({ id: tag.id })
  }

  if (!tag) return null

  const songsCount = tag?.song_tags?.length || 0

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف التاغ"
      message={
        songsCount > 0
          ? `هل أنت متأكد من حذف التاغ "${tag.name}"؟ هذا التاغ مستخدم في ${songsCount} أغنية. سيتم إزالة التاغ من جميع الأغاني. هذا الإجراء لا يمكن التراجع عنه.`
          : `هل أنت متأكد من حذف التاغ "${tag.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`
      }
      confirmText="حذف التاغ"
      loading={isPending}
    />
  )
}
