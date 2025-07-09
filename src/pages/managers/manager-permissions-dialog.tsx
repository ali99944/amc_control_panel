"use client"
import { Shield } from "lucide-react"
import type { Manager } from "../../types/manager"
import Button from "../../components/ui/button"

interface ManagerPermissionsDialogProps {
  manager: Manager
  onOpenPermissionsPage: (managerId: number) => void
}

export function ManagerPermissionsDialog({ manager, onOpenPermissionsPage }: ManagerPermissionsDialogProps) {
  const handleOpenPermissions = () => {
    onOpenPermissionsPage(manager.id)
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={handleOpenPermissions}
    >
      <Shield className="w-4 h-4" />
    </Button>
  )
}
