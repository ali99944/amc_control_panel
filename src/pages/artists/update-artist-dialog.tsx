"use client"

import ArtistForm from "./artist-form"
import { useUpdateArtist } from "../../hooks/use-artists"
import type { ArtistFormData } from "./artist-form-schema"
import Dialog from "../../components/ui/dialog"
import { Artist } from "../../types/artist"

interface UpdateArtistDialogProps {
  isOpen: boolean
  onClose: () => void
  artist: Artist | null
  onSuccess?: () => void
}

export default function UpdateArtistDialog({ isOpen, onClose, artist, onSuccess }: UpdateArtistDialogProps) {
  const { mutate: updateArtist, isPending } = useUpdateArtist(artist?.id,() => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: ArtistFormData & { image?: File }) => {
    if (!artist) return

    const formData = new FormData()
    formData.append("id", artist.id.toString())
    formData.append("name", data.name)
    if (data.bio) formData.append("bio", data.bio)
    if (data.image) formData.append("image", data.image)
    formData.append("is_featured", data.is_featured.toString())
    formData.append("is_active", data.is_active.toString())

    updateArtist(formData)
  }

  if (!artist) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل الفنان" size="lg">
      <ArtistForm
        initialData={artist}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="حفظ التغييرات"
        onCancel={onClose}
      />
    </Dialog>
  )
}
