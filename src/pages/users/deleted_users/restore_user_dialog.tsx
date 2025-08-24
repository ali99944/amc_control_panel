"use client"

import ConfirmationDialog from "../../../components/ui/confirmation-dialog"
import { useRestoreUser } from "../../../hooks/use-users"
import User from "../../../types/user"


interface RestoreUserDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSuccess?: () => void
}

export default function RestoreUserDialog({ isOpen, onClose, user, onSuccess }: RestoreUserDialogProps) {
  const { mutate: restoreUser, isPending } = useRestoreUser(user?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!user) return
    restoreUser({ id: user.id })
  }

  if (!user) return null

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="استعادة المستخدم"
      message={`هل أنت متأكد من استعادة المستخدم "${user.name}"؟ سيتم إعادة تفعيل حسابه وجميع بياناته.`}
      confirmText="استعادة المستخدم"
      loading={isPending}
      variant="success"
    />
  )
}
