export interface Artist {
  id: number
  name: string
  image: string
  bio: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string | null
  total_followers: number
  songs_count?: number
  albums_count?: number
}

export interface CreateArtistData {
  name: string
  image?: File | null
  bio: string
  is_featured: boolean
  is_active: boolean
}

export interface UpdateArtistData extends CreateArtistData {
  id: number
}
