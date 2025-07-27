// "use client"
// import { useState } from "react"
// import { Search, Filter, X } from "lucide-react"
// import Button from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import Select from "../../components/ui/select"
// import { useAlbums } from "../../hooks/use-albums"
// import { useArtists } from "../../hooks/use-artists"
// import { useGenres } from "../../hooks/use-genres"

// interface SongFilters {
//   search?: string
//   artist_id?: number
//   album_id?: number
//   genre_id?: number
//   is_active?: boolean
//   is_featured?: boolean
//   release_year?: number
//   duration_min?: number
//   duration_max?: number
// }

// interface SongFiltersProps {
//   filters: SongFilters
//   onFiltersChange: (filters: SongFilters) => void
//   onClearFilters: () => void
// }

// export default function SongFiltersComponent({ filters, onFiltersChange, onClearFilters }: SongFiltersProps) {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const { data: artists = [] } = useArtists()
//   const { data: albums = [] } = useAlbums()
//   const { data: genres = [] } = useGenres()

//   const handleFilterChange = (key: keyof SongFilters, value: any) => {
//     onFiltersChange({
//       ...filters,
//       [key]: value || undefined,
//     })
//   }

//   const statusOptions = [
//     { label: "جميع الحالات", value: "" },
//     { label: "نشط", value: "true" },
//     { label: "غير نشط", value: "false" },
//   ]

//   const featuredOptions = [
//     { label: "الكل", value: "" },
//     { label: "مميز", value: "true" },
//     { label: "غير مميز", value: "false" },
//   ]

//   const currentYear = new Date().getFullYear()
//   const yearOptions = [
//     { label: "جميع السنوات", value: "" },
//     ...Array.from({ length: 20 }, (_, i) => {
//       const year = currentYear - i
//       return { label: year.toString(), value: year.toString() }
//     }),
//   ]

//   const durationOptions = [
//     { label: "جميع المدد", value: "" },
//     { label: "أقل من دقيقة", value: "0-60" },
//     { label: "1-3 دقائق", value: "60-180" },
//     { label: "3-5 دقائق", value: "180-300" },
//     { label: "أكثر من 5 دقائق", value: "300+" },
//   ]

//   const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "" && value !== null)

//   return (
//     <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
//       {/* Search and Toggle */}
//       <div className="flex gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             placeholder="البحث في الأغاني..."
//             value={filters.search || ""}
//             onChange={(e) => handleFilterChange("search", e.target.value)}
//             className="pr-10"
//           />
//         </div>
//         <Button variant="secondary" onClick={() => setIsExpanded(!isExpanded)} icon={Filter}>
//           فلاتر متقدمة
//         </Button>
//         {hasActiveFilters && (
//           <Button variant="secondary" onClick={onClearFilters} icon={X}>
//             مسح الفلاتر
//           </Button>
//         )}
//       </div>

//       {/* Advanced Filters */}
//       {isExpanded && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
//           {/* Artist Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الفنان</label>
//             <Select
//               value={filters.artist_id?.toString() || ""}
//               onChange={(value) => handleFilterChange("artist_id", value ? Number.parseInt(value) : undefined)}
//               options={[
//                 { label: "جميع الفنانين", value: "" },
//                 ...artists.map((artist) => ({
//                   label: artist.name,
//                   value: artist.id.toString(),
//                 })),
//               ]}
//             />
//           </div>

//           {/* Album Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الألبوم</label>
//             <Select
//               value={filters.album_id?.toString() || ""}
//               onChange={(value) => handleFilterChange("album_id", value ? Number.parseInt(value) : undefined)}
//               options={[
//                 { label: "جميع الألبومات", value: "" },
//                 ...albums.map((album) => ({
//                   label: album.name,
//                   value: album.id.toString(),
//                 })),
//               ]}
//             />
//           </div>

//           {/* Genre Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
//             <Select
//               value={filters.genre_id?.toString() || ""}
//               onChange={(value) => handleFilterChange("genre_id", value ? Number.parseInt(value) : undefined)}
//               options={[
//                 { label: "جميع الأنواع", value: "" },
//                 ...genres.map((genre) => ({
//                   label: genre.name,
//                   value: genre.id.toString(),
//                 })),
//               ]}
//             />
//           </div>

//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
//             <Select
//               value={filters.is_active?.toString() || ""}
//               onChange={(value) => handleFilterChange("is_active", value ? value === "true" : undefined)}
//               options={statusOptions}
//             />
//           </div>

//           {/* Featured Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الإبراز</label>
//             <Select
//               value={filters.is_featured?.toString() || ""}
//               onChange={(value) => handleFilterChange("is_featured", value ? value === "true" : undefined)}
//               options={featuredOptions}
//             />
//           </div>

//           {/* Release Year Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">سنة الإصدار</label>
//             <Select
//               value={filters.release_year?.toString() || ""}
//               onChange={(value) => handleFilterChange("release_year", value ? Number.parseInt(value) : undefined)}
//               options={yearOptions}
//             />
//           </div>

//           {/* Duration Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">المدة</label>
//             <Select
//               value=""
//               onChange={(value) => {
//                 if (value === "0-60") {
//                   handleFilterChange("duration_min", 0)
//                   handleFilterChange("duration_max", 60)
//                 } else if (value === "60-180") {
//                   handleFilterChange("duration_min", 60)
//                   handleFilterChange("duration_max", 180)
//                 } else if (value === "180-300") {
//                   handleFilterChange("duration_min", 180)
//                   handleFilterChange("duration_max", 300)
//                 } else if (value === "300+") {
//                   handleFilterChange("duration_min", 300)
//                   handleFilterChange("duration_max", undefined)
//                 } else {
//                   handleFilterChange("duration_min", undefined)
//                   handleFilterChange("duration_max", undefined)
//                 }
//               }}
//               options={durationOptions}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
