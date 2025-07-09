"use client"

import SongForm from "./song-form"
import { useUpdateSong } from "../../hooks/use-songs"
import type { SongFormData } from "./song-form-schema"
import Dialog from "../../components/ui/dialog"
import { Song } from "../../types/song"

interface UpdateSongDialogProps {
  isOpen: boolean
  onClose: () => void
  song: Song | null
  onSuccess?: () => void
}

export default function UpdateSongDialog({ isOpen, onClose, song, onSuccess }: UpdateSongDialogProps) {
  const { mutate: updateSong, isPending } = useUpdateSong(song?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: SongFormData & { cover_image?: File; audio_file?: File }) => {
    if (!song) return

    const formData = new FormData()
    formData.append("id", song.id.toString())
    formData.append("title", data.title)
    if(data.artist_id) formData.append("artist_id", data.artist_id.toString())
    if (data.genre_id) formData.append("genre_id", data.genre_id.toString())
    formData.append("release_date", data.release_date)
    formData.append("explicit", data.explicit.toString())
    if (data.lyrics) formData.append("lyrics", data.lyrics)
    if (data.description) formData.append("description", data.description)
    if (data.cover_image) formData.append("cover_image", data.cover_image)

    updateSong(formData)
  }

  if (!song) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل الأغنية" size="xl">
      <SongForm
        initialData={song}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="حفظ التغييرات"
        onCancel={onClose}
      />
    </Dialog>
  )
}
