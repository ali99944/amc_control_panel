"use client"

import PlaylistForm from "./playlist-form"
import { useCreatePlaylist } from "../../hooks/use-playlists"
import { useGetQuery } from "../../hooks/queries-actions"
import type { PlaylistFormData } from "./playlist-form-schema"
import Dialog from "../../components/ui/dialog"
import { Song } from "../../types/song"

interface CreatePlaylistDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreatePlaylistDialog({ isOpen, onClose, onSuccess }: CreatePlaylistDialogProps) {
  const { mutate: createPlaylist, isPending } = useCreatePlaylist(() => {
    onClose()
    onSuccess?.()
  })

  // Fetch available songs
  const { data: availableSongs = [] } = useGetQuery<Song[]>({
    url: "songs",
    key: ["songs"],
    options: {
        enabled: isOpen
    },
  })

  const handleSubmit = (data: PlaylistFormData & { cover_image?: File }) => {
    const formData = new FormData()
    formData.append("name", data.name)
    if (data.description) formData.append("description", data.description)
    if (data.cover_image) formData.append("cover_image", data.cover_image)
    formData.append("is_public", data.is_public.toString())
    formData.append("song_ids", JSON.stringify(data.song_ids))

    createPlaylist(formData)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إنشاء قائمة تشغيل جديدة" size="xl">
      <PlaylistForm
        availableSongs={availableSongs}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="إنشاء قائمة التشغيل"
        onCancel={onClose}
      />
    </Dialog>
  )
}
