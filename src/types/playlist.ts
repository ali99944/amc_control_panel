import { Song } from "./song"

export interface Playlist {
  id: number
  name: string
  description: string | null
  cover_image: string | null
  created_at: string
  updated_at: string | null
  songs_count: number
  total_duration: number
  is_public: boolean
  created_by: string

  songs: Song[]
}