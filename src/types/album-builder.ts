export interface AlbumBuilderSong {
    id: number
    title: string
    artist: {
      id: number
      name: string
    }
    duration: number
    genre?: {
      id: number
      name: string
      color: string
    }
    is_in_album: boolean
    track_number?: number
    file_url?: string
    cover_image?: string
  }
  
  export interface AlbumBuilderState {
    selectedSongs: AlbumBuilderSong[]
    availableSongs: AlbumBuilderSong[]
    searchQuery: string
    filterArtist: number | null
    filterGenre: number | null
    isLoading: boolean
  }
  
  export interface TrackReorderItem {
    id: number
    track_number: number
    title: string
    artist_name: string
    duration: number
  }
  