export interface StatisticsOverview {
  users_count: number
  available_songs_count: number
  playlists_count: number
  genres_count: number
  artists_count: number
}

export interface UsersGrowthObject {
  date: Date
  users_count: number
}

export interface TopSongRecord {
  song_title: string
  play_count: number
}