"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import type { Podcast } from "../../types/podcast"

interface DeletePodcastDialogProps {
  isOpen: boolean
  onClose: () => void
  podcast: Podcast | null
  onSuccess?: () => void
}

export default function DeletePodcastDialog({ isOpen, onClose, podcast, onSuccess }: DeletePodcastDialogProps) {
  const handleConfirm = () => {
    // Implement delete podcast logic
    console.log("Deleting podcast:", podcast?.id)
    onClose()
    onSuccess?.()
  }

  if (!podcast) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف البودكاست"
      message={`هل أنت متأكد من حذف البودكاست "${podcast.title}"؟ يحتوي على ${podcast.total_episodes} حلقة و ${podcast.subscribers_count} متابع. هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف البودكاست"
    />
  )
}
