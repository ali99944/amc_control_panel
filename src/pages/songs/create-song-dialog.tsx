"use client"


import SongForm from "./song-form"
import { useCreateSong } from "../../hooks/use-songs"
import type { SongFormData } from "./song-form-schema"
import { useNavigate } from "react-router-dom"
import Dialog from "../../components/ui/dialog"

interface CreateSongDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateSongDialog({ isOpen, onClose, onSuccess }: CreateSongDialogProps) {
  const naviate = useNavigate()
  const { mutate: createSong, isPending } = useCreateSong((song) => {
    onClose()
    onSuccess?.()
    // Navigate to song details page
    naviate(`/songs/${song.id}`)
  })

  const handleSubmit = (data: SongFormData & { cover_image?: File; audio_file?: File }) => {
    try {
      console.log('creating song');
      
      const formData = new FormData()
    formData.append("title", data.title)
    if(data.artist_id) formData.append("artist_id", data.artist_id.toString())
      if (data.genre_id) formData.append("genre_id", data.genre_id.toString())
    formData.append("release_date", data.release_date)
    // formData.append("explicit", data.explicit.toString())
    if (data.lyrics) formData.append("lyrics", data.lyrics)
    if (data.description) formData.append("description", data.description)
    if (data.cover_image) formData.append("image", data.cover_image)
    if (data.audio_file) formData.append("audio", data.audio_file)

    createSong(formData)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إضافة أغنية جديدة" size="xl">
      <SongForm onSubmit={handleSubmit} isLoading={isPending} submitText="إضافة الأغنية" onCancel={onClose} />
    </Dialog>
  )
}
