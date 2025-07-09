"use client"

import ArtistForm from "./artist-form"
import { useCreateArtist } from "../../hooks/use-artists"
import type { ArtistFormData } from "./artist-form-schema"
import Dialog from "../../components/ui/dialog"

interface CreateArtistDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateArtistDialog({ isOpen, onClose, onSuccess }: CreateArtistDialogProps) {
  const { mutate: createArtist, isPending } = useCreateArtist(() => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: ArtistFormData & { image?: File }) => {
    const formData = new FormData()
    formData.append("name", data.name)
    if (data.bio) formData.append("bio", data.bio)
    if (data.image) formData.append("image", data.image)
    formData.append("is_featured", data.is_featured.toString())
    formData.append("is_active", data.is_active.toString())

    createArtist(formData)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إضافة فنان جديد" size="lg">
      <ArtistForm onSubmit={handleSubmit} isLoading={isPending} submitText="إضافة الفنان" onCancel={onClose} />
    </Dialog>
  )
}
