export interface KPIData {
  totalActiveUsers: number
  newSignups: number
  dailyStreams: number
  mostStreamedTrack: {
    id: number
    title: string
    artist: string
    streams: number
    cover_image?: string
  }
}

export interface StreamingActivityData {
  date: string
  streams: number
}

export interface TopTrackData {
  id: number
  title: string
  artist: string
  streams: number
  cover_image?: string
}

export interface SubscriptionData {
  label: string
  value: number
  color: string
}