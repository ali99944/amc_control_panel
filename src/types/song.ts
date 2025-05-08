import Artist from "./artist"
import Genre from "./genre"

interface Song {
    id: number
    title: string
    audio_src: string
    total_likes: number
    total_plays: number
    release_date: string
    cover_image: string
    lyrics: string
    
    created_at: string
    updated_at: string | null
    
    genre: Genre
    artist: Artist
}

export default Song