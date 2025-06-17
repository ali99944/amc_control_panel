// src/types/playlist.ts
import User from './user';
import Song from './song';

export interface PlaylistSong {
  id: number;
  song_id: number;
  song: Song; // Assuming the full song object is needed
  playlist_id: number;
  position: number;
  added_at: string; // ISO date string
}

export interface Playlist {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  is_public: boolean;
  total_songs: number;
  songs: PlaylistSong[]; // Or Song[] if the API returns full song details directly under playlist
  user_id: number;
  user?: User; // Assuming user details might be populated
  created_at: string; // ISO date string
  updated_at?: string | null; // ISO date string
}

// For form data, especially when creating/updating
export interface PlaylistFormData {
  title: string;
  description: string;
  cover_image: File | string | null; // File for new upload, string for existing URL
  is_public: boolean;
  songs_to_add?: { id: number; position: number }[]; // Array of song IDs with their positions
  songs_to_remove?: number[]; // Array of playlist_song IDs or song IDs to remove
}