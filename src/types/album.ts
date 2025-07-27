export interface Album {
  id: number
  name: string
  description?: string | null
  image: string | null
  artist_id: number
  artist?: {
    id: number
    name: string
    image?: string | null
  }
  songs_count: number
  genres_count: number
  total_duration?: number // in seconds
  release_date: string
  is_active: boolean
  is_featured: boolean
  album_type: 'Single' | 'EP' | 'Album' | 'Compilation'
  record_label?: string | null
  producer?: string | null
  created_at: string
  updated_at: string
  songs?: AlbumSong[]
  genres?: AlbumGenre[]
}

export interface AlbumSong {
  id: number
  album_id: number
  song_id: number
  track_number: number
  song: {
    id: number
    title: string
    duration: number
    artist?: {
      id: number
      name: string
    }
  }
}

export interface AlbumGenre {
  id: number
  album_id: number
  genre_id: number
  genre: {
    id: number
    name: string
    color: string
  }
}

export interface CreateAlbumData {
  name: string
  description?: string
  image?: File | null
  artist_id: number
  release_date: string
  is_active: boolean
  is_featured: boolean
  album_type: Album['album_type']
  record_label?: string
  producer?: string
}

export interface UpdateAlbumData extends Partial<CreateAlbumData> {
  id: number
}

export interface AlbumFilters {
  search?: string
  artist_id?: number
  album_type?: Album['album_type']
  is_active?: boolean
  is_featured?: boolean
  release_year?: number
}
