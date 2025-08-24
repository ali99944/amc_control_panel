// "use client"

// import { ArtistProfile } from "../types/artist_profile"
// import { useGetQuery, useMutationAction } from "./queries-actions"
// import { useNotifications } from "./use-notification"

// // Hook for fetching artist profile
// export function useArtistProfile(artistId: number) {
//   return useGetQuery<ArtistProfile>({
//     url: `artists/${artistId}/profile`,
//     key: ["artist-profile", artistId],
//   })
// }

// // Hook for updating artist genres
// export function useUpdateArtistGenres(artistId: number, onSuccess?: () => void) {
//   const { notify } = useNotifications()

//   return useMutationAction({
//     method: "put",
//     url: `artists/${artistId}/genres`,
//     onSuccessCallback: () => {
//       notify.success("تم تحديث أنواع الموسيقى بنجاح")
//       onSuccess?.()
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء تحديث أنواع الموسيقى")
//     },
//   })
// }

// // Hook for updating social links
// export function useUpdateSocialLinks(artistId: number, onSuccess?: () => void) {
//   const { notify } = useNotifications()

//   return useMutationAction({
//     method: "put",
//     url: `artists/${artistId}/social-links`,
//     onSuccessCallback: () => {
//       notify.success("تم تحديث الروابط الاجتماعية بنجاح")
//       onSuccess?.()
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء تحديث الروابط الاجتماعية")
//     },
//   })
// }

// // Hook for deleting artist song
// export function useDeleteArtistSong(onSuccess?: () => void) {
//   const { notify } = useNotifications()

//   return useMutationAction({
//     method: "delete",
//     url: "songs",
//     onSuccessCallback: () => {
//       notify.success("تم حذف الأغنية بنجاح")
//       onSuccess?.()
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء حذف الأغنية")
//     },
//   })
// }

// // Hook for deleting artist album
// export function useDeleteArtistAlbum(onSuccess?: () => void) {
//   const { notify } = useNotifications()

//   return useMutationAction({
//     method: "delete",
//     url: "albums",
//     onSuccessCallback: () => {
//       notify.success("تم حذف الألبوم بنجاح")
//       onSuccess?.()
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء حذف الألبوم")
//     },
//   })
// }


"use client"
import { useState, useEffect } from "react"
import { ArtistProfile, UpdateArtistProfileData } from "../types/artist_profile"

// Dummy data for artist profiles
const dummyArtistProfiles: ArtistProfile[] = [
  {
    id: 1,
    name: "محمد عبده",
    image: "/placeholder.svg?height=200&width=200",
    bio: "فنان سعودي كبير، يُلقب بـ'فنان العرب'، له مسيرة فنية طويلة وناجحة امتدت لأكثر من 50 عاماً",
    is_featured: true,
    is_active: true,
    created_at: "2020-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    followers_count: 2500000,
    songs_count: 150,
    albums_count: 25,
    social_links: {
      instagram: "https://instagram.com/mohammedabdu",
      twitter: "https://twitter.com/mohammedabdu",
      youtube: "https://youtube.com/mohammedabdu",
      spotify: "https://spotify.com/artist/mohammedabdu"
    },
    genres: ["طرب", "خليجي", "كلاسيكي"],
    moods: ["رومانسي", "حزين", "فرح"],
    verification_status: "verified",
    total_streams: 150000000,
    monthly_listeners: 5200000,
    top_countries: [
      { country: "السعودية", listeners: 2100000, percentage: 40 },
      { country: "الإمارات", listeners: 1050000, percentage: 20 },
      { country: "الكويت", listeners: 520000, percentage: 10 },
      { country: "قطر", listeners: 260000, percentage: 5 },
      { country: "البحرين", listeners: 130000, percentage: 2.5 }
    ],
    discography: {
      albums: [
        {
          id: 1,
          title: "أجمل الأغاني",
          release_date: "2023-06-15",
          tracks_count: 12,
          total_streams: 25000000,
          cover_image: "/placeholder.svg?height=300&width=300"
        },
        {
          id: 2,
          title: "من القلب",
          release_date: "2022-12-01",
          tracks_count: 10,
          total_streams: 18000000,
          cover_image: "/placeholder.svg?height=300&width=300"
        }
      ],
      singles: [
        {
          id: 1,
          title: "يا مسافر",
          release_date: "2024-01-10",
          streams: 8500000,
          cover_image: "/placeholder.svg?height=300&width=300"
        },
        {
          id: 2,
          title: "حبيبي",
          release_date: "2023-11-20",
          streams: 6200000,
          cover_image: "/placeholder.svg?height=300&width=300"
        }
      ]
    },
    analytics: {
      streams_per_track: [
        { track_name: "يا مسافر", streams: 8500000, growth: 15.2 },
        { track_name: "حبيبي", streams: 6200000, growth: 8.7 },
        { track_name: "أجمل الليالي", streams: 5800000, growth: -2.1 },
        { track_name: "من القلب", streams: 4900000, growth: 12.5 }
      ],
      follower_growth: [
        { date: "2024-01-01", followers: 2300000 },
        { date: "2024-02-01", followers: 2350000 },
        { date: "2024-03-01", followers: 2400000 },
        { date: "2024-04-01", followers: 2450000 },
        { date: "2024-05-01", followers: 2500000 }
      ],
      monthly_streams: [
        { month: "يناير", streams: 12000000 },
        { month: "فبراير", streams: 14500000 },
        { month: "مارس", streams: 16200000 },
        { month: "أبريل", streams: 15800000 },
        { month: "مايو", streams: 18300000 }
      ]
    },
    similar_artists: [
      {
        id: 2,
        name: "راشد الماجد",
        image: "/placeholder.svg?height=100&width=100",
        similarity_score: 85
      },
      {
        id: 3,
        name: "عبد المجيد عبد الله",
        image: "/placeholder.svg?height=100&width=100",
        similarity_score: 78
      }
    ]
  },
  {
    id: 2,
    name: "أم كلثوم",
    image: "/placeholder.svg?height=200&width=200",
    bio: "كوكب الشرق، أعظم مطربة في تاريخ الموسيقى العربية، صوت مصر الخالد",
    is_featured: true,
    is_active: true,
    created_at: "2020-02-20T00:00:00Z",
    updated_at: "2024-02-20T00:00:00Z",
    followers_count: 3200000,
    songs_count: 80,
    albums_count: 15,
    social_links: {
      youtube: "https://youtube.com/ummkulthum",
      spotify: "https://spotify.com/artist/ummkulthum"
    },
    genres: ["طرب", "كلاسيكي", "مصري"],
    moods: ["رومانسي", "حزين", "روحاني"],
    verification_status: "verified",
    total_streams: 200000000,
    monthly_listeners: 6800000,
    top_countries: [
      { country: "مصر", listeners: 2720000, percentage: 40 },
      { country: "السعودية", listeners: 1360000, percentage: 20 },
      { country: "الإمارات", listeners: 680000, percentage: 10 },
      { country: "الأردن", listeners: 408000, percentage: 6 },
      { country: "لبنان", listeners: 340000, percentage: 5 }
    ],
    discography: {
      albums: [
        {
          id: 3,
          title: "الأطلال",
          release_date: "1966-01-01",
          tracks_count: 8,
          total_streams: 45000000,
          cover_image: "/placeholder.svg?height=300&width=300"
        }
      ],
      singles: [
        {
          id: 3,
          title: "إنت عمري",
          release_date: "1964-01-01",
          streams: 35000000,
          cover_image: "/placeholder.svg?height=300&width=300"
        }
      ]
    },
    analytics: {
      streams_per_track: [
        { track_name: "إنت عمري", streams: 35000000, growth: 5.2 },
        { track_name: "الأطلال", streams: 28000000, growth: 3.1 },
        { track_name: "أمل حياتي", streams: 22000000, growth: 7.8 }
      ],
      follower_growth: [
        { date: "2024-01-01", followers: 3000000 },
        { date: "2024-02-01", followers: 3050000 },
        { date: "2024-03-01", followers: 3100000 },
        { date: "2024-04-01", followers: 3150000 },
        { date: "2024-05-01", followers: 3200000 }
      ],
      monthly_streams: [
        { month: "يناير", streams: 15000000 },
        { month: "فبراير", streams: 16500000 },
        { month: "مارس", streams: 18200000 },
        { month: "أبريل", streams: 17800000 },
        { month: "مايو", streams: 19300000 }
      ]
    },
    similar_artists: [
      {
        id: 4,
        name: "فيروز",
        image: "/placeholder.svg?height=100&width=100",
        similarity_score: 82
      }
    ]
  }
]

// Hook for fetching all artist profiles
export function useArtistProfiles() {
  const [data, setData] = useState<ArtistProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(dummyArtistProfiles)
      setIsLoading(false)
    }, 1000)
  }, [])

  const refetch = () => {
    setIsLoading(true)
    setTimeout(() => {
      setData(dummyArtistProfiles)
      setIsLoading(false)
    }, 500)
  }

  return { data, isLoading, refetch }
}

// Hook for fetching single artist profile
export function useArtistProfile(id: number) {
  const [data, setData] = useState<ArtistProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const artist = dummyArtistProfiles.find(a => a.id === id)
      setData(artist || null)
      setIsLoading(false)
    }, 800)
  }, [id])

  const refetch = () => {
    setIsLoading(true)
    setTimeout(() => {
      const artist = dummyArtistProfiles.find(a => a.id === id)
      setData(artist || null)
      setIsLoading(false)
    }, 500)
  }

  return { data, isLoading, refetch }
}

// Hook for updating artist profile
export function useUpdateArtistProfile(onSuccess?: () => void) {
  const [isPending, setIsPending] = useState(false)

  const mutate = (data: UpdateArtistProfileData) => {
    setIsPending(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Updating artist profile:", data)
      setIsPending(false)
      onSuccess?.()
    }, 1500)
  }

  return { mutate, isPending }
}

// Hook for getting available genres
export function useGenres() {
  const genres = [
    "طرب", "خليجي", "كلاسيكي", "مصري", "لبناني", "سوري", 
    "عراقي", "مغربي", "تونسي", "جزائري", "شعبي", "راب عربي"
  ]
  
  return { data: genres, isLoading: false }
}

// Hook for getting available moods
export function useMoods() {
  const moods = [
    "رومانسي", "حزين", "فرح", "حماسي", "هادئ", "روحاني", 
    "راقص", "نوستالجي", "عاطفي", "قوي", "مريح", "احتفالي"
  ]
  
  return { data: moods, isLoading: false }
}
