export interface PlatformStats {
  users: {
    total: number
    active: number
    new_this_month: number
    growth_rate: number
  }
  content: {
    total_songs: number
    total_artists: number
    total_playlists: number
    total_genres: number
  }
  engagement: {
    total_plays: number
    total_listening_hours: number
    average_session_duration: number
    daily_active_users: number
  }
  revenue: {
    total_revenue: number
    monthly_revenue: number
    revenue_growth: number
    average_revenue_per_user: number
  }
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
    fill?: boolean
  }[]
}

export interface TopItem {
  id: number
  name: string
  value: number
  change: number
  image?: string
  type: 'song' | 'artist' | 'playlist' | 'genre'
}

export interface TimeSeriesData {
  date: string
  value: number
  label?: string
}
