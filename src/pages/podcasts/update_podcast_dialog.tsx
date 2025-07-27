"use client"

import Dialog from "../../components/ui/dialog"
import Button from "../../components/ui/button"
import type { Podcast } from "../../types/podcast"

interface UpdatePodcastDialogProps {
  isOpen: boolean
  onClose: () => void
  podcast: Podcast | null
  onSuccess?: () => void
}

export default function UpdatePodcastDialog({ isOpen, onClose, podcast, onSuccess }: UpdatePodcastDialogProps) {
  const handleSubmit = () => {
    // Implement update podcast logic
    console.log("Updating podcast:", podcast?.id)
    onClose()
    onSuccess?.()
  }

  if (!podcast) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل البودكاست" size="lg">
      <div className="space-y-4">
        <p className="text-gray-600">سيتم إضافة نموذج تعديل البودكاست "{podcast.title}" هنا</p>

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="flex-1">
            حفظ التغييرات
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
