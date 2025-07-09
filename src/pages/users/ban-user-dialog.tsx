"use client"


import ConfirmationDialog from "../../components/ui/confirmation-dialog"
import DangerDialog from "../../components/ui/danger-dialog"
import { useBanUser } from "../../hooks/use-users"
import User from "../../types/user"

interface BanUserDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSuccess?: () => void
}

export default function BanUserDialog({ isOpen, onClose, user, onSuccess }: BanUserDialogProps) {
  const { mutate: banUser, isPending } = useBanUser(user?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!user) return
    banUser({ 
      id: user.id, 
      is_banned: !user.is_banned 
    })
  }

  if (!user) return null

  const isCurrentlyBanned = user.is_banned
  const action = isCurrentlyBanned ? "إلغاء حظر" : "حظر"
  const actionPast = isCurrentlyBanned ? "إلغاء حظر" : "حظر"

  // Use different dialog based on action
  if (isCurrentlyBanned) {
    // Unban - use confirmation dialog (less dangerous)
    return (
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        title={`${action} المستخدم`}
        message={`هل أنت متأكد من ${actionPast} المستخدم "${user.name}"؟ سيتمكن من الوصول إلى التطبيق مرة أخرى.`}
        confirmText={action}
        loading={isPending}
        variant="success"
      />
    )
  }

  // Ban - use danger dialog (more dangerous)
  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={`${action} المستخدم`}
      message={`هل أنت متأكد من ${actionPast} المستخدم "${user.name}"؟ لن يتمكن من الوصول إلى التطبيق حتى يتم إلغاء الحظر.`}
      confirmText={action}
      loading={isPending}
    />
  )
}
