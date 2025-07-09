interface AppSettings {
  // Application Settings
  app: {
    name: string
    description: string
    url: string
    logo: string
    maintenance_mode: boolean
    max_users: number
    support_email: string
    default_language: string
  }
  // Audio & Streaming Settings
  audio: {
    default_quality: "128kbps" | "320kbps" | "lossless"
    max_upload_size_mb: number
    allowed_formats: string[]
    enable_crossfade: boolean
    crossfade_duration: number
    buffer_size_mb: number
    max_concurrent_streams: number
    enable_offline_downloads: boolean
  }
  // User & Social Settings
  social: {
    enable_user_profiles: boolean
    enable_playlists_sharing: boolean
    enable_social_features: boolean
    enable_comments: boolean
    enable_following: boolean
    max_playlist_size: number
    max_playlists_per_user: number
  }
  // Security & Privacy Settings
  security: {
    require_email_verification: boolean
    enable_two_factor: boolean
    session_timeout_hours: number
    max_login_attempts: number
    enable_content_filtering: boolean
    enable_explicit_content: boolean
    data_retention_days: number
  }
}

export default AppSettings