// "use client"

// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"

// import { Music, Disc3, Play, Heart, Download, Calendar, TrendingUp, Users, Star, Edit, Save, X } from "lucide-react"
// import { useArtists } from "../../hooks/use-artists"
// import { Album, useAlbums } from "../../hooks/use-albums"
// import DataTable from "../../components/datatable"
// import { Artist } from "../../types/artist"
// import { Song } from "../../types/song"
// import { MUSIC_MOODS } from "../../constants/music_data"
// import Card from "../../components/ui/card"
// import Button from "../../components/ui/button"

// export default function ArtistProfile() {
//   const { id } = useParams<{ id: string }>()
//   const { data: artists = [], isFetching: artistsLoading } = useArtists()
//   // const { getAlbumsByArtist } = useAlbums()
//   // const { getSongsByArtist } = useSongs()

//   const [artist, setArtist] = useState<Artist | null>(null)
//   const [albums, setAlbums] = useState<Album[]>([])
//   const [songs, setSongs] = useState<Song[]>([])
//   const [isEditingGenres, setIsEditingGenres] = useState(false)
//   const [selectedGenres, setSelectedGenres] = useState<string[]>([])
//   const [selectedMoods, setSelectedMoods] = useState<string[]>([])

//   useEffect(() => {
//     if (id && artists.length > 0) {
//       const foundArtist = artists.find((a) => a.id === Number.parseInt(id))
//       if (foundArtist) {
//         setArtist(foundArtist)
//         setAlbums([])
//         setSongs([])
//         // Initialize with some default genres/moods
//         setSelectedGenres(["Pop", "Rock"])
//         setSelectedMoods(["celebratory", "romantic"])
//       }
//     }
//   }, [id, artists])

//   const handleSaveGenresMoods = () => {
//     // Here you would save the genres and moods to the backend
//     console.log("Saving genres:", selectedGenres)
//     console.log("Saving moods:", selectedMoods)
//     setIsEditingGenres(false)
//   }

//   const albumColumns = [
//     {
//       key: "cover_image",
//       label: "Cover",
//       render: (album: Album) => (
//         <img
//           src={album.cover_image || "/placeholder.svg"}
//           alt={album.title}
//           className="w-12 h-12 rounded-lg object-cover"
//         />
//       ),
//     },
//     { key: "title", label: "Album Title" },
//     { key: "release_date", label: "Release Date" },
//     { key: "total_tracks", label: "Tracks" },
//     { key: "duration", label: "Duration" },
//     { key: "genre", label: "Genre" },
//     {
//       key: "streams_count",
//       label: "Streams",
//       render: (album: Album) => album.streams_count.toLocaleString(),
//     },
//     {
//       key: "is_featured",
//       label: "Featured",
//       render: (album: Album) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             album.is_featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
//           }`}
//         >
//           {album.is_featured ? "Yes" : "No"}
//         </span>
//       ),
//     },
//   ]

//   const songColumns = [
//     {
//       key: "cover_image",
//       label: "Cover",
//       render: (song: Song) => (
//         <img
//           src={song.cover_image || "/placeholder.svg"}
//           alt={song.title}
//           className="w-12 h-12 rounded-lg object-cover"
//         />
//       ),
//     },
//     { key: "title", label: "Song Title" },
//     { key: "album_name", label: "Album" },
//     { key: "duration", label: "Duration" },
//     { key: "genre", label: "Genre" },
//     {
//       key: "streams_count",
//       label: "Streams",
//       render: (song: Song) => song.streams_count.toLocaleString(),
//     },
//     {
//       key: "likes_count",
//       label: "Likes",
//       render: (song: Song) => song.likes_count.toLocaleString(),
//     },
//     {
//       key: "is_featured",
//       label: "Featured",
//       render: (song: Song) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             song.is_featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
//           }`}
//         >
//           {song.is_featured ? "Yes" : "No"}
//         </span>
//       ),
//     },
//   ]

//   if (artistsLoading || !artist) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//       </div>
//     )
//   }

//   const totalStreams = songs.reduce((sum, song) => sum + song.streams_count, 0)
//   const totalLikes = songs.reduce((sum, song) => sum + song.likes_count, 0)
//   const totalDownloads = songs.reduce((sum, song) => sum + song.downloads_count, 0)

//   return (
//     <div className="space-y-6">
//       {/* Artist Header */}
//       <Card className="p-6">
//         <div className="flex items-start gap-6">
//           <img
//             src={artist.image || "/placeholder.svg"}
//             alt={artist.name}
//             className="w-32 h-32 rounded-xl object-cover shadow-lg"
//           />
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-2">
//               <h1 className="text-3xl font-bold text-gray-900">{artist.name}</h1>
//               {artist.is_featured && <Star className="w-6 h-6 text-yellow-500 fill-current" />}
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   artist.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {artist.is_active ? "Active" : "Inactive"}
//               </span>
//             </div>
//             <p className="text-gray-600 mb-4 leading-relaxed">{artist.bio}</p>
//             <div className="flex items-center gap-6 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <Users className="w-4 h-4" />
//                 <span>{artist.followers_count.toLocaleString()} followers</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Disc3 className="w-4 h-4" />
//                 <span>{albums.length} albums</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Music className="w-4 h-4" />
//                 <span>{songs.length} songs</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-4 h-4" />
//                 <span>Joined {new Date(artist.created_at).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Play className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Total Streams</p>
//               <p className="text-xl font-bold text-gray-900">{totalStreams.toLocaleString()}</p>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <Heart className="w-5 h-5 text-red-600" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Total Likes</p>
//               <p className="text-xl font-bold text-gray-900">{totalLikes.toLocaleString()}</p>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <Download className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Total Downloads</p>
//               <p className="text-xl font-bold text-gray-900">{totalDownloads.toLocaleString()}</p>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <TrendingUp className="w-5 h-5 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Avg. Streams/Song</p>
//               <p className="text-xl font-bold text-gray-900">
//                 {songs.length > 0 ? Math.round(totalStreams / songs.length).toLocaleString() : "0"}
//               </p>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Genres and Moods Management */}
//       <Card className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-900">Genres & Moods Management</h2>
//           <div className="flex gap-2">
//             {isEditingGenres ? (
//               <>
//                 <Button onClick={handleSaveGenresMoods} className="bg-green-600 hover:bg-green-700 text-white">
//                   <Save className="w-4 h-4 mr-2" />
//                   Save Changes
//                 </Button>
//                 <Button onClick={() => setIsEditingGenres(false)} variant="outline">
//                   <X className="w-4 h-4 mr-2" />
//                   Cancel
//                 </Button>
//               </>
//             ) : (
//               <Button onClick={() => setIsEditingGenres(true)} variant="outline">
//                 <Edit className="w-4 h-4 mr-2" />
//                 Edit Genres & Moods
//               </Button>
//             )}
//           </div>
//         </div>

//         {isEditingGenres ? (
//           <GenreMoodSelector
//             selectedGenres={selectedGenres}
//             selectedMoods={selectedMoods}
//             onGenresChange={setSelectedGenres}
//             onMoodsChange={setSelectedMoods}
//           />
//         ) : (
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Current Genres:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedGenres.map((genre) => (
//                   <span key={genre} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                     {genre}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Current Moods:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedMoods.map((moodId) => {
//                   const mood = MUSIC_MOODS.find((m: any) => m.id === moodId)
//                   return mood ? (
//                     <span key={moodId} className={`px-3 py-1 rounded-full text-sm ${mood.color}`}>
//                       {mood.name}
//                     </span>
//                   ) : null
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
//       </Card>

//       {/* Albums Section */}
//       <Card className="p-6">
//         <div className="flex items-center gap-3 mb-4">
//           <Disc3 className="w-6 h-6 text-gray-700" />
//           <h2 className="text-xl font-bold text-gray-900">Albums ({albums.length})</h2>
//         </div>
//         <DataTable data={albums} columns={albumColumns} searchKey="title" searchPlaceholder="Search albums..." />
//       </Card>

//       {/* Songs Section */}
//       <Card className="p-6">
//         <div className="flex items-center gap-3 mb-4">
//           <Music className="w-6 h-6 text-gray-700" />
//           <h2 className="text-xl font-bold text-gray-900">Songs ({songs.length})</h2>
//         </div>
//         <DataTable data={songs} columns={songColumns} searchKey="title" searchPlaceholder="Search songs..." />
//       </Card>
//     </div>
//   )
// }
