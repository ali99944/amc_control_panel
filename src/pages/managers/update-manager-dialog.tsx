"use client"

import { useState } from "react"
import { Edit } from "lucide-react"
import { ManagerForm } from "./manager-form"
import { useManagers } from "../../hooks/use-managers"
import type { Manager } from "../../types/manager"
import type { ManagerFormData } from "./manager-form-schema"
import Button from "../../components/ui/button"
import Dialog from "../../components/ui/dialog"

interface UpdateManagerDialogProps {
  manager: Manager
}

export function UpdateManagerDialog({ manager }: UpdateManagerDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { updateManager, isUpdating } = useManagers()

  const handleSubmit = (data: ManagerFormData) => {
    updateManager(manager?.id, {
      name: data.name,
      username: data.username,
      permissions: data.permissions ?? [],
    })
    setIsOpen(false)
  }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
        <Edit className="w-4 h-4" />
      </Button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="تعديل بيانات المدير" size="lg">
        <ManagerForm manager={manager} onSubmit={handleSubmit} isLoading={isUpdating} />
      </Dialog>
    </>
  )
}
