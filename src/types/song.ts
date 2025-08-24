import { Artist } from "./artist"
import Genre from "./genre"

export interface Song {
  id: number
  title: string
  artist: Artist
  genre: Genre | null
  cover_image?: string
  original_audio: {
    file_url: string
    duration: number
    filesize: number
    bitrate: number
    format: string
  }
  track_number: number
  explicit: boolean
  release_date: string
  lyrics?: string
  description?: string
  created_at: string
  updated_at: string | null
  versions: SongVersion[]
  plays_count: number
  likes_count: number
  is_active: boolean
}

export interface SongVersion {
  id: number
  song_id: number
  quality: string
  format: string
  file_url: string
  file_size: number
  bitrate: number
  created_at: string
}

export interface CreateSongData {
  title: string
  artist_id: number
  genre_id: string
  release_date: string
  cover_image?: File
  audio_file: File
  track_number?: number
  explicit: boolean
  lyrics?: string
  description?: string
}

export interface UpdateSongData extends Partial<CreateSongData> {
  id: number
}
