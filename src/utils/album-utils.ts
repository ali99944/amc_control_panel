import type { Album } from "../types/album"
import { AlbumBuilderSong } from "../types/album-builder"

export const calculateAlbumDuration = (songs: AlbumBuilderSong[]): number => {
  return songs.reduce((total, song) => total + song.duration, 0)
}

export const formatAlbumDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}س ${minutes}د`
  }
  return `${minutes}د`
}

export const getAlbumTypeLabel = (type: 'single' | 'ep' | 'album' | 'compilation'): string => {
  switch (type) {
    case "single":
      return "أغنية منفردة"
    case "ep":
      return "EP"
    case "album":
      return "ألبوم"
    case "compilation":
      return "مجموعة"
    default:
      return type
  }
}

export const getAlbumTypeColor = (type: 'single' | 'ep' | 'album' | 'compilation'): string => {
  switch (type) {
    case "single":
      return "bg-blue-100 text-blue-800"
    case "ep":
      return "bg-green-100 text-green-800"
    case "album":
      return "bg-purple-100 text-purple-800"
    case "compilation":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const validateAlbumData = (album: Partial<Album>): string[] => {
  const errors: string[] = []

  if (!album.name || album.name.trim().length < 2) {
    errors.push("اسم الألبوم يجب أن يكون أكثر من حرفين")
  }

  if (!album.artist_id) {
    errors.push("يجب اختيار فنان للألبوم")
  }

  if (!album.release_date) {
    errors.push("تاريخ الإصدار مطلوب")
  }

  if (!album.album_type) {
    errors.push("نوع الألبوم مطلوب")
  }

  return errors
}

export const generateTrackNumbers = (songs: AlbumBuilderSong[]): { song_id: number; track_number: number }[] => {
  return songs.map((song, index) => ({
    song_id: song.id,
    track_number: index + 1,
  }))
}

export const sortSongsByTrackNumber = (songs: AlbumBuilderSong[]): AlbumBuilderSong[] => {
  return [...songs].sort((a, b) => (a.track_number || 0) - (b.track_number || 0))
}

export const getAlbumCompletionPercentage = (album: Album): number => {
  let score = 0
  const maxScore = 10

  // Basic info (4 points)
  if (album.name) score += 1
  if (album.artist_id) score += 1
  if (album.release_date) score += 1
  if (album.album_type) score += 1

  // Optional info (3 points)
  if (album.description) score += 1
  if (album.image) score += 1
  if (album.record_label || album.producer) score += 1

  // Content (3 points)
  if (album.songs_count > 0) score += 1
  if (album.songs_count >= 3) score += 1
  if (album.genres_count > 0) score += 1

  return Math.round((score / maxScore) * 100)
}

export const getAlbumStatusBadge = (album: Album) => {
  if (!album.is_active) {
    return {
      text: "غير نشط",
      className: "bg-red-100 text-red-800",
    }
  }

  if (album.is_featured) {
    return {
      text: "مميز",
      className: "bg-yellow-100 text-yellow-800",
    }
  }

  return {
    text: "نشط",
    className: "bg-green-100 text-green-800",
  }
}
