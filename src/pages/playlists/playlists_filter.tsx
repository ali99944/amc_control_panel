// "use client"
// import { useState } from "react"
// import { Search, Filter, X } from "lucide-react"
// import Button from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import Select from "../../components/ui/select"
// import { useUsers } from "../../hooks/use-users"


// interface PlaylistFilters {
//   search?: string
//   creator_id?: number
//   is_active?: boolean
//   is_featured?: boolean
//   is_public?: boolean
//   creation_year?: number
//   song_count_min?: number
//   song_count_max?: number
// }

// interface PlaylistFiltersProps {
//   filters: PlaylistFilters
//   onFiltersChange: (filters: PlaylistFilters) => void
//   onClearFilters: () => void
// }

// export default function PlaylistFiltersComponent({ filters, onFiltersChange, onClearFilters }: PlaylistFiltersProps) {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const { data: users = [] } = useUsers()

//   const handleFilterChange = (key: keyof PlaylistFilters, value: any) => {
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

//   const privacyOptions = [
//     { label: "الكل", value: "" },
//     { label: "عام", value: "true" },
//     { label: "خاص", value: "false" },
//   ]

//   const currentYear = new Date().getFullYear()
//   const yearOptions = [
//     { label: "جميع السنوات", value: "" },
//     ...Array.from({ length: 10 }, (_, i) => {
//       const year = currentYear - i
//       return { label: year.toString(), value: year.toString() }
//     }),
//   ]

//   const songCountOptions = [
//     { label: "جميع الأعداد", value: "" },
//     { label: "فارغة", value: "0" },
//     { label: "1-10 أغاني", value: "1-10" },
//     { label: "11-50 أغنية", value: "11-50" },
//     { label: "أكثر من 50 أغنية", value: "50+" },
//   ]

//   const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "" && value !== null)

//   return (
//     <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
//       {/* Search and Toggle */}
//       <div className="flex gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             placeholder="البحث في قوائم التشغيل..."
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
//           {/* Creator Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">المنشئ</label>
//             <Select
//               value={filters.creator_id?.toString() || ""}
//               onChange={(value) => handleFilterChange("creator_id", value ? Number.parseInt(value) : undefined)}
//               options={[
//                 { label: "جميع المنشئين", value: "" },
//                 ...users.map((user) => ({
//                   label: user.name,
//                   value: user.id.toString(),
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

//           {/* Privacy Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الخصوصية</label>
//             <Select
//               value={filters.is_public?.toString() || ""}
//               onChange={(value) => handleFilterChange("is_public", value ? value === "true" : undefined)}
//               options={privacyOptions}
//             />
//           </div>

//           {/* Creation Year Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">سنة الإنشاء</label>
//             <Select
//               value={filters.creation_year?.toString() || ""}
//               onChange={(value) => handleFilterChange("creation_year", value ? Number.parseInt(value) : undefined)}
//               options={yearOptions}
//             />
//           </div>

//           {/* Song Count Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">عدد الأغاني</label>
//             <Select
//               value=""
//               onChange={(value) => {
//                 if (value === "0") {
//                   handleFilterChange("song_count_min", 0)
//                   handleFilterChange("song_count_max", 0)
//                 } else if (value === "1-10") {
//                   handleFilterChange("song_count_min", 1)
//                   handleFilterChange("song_count_max", 10)
//                 } else if (value === "11-50") {
//                   handleFilterChange("song_count_min", 11)
//                   handleFilterChange("song_count_max", 50)
//                 } else if (value === "50+") {
//                   handleFilterChange("song_count_min", 50)
//                   handleFilterChange("song_count_max", undefined)
//                 } else {
//                   handleFilterChange("song_count_min", undefined)
//                   handleFilterChange("song_count_max", undefined)
//                 }
//               }}
//               options={songCountOptions}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
