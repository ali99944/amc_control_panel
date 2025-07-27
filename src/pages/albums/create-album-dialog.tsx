"use client"
import Dialog from "../../components/ui/dialog"
import { useCreateAlbum } from "../../hooks/use-albums"
import AlbumForm from "./album-form"
import type { AlbumFormData } from "./album-form-schema"

interface CreateAlbumDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateAlbumDialog({ isOpen, onClose, onSuccess }: CreateAlbumDialogProps) {
  const { mutate: createAlbum, isPending } = useCreateAlbum(() => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: AlbumFormData, image?: File) => {
    const formData = new FormData()
    
    formData.append("name", data.name)
    if (data.description) formData.append("description", data.description)
    formData.append("artist_id", data.artist_id.toString())
    formData.append("release_date", data.release_date)
    formData.append("album_type", data.album_type)
    // if (data.record_label) formData.append("record_label", data.record_label)
    // if (data.producer) formData.append("producer", data.producer)
    formData.append("is_active", data.is_active.toString())
    formData.append("is_featured", data.is_featured.toString())
    
    if (image) {
      formData.append("image", image)
    }

    createAlbum(formData)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إنشاء ألبوم جديد" size="lg">
      <AlbumForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="إنشاء الألبوم"
        onCancel={onClose}
      />
    </Dialog>
  )
}
