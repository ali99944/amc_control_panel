import User from "./user"

export interface Podcast {
  id: number
  title: string
  description: string
  cover_image: string | null
  creator_id: number
  category_id: number
  language: string
  is_explicit: boolean
  is_active: boolean
  is_featured: boolean
  total_episodes: number
  total_duration: number
  subscribers_count: number
  total_plays: number
  created_at: string
  updated_at: string

  // Relations
  creator?: User
  category?: PodcastCategory
  episodes?: PodcastEpisode[]
  latest_episode?: PodcastEpisode
}

export interface PodcastEpisode {
  id: number
  podcast_id: number
  title: string
  description: string
  audio_file: string
  duration: number
  episode_number: number
  season_number: number | null
  is_published: boolean
  published_at: string | null
  play_count: number
  created_at: string
  updated_at: string

  // Relations
  podcast?: Podcast
}

export interface PodcastCategory {
  id: number
  name: string
  name_ar: string
  description: string | null
  is_active: boolean
  podcasts_count: number
  created_at: string
  updated_at: string
}

export interface PodcastFilters {
  search?: string
  creator_id?: number
  category_id?: number
  language?: string
  is_explicit?: boolean
  is_active?: boolean
  is_featured?: boolean
  created_from?: string
  created_to?: string
}
