"use client"

import DangerDialog from "../../../components/ui/danger-dialog"
import { PodcastEpisode } from "../../../types/podcast"


interface DeleteEpisodeDialogProps {
  isOpen: boolean
  onClose: () => void
  episode: PodcastEpisode | null
  onSuccess?: () => void
}

export default function DeleteEpisodeDialog({ isOpen, onClose, episode, onSuccess }: DeleteEpisodeDialogProps) {
  const handleConfirm = async () => {
    if (!episode) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Deleting episode:", episode.id)

      onClose()
      onSuccess?.()
    } catch (error) {
      console.error("Error deleting episode:", error)
    }
  }

  if (!episode) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف الحلقة"
      message={`هل أنت متأكد من حذف الحلقة "${episode.title}"؟ تم تشغيلها ${episode.play_count} مرة. هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف الحلقة"
    />
  )
}
