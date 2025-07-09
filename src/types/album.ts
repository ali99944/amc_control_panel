interface Album {
  id: string;
  title: string;
  image: string | null;
  artist_id: string;
  songs_count: number;
  genres_count: number;
  release_date: string;
  is_active: boolean;
  created_at: string;
}

export default Album