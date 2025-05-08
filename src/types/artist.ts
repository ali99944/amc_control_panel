interface Artist {
    id: number
    name: string
    bio: string
    image: string
    is_featured: boolean

    created_at: string
    updated_at: string | null

    total_followers: number
}

export default Artist