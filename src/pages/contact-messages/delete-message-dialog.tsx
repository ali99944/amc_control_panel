import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteContactMessage } from "../../hooks/use-contact-messages"
import { ContactMessage } from "../../types/contact-message"

interface DeleteMessageDialogProps {
  isOpen: boolean
  onClose: () => void
  message: ContactMessage | null
  onSuccess?: () => void
}

export default function DeleteMessageDialog({ isOpen, onClose, message, onSuccess }: DeleteMessageDialogProps) {
  const { mutate: deleteMessage, isPending } = useDeleteContactMessage(() => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!message) return
    deleteMessage({ id: message.id })
  }

  if (!message) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف الرسالة"
      message={`هل أنت متأكد من حذف رسالة "${message.subject}" من ${message.name}؟ هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف الرسالة"
      loading={isPending}
    />
  )
}
