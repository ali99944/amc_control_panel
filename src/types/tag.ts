export interface Tag {
  id: number;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
  song_tags?: SongTag[];
}

export interface SongTag {
  id: number;
  song_id: number;
  tag_id: string;
}

export interface CreateTagData {
  name: string;
  description?: string;
}

export interface UpdateTagData extends CreateTagData {
  id: string;
}
