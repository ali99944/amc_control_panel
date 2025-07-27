"use client"

import { useState } from "react"
import { Plus, Mic, Star, Eye, EyeOff, Edit, Trash2, Music, Album, Heart } from "lucide-react"
import { useArtists } from "../../hooks/use-artists"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import CreateArtistDialog from "./create-artist-dialog"
import DeleteArtistDialog from "./delete-artist-dialog"
import UpdateArtistDialog from "./update-artist-dialog"
import { formatDate } from "../../lib/date"
import { Artist } from "../../types/artist"
import Tooltip from "../../components/ui/tooltip"
// import ArtistFiltersComponent from "./artists-filter"


export default function ArtistsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)

  // Fetch artists data
  const { data: artists = [], isLoading, refetch } = useArtists()

  // Calculate stats
  const stats = {
    total: artists.length,
    featured: artists.filter((a) => a.is_featured).length,
    active: artists.filter((a) => a.is_active).length,
    inactive: artists.filter((a) => !a.is_active).length,
    followers_count: artists.reduce((acc, artist) => acc + artist.followers_count, 0),
    withSongs: artists.filter((a) => (a.songs_count || 0) > 0).length,
    withAlbums: artists.filter((a) => (a.albums_count || 0) > 0).length,
  }

  // Handle edit artist
  const handleEditArtist = (artist: Artist) => {
    setSelectedArtist(artist)
    setIsUpdateDialogOpen(true)
  }

  // Handle delete artist
  const handleDeleteArtist = (artist: Artist) => {
    setSelectedArtist(artist)
    setIsDeleteDialogOpen(true)
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // Format numbers helper
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num?.toString()
  }

  // DataTable columns
  const columns: Column<Artist>[] = [
    {
      key: "image",
      title: "الصورة",
      width: "80px",
      render: (value: string) => (
        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
          {value ? (
            <img src={value || "/placeholder.svg"} alt="Artist" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      title: "الفنان",
      sortable: true,
      render: (value: string, row: Artist) => (
        <div className="flex items-center gap-2">
          <div>
            <div className="font-medium text-gray-900 flex items-center gap-2">
              {value}
              {row.is_featured && <Tooltip content="فنان مميز">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </Tooltip>}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {formatNumber(row.followers_count)} متابع
              </span>
              {(row.songs_count || 0) > 0 && (
                <span className="flex items-center gap-1">
                  <Music className="w-3 h-3" />
                  {row.songs_count} أغنية
                </span>
              )}
              {(row.albums_count || 0) > 0 && (
                <span className="flex items-center gap-1">
                  <Album className="w-3 h-3" />
                  {row.albums_count} ألبوم
                </span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "bio",
      title: "السيرة الذاتية",
      render: (value: string) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 line-clamp-2">{value || "لا توجد سيرة ذاتية"}</p>
        </div>
      ),
    },
    {
      key: "is_active",
      title: "الحالة",
      width: "100px",
      render: (value: boolean) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {value ? (
              <>
                <Eye className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm">نشط</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">غير نشط</span>
              </>
            )}
          </div>

        </div>
      ),
    },
    {
      key: "created_at",
      title: "تاريخ الإضافة",
      sortable: true,
      render: (value: string) => formatDate(value),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "120px",
      render: (_, row: Artist) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleEditArtist(row)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteArtist(row)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة الفنانين">
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
          إضافة فنان جديد
        </Button>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الفنانين</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">الفنانين المميزين</p>
              <p className="text-lg font-bold text-primary">{stats.featured}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">النشطين</p>
              <p className="text-lg font-bold text-primary">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">غير النشطين</p>
              <p className="text-lg font-bold text-primary">{stats.inactive}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي المتابعين</p>
              <p className="text-lg font-bold text-primary">{formatNumber(stats.followers_count)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">لديهم أغاني</p>
              <p className="text-lg font-bold text-primary">{stats.withSongs}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Album className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">لديهم ألبومات</p>
              <p className="text-lg font-bold text-primary">{stats.withAlbums}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* <ArtistFiltersComponent 
        filters={{}}
        onClearFilters={() => {}}
        onFiltersChange={() => {}}
      /> */}

      {/* Artists Table */}
      <DataTable
        data={artists}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا يوجد فنانين</p>
            <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              إضافة فنان جديد
            </Button>
          </div>
        }
      />

      {/* Dialogs */}
      <CreateArtistDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <UpdateArtistDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        artist={selectedArtist}
        onSuccess={handleDialogSuccess}
      />

      <DeleteArtistDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        artist={selectedArtist}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
