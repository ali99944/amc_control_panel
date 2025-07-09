"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useManagers } from "../../hooks/use-managers"
import type { Manager } from "../../types/manager"
import Button from "../../components/ui/button"
import DangerDialog from "../../components/ui/danger-dialog"

interface DeleteManagerDialogProps {
  manager: Manager
}

export function DeleteManagerDialog({ manager }: DeleteManagerDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { deleteManager } = useManagers()

  const handleDelete = () => {
    deleteManager(manager.id)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <DangerDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="حذف المدير"
        message={`هل أنت متأكد من حذف المدير "${manager?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف المدير"
      />
    </>
  )
}
