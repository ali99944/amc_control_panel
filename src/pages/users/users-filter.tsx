// "use client"
// import { useState } from "react"
// import { Search, Filter, X } from "lucide-react"
// import Button from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import Select from "../../components/ui/select"


// interface UserFilters {
//   search?: string
//   is_active?: boolean
//   subscription_type?: string
//   country?: string
//   registration_year?: number
//   last_login_days?: number
//   age_min?: number
//   age_max?: number
// }

// interface UserFiltersProps {
//   filters: UserFilters
//   onFiltersChange: (filters: UserFilters) => void
//   onClearFilters: () => void
// }

// export default function UserFiltersComponent({ filters, onFiltersChange, onClearFilters }: UserFiltersProps) {
//   const [isExpanded, setIsExpanded] = useState(false)

//   const handleFilterChange = (key: keyof UserFilters, value: any) => {
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

//   const subscriptionOptions = [
//     { label: "جميع الاشتراكات", value: "" },
//     { label: "مجاني", value: "free" },
//     { label: "مميز", value: "premium" },
//     { label: "VIP", value: "vip" },
//     { label: "منتهي الصلاحية", value: "expired" },
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

//   const lastLoginOptions = [
//     { label: "جميع الأوقات", value: "" },
//     { label: "اليوم", value: "1" },
//     { label: "آخر 7 أيام", value: "7" },
//     { label: "آخر 30 يوم", value: "30" },
//     { label: "آخر 90 يوم", value: "90" },
//     { label: "أكثر من 90 يوم", value: "90+" },
//   ]

//   const ageRangeOptions = [
//     { label: "جميع الأعمار", value: "" },
//     { label: "أقل من 18", value: "0-17" },
//     { label: "18-25", value: "18-25" },
//     { label: "26-35", value: "26-35" },
//     { label: "36-45", value: "36-45" },
//     { label: "46-55", value: "46-55" },
//     { label: "أكثر من 55", value: "55+" },
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
//             placeholder="البحث في المستخدمين..."
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
//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
//             <Select
//               value={filters.is_active?.toString() || ""}
//               onChange={(value) => handleFilterChange("is_active", value ? value === "true" : undefined)}
//               options={statusOptions}
//             />
//           </div>

//           {/* Subscription Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">نوع الاشتراك</label>
//             <Select
//               value={filters.subscription_type || ""}
//               onChange={(value) => handleFilterChange("subscription_type", value)}
//               options={subscriptionOptions}
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

//           {/* Last Login Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">آخر تسجيل دخول</label>
//             <Select
//               value={filters.last_login_days?.toString() || ""}
//               onChange={(value) => {
//                 if (value === "90+") {
//                   handleFilterChange("last_login_days", 91)
//                 } else {
//                   handleFilterChange("last_login_days", value ? Number.parseInt(value) : undefined)
//                 }
//               }}
//               options={lastLoginOptions}
//             />
//           </div>

//           {/* Age Range Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الفئة العمرية</label>
//             <Select
//               value=""
//               onChange={(value) => {
//                 if (value === "0-17") {
//                   handleFilterChange("age_min", 0)
//                   handleFilterChange("age_max", 17)
//                 } else if (value === "18-25") {
//                   handleFilterChange("age_min", 18)
//                   handleFilterChange("age_max", 25)
//                 } else if (value === "26-35") {
//                   handleFilterChange("age_min", 26)
//                   handleFilterChange("age_max", 35)
//                 } else if (value === "36-45") {
//                   handleFilterChange("age_min", 36)
//                   handleFilterChange("age_max", 45)
//                 } else if (value === "46-55") {
//                   handleFilterChange("age_min", 46)
//                   handleFilterChange("age_max", 55)
//                 } else if (value === "55+") {
//                   handleFilterChange("age_min", 55)
//                   handleFilterChange("age_max", undefined)
//                 } else {
//                   handleFilterChange("age_min", undefined)
//                   handleFilterChange("age_max", undefined)
//                 }
//               }}
//               options={ageRangeOptions}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
