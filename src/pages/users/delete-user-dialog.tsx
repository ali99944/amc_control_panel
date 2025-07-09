"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteUser } from "../../hooks/use-users"
import User from "../../types/user"

interface DeleteUserDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSuccess?: () => void
}

export default function DeleteUserDialog({ isOpen, onClose, user, onSuccess }: DeleteUserDialogProps) {
  const { mutate: deleteUser, isPending } = useDeleteUser(user?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!user) return
    deleteUser({ id: user.id })
  }

  if (!user) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف المستخدم"
      message={`هل أنت متأكد من حذف المستخدم "${user.name}"؟ سيتم حذف جميع بياناته وقوائم التشغيل الخاصة به. هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف المستخدم"
      loading={isPending}
    />
  )
}
