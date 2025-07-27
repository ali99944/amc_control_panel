// Song Filters
export interface SongFilters {
    search?: string
    artist_id?: number
    album_id?: number
    genre_id?: number
    tag_ids?: string[]
    is_active?: boolean
    is_featured?: boolean
    release_year?: number
    duration_min?: number
    duration_max?: number
    sort_by?: 'title' | 'artist' | 'release_date' | 'duration' | 'plays'
    sort_order?: 'asc' | 'desc'
  }
  
  // Playlist Filters
  export interface PlaylistFilters {
    search?: string
    user_id?: number
    is_public?: boolean
    is_featured?: boolean
    created_year?: number
    song_count_min?: number
    song_count_max?: number
    sort_by?: 'name' | 'created_at' | 'song_count' | 'plays'
    sort_order?: 'asc' | 'desc'
  }
  
  // Artist Filters
  export interface ArtistFilters {
    search?: string
    genre_id?: number
    is_active?: boolean
    is_featured?: boolean
    country?: string
    debut_year?: number
    album_count_min?: number
    album_count_max?: number
    sort_by?: 'name' | 'debut_date' | 'album_count' | 'followers'
    sort_order?: 'asc' | 'desc'
  }
  
  // Tag Filters
  export interface TagFilters {
    search?: string
    usage_count_min?: number
    usage_count_max?: number
    created_year?: number
    sort_by?: 'name' | 'created_at' | 'usage_count'
    sort_order?: 'asc' | 'desc'
  }
  
  // Manager Filters
  export interface ManagerFilters {
    search?: string
    role?: 'super_admin' | 'admin' | 'staff'
    is_active?: boolean
    created_year?: number
    last_login_days?: number
    sort_by?: 'name' | 'email' | 'created_at' | 'last_login'
    sort_order?: 'asc' | 'desc'
  }
  
  // Genre Filters
  export interface GenreFilters {
    search?: string
    is_active?: boolean
    song_count_min?: number
    song_count_max?: number
    created_year?: number
    sort_by?: 'name' | 'created_at' | 'song_count'
    sort_order?: 'asc' | 'desc'
  }
  
  // User Filters
  export interface UserFilters {
    search?: string
    is_active?: boolean
    is_verified?: boolean
    registration_year?: number
    last_login_days?: number
    playlist_count_min?: number
    playlist_count_max?: number
    country?: string
    sort_by?: 'name' | 'email' | 'created_at' | 'last_login' | 'playlist_count'
    sort_order?: 'asc' | 'desc'
  }
  