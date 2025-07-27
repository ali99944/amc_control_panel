"use client"

import Dialog from "../../components/ui/dialog"
import Button from "../../components/ui/button"

interface CreatePodcastDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreatePodcastDialog({ isOpen, onClose, onSuccess }: CreatePodcastDialogProps) {
  const handleSubmit = () => {
    // Implement create podcast logic
    console.log("Creating podcast...")
    onClose()
    onSuccess?.()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إنشاء بودكاست جديد" size="lg">
      <div className="space-y-4">
        <p className="text-gray-600">سيتم إضافة نموذج إنشاء البودكاست هنا</p>

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="flex-1">
            إنشاء البودكاست
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
