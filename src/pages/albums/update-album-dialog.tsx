"use client"
import Dialog from "../../components/ui/dialog"
import { useUpdateAlbum } from "../../hooks/use-albums"
import { Album } from "../../types/album"
import AlbumForm from "./album-form"
import type { AlbumFormData } from "./album-form-schema"

interface UpdateAlbumDialogProps {
  isOpen: boolean
  onClose: () => void
  album: Album | null
  onSuccess?: () => void
}

export default function UpdateAlbumDialog({ isOpen, onClose, album, onSuccess }: UpdateAlbumDialogProps) {
  const { mutate: updateAlbum, isPending } = useUpdateAlbum(album?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: AlbumFormData, image?: File) => {
    if (!album) return

    const formData = new FormData()
    
    formData.append("id", album.id.toString())
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

    updateAlbum(formData)
  }

  if (!album) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل الألبوم" size="lg">
      <AlbumForm
        initialData={album}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="حفظ التغييرات"
        onCancel={onClose}
      />
    </Dialog>
  )
}
