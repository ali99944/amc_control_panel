// "use client"

// import * as React from "react"
// import { Search } from "lucide-react"
// import Button from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import Select from "../../components/ui/select";
// import { PodcastStatus } from "../../types/podcast";

// interface PodcastFiltersProps {
//   onFilterChange: (filters: { search?: string; status?: PodcastStatus }) => void
//   onClearFilters: () => void
// }

// export function PodcastFilters({ onFilterChange, onClearFilters }: PodcastFiltersProps) {
//   const [search, setSearch] = React.useState("")
//   const [status, setStatus] = React.useState<PodcastStatus | "all">("all")

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value)
//   }

//   const handleStatusChange = (value: string) => {
//     setStatus(value as PodcastStatus | "all")
//   }

//   const applyFilters = () => {
//     onFilterChange({
//       search: search || undefined,
//       status: status === "all" ? undefined : status,
//     })
//   }

//   const clearFilters = () => {
//     setSearch("")
//     setStatus("all")
//     onClearFilters()
//   }

//   const statusOptions = [
//     { label: "All Statuses", value: "all" },
//     { label: "Draft", value: "draft" },
//     { label: "Published", value: "published" },
//     { label: "Archived", value: "archived" },
//   ]

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 p-4 border-b bg-background">
//       <div className="relative flex-1">
//         <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//         <Input
//           placeholder="Search podcasts by title..."
//           value={search}
//           onChange={handleSearchChange}
//           className="pl-8"
//         />
//       </div>
//       <div className="flex-shrink-0 w-full sm:w-48">
//         <Select options={statusOptions} value={status} onChange={handleStatusChange} placeholder="Filter by status" />
//       </div>
//       <div className="flex gap-2 flex-shrink-0">
//         <Button onClick={applyFilters}>Apply Filters</Button>
//         <Button variant="outline" onClick={clearFilters}>
//           Clear
//         </Button>
//       </div>
//     </div>
//   )
// }
