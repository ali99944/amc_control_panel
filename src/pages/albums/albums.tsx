"use client"
import { useState } from "react"
import { Plus, Music, Calendar, User, Star, Edit, Trash } from "lucide-react"
import CreateAlbumDialog from "./create-album-dialog"
import UpdateAlbumDialog from "./update-album-dialog"
import DeleteAlbumDialog from "./delete-album-dialog"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Toolbar from "../../components/ui/toolbar"
import { useAlbums } from "../../hooks/use-albums"
import { formatDate } from "../../lib/date"
import { Album } from "../../types/album"
import { Link } from "react-router-dom"
import StatisticCard from "../../components/ui-components/statistic-card"

export default function AlbumsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  // const [filters, setFilters] = useState<AlbumFilters>({})

  // Fetch albums data
  const { data: albums = [], isLoading, refetch } = useAlbums({})

  // Calculate stats
  const stats = {
    total: albums.length,
    active: albums.filter((album) => album.is_active).length,
    featured: albums.filter((album) => album.is_featured).length,
    totalSongs: albums.reduce((acc, album) => acc + album.songs_count, 0),
  }

  // Handle actions
  const handleEditAlbum = (album: Album) => {
    setSelectedAlbum(album)
    setIsUpdateDialogOpen(true)
  }

  const handleDeleteAlbum = (album: Album) => {
    setSelectedAlbum(album)
    setIsDeleteDialogOpen(true)
  }

  const handleDialogSuccess = () => {
    refetch()
  }

  // const handleClearFilters = () => {
  //   setFilters({})
  // }

  // Get album type label
  const getAlbumTypeLabel = (type: Album["album_type"]) => {
    switch (type) {
      case "Single":
        return "أغنية منفردة"
      case "EP":
        return "EP"
      case "Album":
        return "ألبوم"
      case "Compilation":
        return "مجموعة"
      default:
        return type
    }
  }

  // DataTable columns
  const columns: Column<Album>[] = [
    {
      key: "name",
      title: "الألبوم",
      sortable: true,
      render: (value: string, row: Album) => (
        <Link to={`/albums/${row.id}`}>
            <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {row.image ? (
              <img src={row.image || "/placeholder.svg"} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 flex items-center gap-2">
              {value}
              {row.is_featured && <Star className="w-4 h-4 text-yellow-500" />}
            </div>
            <div className="text-sm text-gray-500">{getAlbumTypeLabel(row.album_type)}</div>
          </div>
        </div>
        </Link>
      ),
    },
    {
      key: "artist.name",
      title: "الفنان",
      sortable: true,
      render: (_, row: Album) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span>{row.artist?.name || "فنان غير معروف"}</span>
        </div>
      ),
    },
    {
      key: "songs_count",
      title: "عدد الأغاني",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-gray-400" />
          <span>{value} أغنية</span>
        </div>
      ),
    },
    {
      key: "release_date",
      title: "تاريخ الإصدار",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{formatDate(value)}</span>
        </div>
      ),
    },
    {
      key: "is_active",
      title: "الحالة",
      render: (value: boolean, row: Album) => (
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value ? "bg-primary/20 text-primary" : "bg-red-100 text-red-800"
            }`}
          >
            {value ? "نشط" : "غير نشط"}
          </span>
          {row.is_featured && (
            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">مميز</span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "200px",
      render: (_, row: Album) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleEditAlbum(row)} className="!px-2" icon={Edit}>
            
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteAlbum(row)} className="!px-2" icon={Trash}>
            
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة الألبومات">
        <div className="flex items-center gap-2">

          <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
            إنشاء ألبوم جديد
          </Button>
        </div>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          stat={{
            icon: Music,
            name: "إجمالي الألبومات",
            value: stats.total,
          }}
        />
        <StatisticCard
          stat={{
            icon: Music,
            name: "الألبومات النشطة",
            value: stats.active,
          }}
        />
        <StatisticCard
          stat={{
            icon: Star,
            name: "الألبومات المميزة",
            value: stats.featured,
          }}
        />
        <StatisticCard
          stat={{
            icon: Music,
            name: "إجمالي الأغاني",
            value: stats.totalSongs,
          }}
        />
      </div>

      {/* Filters */}
      {/* <AlbumFiltersComponent filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} /> */}

      <DataTable
          data={albums}
          columns={columns}
          loading={isLoading}
          searchable={false}
          exportable
          emptyState={
            <div className="text-center py-8">
              <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد ألبومات</p>
              <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                إنشاء ألبوم جديد
              </Button>
            </div>
          }
        />

      {/* Dialogs */}
      <CreateAlbumDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <UpdateAlbumDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        album={selectedAlbum}
        onSuccess={handleDialogSuccess}
      />

      <DeleteAlbumDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        album={selectedAlbum}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
