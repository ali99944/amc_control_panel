// import type { Artist } from "./artist"
// import type Genre from "./genre"

// export interface ArtistProfile {
//   artist: Artist
//   genres: Genre[]
//   top_tracks: Track[]
//   recent_songs: Track[]
//   albums: Album[]
//   playlists: Playlist[]
//   statistics: ArtistStatistics
//   social_links: SocialLinks
//   related_artists: Artist[]
// }

// export interface Track {
//   id: number
//   title: string
//   duration: number
//   plays_count: number
//   likes_count: number
//   image: string
//   audio_file: string
//   release_date: string
//   is_featured: boolean
//   album?: Album
// }

// export interface Album {
//   id: number
//   title: string
//   image: string
//   release_date: string
//   songs_count: number
//   total_duration: number
//   type: "album" | "single" | "ep"
// }

// export interface Playlist {
//   id: number
//   name: string
//   image: string
//   songs_count: number
//   is_public: boolean
//   created_at: string
// }

// export interface ArtistStatistics {
//   total_plays: number
//   monthly_listeners: number
//   total_likes: number
//   total_shares: number
//   countries_count: number
//   top_country: string
//   growth_rate: number
// }

// export interface SocialLinks {
//   instagram?: string
//   twitter?: string
//   facebook?: string
//   youtube?: string
//   spotify?: string
//   apple_music?: string
// }


import { Artist } from "./artist"

export interface ArtistProfile extends Artist {
  social_links: {
    instagram?: string
    twitter?: string
    youtube?: string
    spotify?: string
    apple_music?: string
  }
  genres: string[]
  moods: string[]
  verification_status: 'verified' | 'pending' | 'unverified'
  total_streams: number
  monthly_listeners: number
  top_countries: Array<{
    country: string
    listeners: number
    percentage: number
  }>
  discography: {
    albums: Array<{
      id: number
      title: string
      release_date: string
      tracks_count: number
      total_streams: number
      cover_image: string
    }>
    singles: Array<{
      id: number
      title: string
      release_date: string
      streams: number
      cover_image: string
    }>
  }
  analytics: {
    streams_per_track: Array<{
      track_name: string
      streams: number
      growth: number
    }>
    follower_growth: Array<{
      date: string
      followers: number
    }>
    monthly_streams: Array<{
      month: string
      streams: number
    }>
  }
  similar_artists: Array<{
    id: number
    name: string
    image: string
    similarity_score: number
  }>
}

export interface UpdateArtistProfileData {
  id: number
  name: string
  bio: string
  image?: File
  social_links: ArtistProfile['social_links']
  genres: string[]
  moods: string[]
  verification_status: ArtistProfile['verification_status']
  is_featured: boolean
  is_active: boolean
}
