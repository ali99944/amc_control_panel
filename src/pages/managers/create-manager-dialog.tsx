"use client"

import { useState } from "react"

import { Plus } from "lucide-react"
import { ManagerForm } from "./manager-form"
import { useManagers } from "../../hooks/use-managers"
import type { ManagerFormData } from "./manager-form-schema"
import Button from "../../components/ui/button"
import Dialog from "../../components/ui/dialog"

export function CreateManagerDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { createManager, isCreating } = useManagers()

  const handleSubmit = (data: ManagerFormData) => {    
    createManager({
      name: data.name,
      username: data.username,
      password: data.password!,
      permissions: [],
    })
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="primary-inverted">
        <Plus className="w-4 h-4 ml-2" />
        إضافة مدير جديد
      </Button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="إضافة مدير جديد" size="lg">
        <ManagerForm onSubmit={handleSubmit} isLoading={isCreating} />
      </Dialog>
    </>
  )
}
