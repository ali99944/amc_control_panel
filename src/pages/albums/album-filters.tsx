"use client"
import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Select from "../../components/ui/select"
import { useArtists } from "../../hooks/use-artists"
import { AlbumFilters } from "../../types/album"


interface AlbumFiltersProps {
  filters: AlbumFilters
  onFiltersChange: (filters: AlbumFilters) => void
  onClearFilters: () => void
}

export default function AlbumFiltersComponent({ filters, onFiltersChange, onClearFilters }: AlbumFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { data: artists = [] } = useArtists()

  const handleFilterChange = (key: keyof AlbumFilters, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  const albumTypeOptions = [
    { label: "جميع الأنواع", value: "" },
    { label: "أغنية منفردة", value: "single" },
    { label: "EP", value: "ep" },
    { label: "ألبوم", value: "album" },
    { label: "مجموعة", value: "compilation" },
  ]

  const statusOptions = [
    { label: "جميع الحالات", value: "" },
    { label: "نشط", value: "true" },
    { label: "غير نشط", value: "false" },
  ]

  const featuredOptions = [
    { label: "الكل", value: "" },
    { label: "مميز", value: "true" },
    { label: "غير مميز", value: "false" },
  ]

  const currentYear = new Date().getFullYear()
  const yearOptions = [
    { label: "جميع السنوات", value: "" },
    ...Array.from({ length: 20 }, (_, i) => {
      const year = currentYear - i
      return { label: year.toString(), value: year.toString() }
    }),
  ]

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "" && value !== null)

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      {/* Search and Toggle */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الألبومات..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pr-10"
          />
        </div>
        <Button variant="secondary" onClick={() => setIsExpanded(!isExpanded)} icon={Filter}>
          فلاتر متقدمة
        </Button>
        {hasActiveFilters && (
          <Button variant="secondary" onClick={onClearFilters} icon={X}>
            مسح الفلاتر
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {/* Artist Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الفنان</label>
            <Select
              value={filters.artist_id?.toString() || ""}
              onChange={(value) => handleFilterChange("artist_id", value ? Number.parseInt(value) : undefined)}
              options={[
                { label: "جميع الفنانين", value: "" },
                ...artists.map((artist) => ({
                  label: artist.name,
                  value: artist.id.toString(),
                })),
              ]}
            />
          </div>

          {/* Album Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع الألبوم</label>
            <Select
              value={filters.album_type || ""}
              onChange={(value) => handleFilterChange("album_type", value)}
              options={albumTypeOptions}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <Select
              value={filters.is_active?.toString() || ""}
              onChange={(value) => handleFilterChange("is_active", value ? value === "true" : undefined)}
              options={statusOptions}
            />
          </div>

          {/* Featured Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الإبراز</label>
            <Select
              value={filters.is_featured?.toString() || ""}
              onChange={(value) => handleFilterChange("is_featured", value ? value === "true" : undefined)}
              options={featuredOptions}
            />
          </div>

          {/* Release Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">سنة الإصدار</label>
            <Select
              value={filters.release_year?.toString() || ""}
              onChange={(value) => handleFilterChange("release_year", value ? Number.parseInt(value) : undefined)}
              options={yearOptions}
            />
          </div>
        </div>
      )}
    </div>
  )
}
