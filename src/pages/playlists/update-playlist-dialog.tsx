"use client"

import PlaylistForm from "./playlist-form"
import { useUpdatePlaylist, type Playlist } from "../../hooks/use-playlists"
import { useGetQuery } from "../../hooks/queries-actions"
import type { PlaylistFormData } from "./playlist-form-schema"
import Dialog from "../../components/ui/dialog"
import { Song } from "../../types/song"

interface UpdatePlaylistDialogProps {
  isOpen: boolean
  onClose: () => void
  playlist: Playlist | null
  onSuccess?: () => void
}

export default function UpdatePlaylistDialog({ isOpen, onClose, playlist, onSuccess }: UpdatePlaylistDialogProps) {
  const { mutate: updatePlaylist, isPending } = useUpdatePlaylist(playlist?.id, () => {
    onClose()
    onSuccess?.()
  })

  // Fetch available songs
  const { data: availableSongs = [] } = useGetQuery<Song[]>({
    url: "songs",
    key: ["songs"],
    options: {
        enabled: isOpen
    }
  })

  // Fetch playlist songs
  const { data: playlistSongs = [] } = useGetQuery<Song[]>({
    url: `playlists/${playlist?.id}/songs`,
    key: ["playlist-songs", playlist?.id?.toString() || ""],
    options: {
        enabled: isOpen && !!playlist
    }
  })

  const handleSubmit = (data: PlaylistFormData & { cover_image?: File }) => {
    if (!playlist) return

    const formData = new FormData()
    formData.append("id", playlist.id.toString())
    formData.append("name", data.name)
    if (data.description) formData.append("description", data.description)
    if (data.cover_image) formData.append("cover_image", data.cover_image)
    formData.append("is_public", data.is_public.toString())
    formData.append("song_ids", JSON.stringify(data.song_ids))

    updatePlaylist(formData)
  }

  if (!playlist) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل قائمة التشغيل" size="xl">
      <PlaylistForm
        initialData={playlist}
        availableSongs={availableSongs}
        initialSongs={playlistSongs}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="حفظ التغييرات"
        onCancel={onClose}
      />
    </Dialog>
  )
}
