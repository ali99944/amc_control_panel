interface User {
    id: number
    name: string
    email: string
    joined_at: string
    activated_at: string | null
    updated_at: string | null
    last_login_time: string | null
    role: 'basic' | 'premium'
    gender: 'male' | 'female' | 'other'
    birth_date: string
    status: 'active' | 'inactive' | 'banned'


    // songs_liked song_likes[]
    // genre_interests user_genre_interests[]
    // user_artist_interests user_artist_interests[]
    // artists_followed artist_followers[]
    // favorite user_favorites[]

}

export default User