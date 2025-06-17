import Artist from "./artist"

interface Song {
    id: number
    title: string
    artist: Artist | null
    album?: string
    duration: string
    cover?: string
  }

export default Song