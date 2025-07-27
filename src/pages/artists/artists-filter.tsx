// "use client"
// import { useState } from "react"
// import { Search, Filter, X } from "lucide-react"
// import Button from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import Select from "../../components/ui/select"
// import { useGenres } from "../../hooks/use-genres"


// interface ArtistFilters {
//   search?: string
//   genre_id?: number
//   is_active?: boolean
//   is_featured?: boolean
//   is_verified?: boolean
//   country?: string
//   registration_year?: number
// }

// interface ArtistFiltersProps {
//   filters: ArtistFilters
//   onFiltersChange: (filters: ArtistFilters) => void
//   onClearFilters: () => void
// }

// export default function ArtistFiltersComponent({ filters, onFiltersChange, onClearFilters }: ArtistFiltersProps) {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const { data: genres = [] } = useGenres()

//   const handleFilterChange = (key: keyof ArtistFilters, value: any) => {
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

//   const verifiedOptions = [
//     { label: "الكل", value: "" },
//     { label: "موثق", value: "true" },
//     { label: "غير موثق", value: "false" },
//   ]

//   const countryOptions = [
//     { label: "جميع البلدان", value: "" },
//     { label: "السعودية", value: "SA" },
//     { label: "الإمارات", value: "AE" },
//     { label: "الكويت", value: "KW" },
//     { label: "قطر", value: "QA" },
//     { label: "البحرين", value: "BH" },
//     { label: "عمان", value: "OM" },
//     { label: "الأردن", value: "JO" },
//     { label: "لبنان", value: "LB" },
//     { label: "سوريا", value: "SY" },
//     { label: "العراق", value: "IQ" },
//     { label: "مصر", value: "EG" },
//     { label: "المغرب", value: "MA" },
//     { label: "الجزائر", value: "DZ" },
//     { label: "تونس", value: "TN" },
//   ]

//   const currentYear = new Date().getFullYear()
//   const yearOptions = [
//     { label: "جميع السنوات", value: "" },
//     ...Array.from({ length: 15 }, (_, i) => {
//       const year = currentYear - i
//       return { label: year.toString(), value: year.toString() }
//     }),
//   ]

//   const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "" && value !== null)

//   return (
//     <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
//       {/* Search and Toggle */}
//       <div className="flex gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             placeholder="البحث في الفنانين..."
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

//           {/* Verified Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">التوثيق</label>
//             <Select
//               value={filters.is_verified?.toString() || ""}
//               onChange={(value) => handleFilterChange("is_verified", value ? value === "true" : undefined)}
//               options={verifiedOptions}
//             />
//           </div>

//           {/* Country Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">البلد</label>
//             <Select
//               value={filters.country || ""}
//               onChange={(value) => handleFilterChange("country", value)}
//               options={countryOptions}
//             />
//           </div>

//           {/* Registration Year Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">سنة التسجيل</label>
//             <Select
//               value={filters.registration_year?.toString() || ""}
//               onChange={(value) => handleFilterChange("registration_year", value ? Number.parseInt(value) : undefined)}
//               options={yearOptions}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
