// "use client"
// import { useState } from "react"
// import { Search, Filter, X } from "lucide-react"
// import Button from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import Select from "../../components/ui/select"


// interface ManagerFilters {
//   search?: string
//   role?: string
//   is_active?: boolean
//   has_permissions?: boolean
//   last_login_days?: number
//   registration_year?: number
// }

// interface ManagerFiltersProps {
//   filters: ManagerFilters
//   onFiltersChange: (filters: ManagerFilters) => void
//   onClearFilters: () => void
// }

// export default function ManagerFiltersComponent({ filters, onFiltersChange, onClearFilters }: ManagerFiltersProps) {
//   const [isExpanded, setIsExpanded] = useState(false)

//   const handleFilterChange = (key: keyof ManagerFilters, value: any) => {
//     onFiltersChange({
//       ...filters,
//       [key]: value || undefined,
//     })
//   }

//   const roleOptions = [
//     { label: "جميع الأدوار", value: "" },
//     { label: "مدير عام", value: "admin" },
//     { label: "مدير محتوى", value: "content_manager" },
//     { label: "مدير مستخدمين", value: "user_manager" },
//     { label: "مدير تقارير", value: "report_manager" },
//     { label: "مشرف", value: "moderator" },
//     { label: "محرر", value: "editor" },
//   ]

//   const statusOptions = [
//     { label: "جميع الحالات", value: "" },
//     { label: "نشط", value: "true" },
//     { label: "غير نشط", value: "false" },
//   ]

//   const permissionOptions = [
//     { label: "الكل", value: "" },
//     { label: "لديه صلاحيات", value: "true" },
//     { label: "بدون صلاحيات", value: "false" },
//   ]

//   const lastLoginOptions = [
//     { label: "جميع الأوقات", value: "" },
//     { label: "اليوم", value: "1" },
//     { label: "آخر 7 أيام", value: "7" },
//     { label: "آخر 30 يوم", value: "30" },
//     { label: "آخر 90 يوم", value: "90" },
//     { label: "أكثر من 90 يوم", value: "90+" },
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
//             placeholder="البحث في المديرين..."
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
//           {/* Role Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
//             <Select
//               value={filters.role || ""}
//               onChange={(value) => handleFilterChange("role", value)}
//               options={roleOptions}
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

//           {/* Permissions Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">الصلاحيات</label>
//             <Select
//               value={filters.has_permissions?.toString() || ""}
//               onChange={(value) => handleFilterChange("has_permissions", value ? value === "true" : undefined)}
//               options={permissionOptions}
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
