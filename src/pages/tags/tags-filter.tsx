// "use client"
// import { useState } from "react"
// import { Search, Filter, X } from "lucide-react"
// import Button from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import Select from "../../components/ui/select"

// interface TagFilters {
//   search?: string
//   category?: string
//   is_active?: boolean
//   usage_count_min?: number
//   usage_count_max?: number
//   creation_year?: number
// }

// interface TagFiltersProps {
//   filters: TagFilters
//   onFiltersChange: (filters: TagFilters) => void
//   onClearFilters: () => void
// }

// export default function TagFiltersComponent({ filters, onFiltersChange, onClearFilters }: TagFiltersProps) {
//   const [isExpanded, setIsExpanded] = useState(false)

//   const handleFilterChange = (key: keyof TagFilters, value: any) => {
//     onFiltersChange({
//       ...filters,
//       [key]: value || undefined,
//     })
//   }

//   const categoryOptions = [
//     { label: "جميع الفئات", value: "" },
//     { label: "موسيقى", value: "music" },
//     { label: "مزاج", value: "mood" },
//     { label: "نشاط", value: "activity" },
//     { label: "وقت", value: "time" },
//     { label: "مناسبة", value: "occasion" },
//     { label: "أخرى", value: "other" },
//   ]

//   const statusOptions = [
//     { label: "جميع الحالات", value: "" },
//     { label: "نشط", value: "true" },
//     { label: "غير نشط", value: "false" },
//   ]

//   const usageCountOptions = [
//     { label: "جميع الاستخدامات", value: "" },
//     { label: "غير مستخدم", value: "0" },
//     { label: "1-10 استخدامات", value: "1-10" },
//     { label: "11-50 استخدام", value: "11-50" },
//     { label: "51-100 استخدام", value: "51-100" },
//     { label: "أكثر من 100 استخدام", value: "100+" },
//   ]

//   const currentYear = new Date().getFullYear()
//   const yearOptions = [
//     { label: "جميع السنوات", value: "" },
//     ...Array.from({ length: 10 }, (_, i) => {
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
//             placeholder="البحث في العلامات..."
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
//           {/* Category Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
//             <Select
//               value={filters.category || ""}
//               onChange={(value) => handleFilterChange("category", value)}
//               options={categoryOptions}
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

//           {/* Usage Count Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">عدد الاستخدامات</label>
//             <Select
//               value=""
//               onChange={(value) => {
//                 if (value === "0") {
//                   handleFilterChange("usage_count_min", 0)
//                   handleFilterChange("usage_count_max", 0)
//                 } else if (value === "1-10") {
//                   handleFilterChange("usage_count_min", 1)
//                   handleFilterChange("usage_count_max", 10)
//                 } else if (value === "11-50") {
//                   handleFilterChange("usage_count_min", 11)
//                   handleFilterChange("usage_count_max", 50)
//                 } else if (value === "51-100") {
//                   handleFilterChange("usage_count_min", 51)
//                   handleFilterChange("usage_count_max", 100)
//                 } else if (value === "100+") {
//                   handleFilterChange("usage_count_min", 100)
//                   handleFilterChange("usage_count_max", undefined)
//                 } else {
//                   handleFilterChange("usage_count_min", undefined)
//                   handleFilterChange("usage_count_max", undefined)
//                 }
//               }}
//               options={usageCountOptions}
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
//         </div>
//       )}
//     </div>
//   )
// }
