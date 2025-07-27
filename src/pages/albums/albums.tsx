"use client"
import { useState } from "react"
import { Plus, Music, Calendar, User, Star, Grid, List } from "lucide-react"
import CreateAlbumDialog from "./create-album-dialog"
import UpdateAlbumDialog from "./update-album-dialog"
import DeleteAlbumDialog from "./delete-album-dialog"
import AlbumCard from "./album-card"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useAlbums, useToggleAlbumStatus, useToggleAlbumFeatured } from "../../hooks/use-albums"
import { formatDate } from "../../lib/date"
import { Album } from "../../types/album"
import { Link } from "react-router-dom"

export default function AlbumsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")
  // const [filters, setFilters] = useState<AlbumFilters>({})

  // Fetch albums data
  const { data: albums = [], isLoading, refetch } = useAlbums({})

  // Mutations
  const { mutate: toggleStatus } = useToggleAlbumStatus(() => refetch())
  const { mutate: toggleFeatured } = useToggleAlbumFeatured(() => refetch())

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

  const handleToggleStatus = (album: Album) => {
    toggleStatus({ id: album.id })
  }

  const handleToggleFeatured = (album: Album) => {
    toggleFeatured({ id: album.id })
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
              value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {value ? "نشط" : "غير نشط"}
          </span>
          {row.is_featured && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">مميز</span>
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
          <Button size="sm" variant="secondary" onClick={() => handleEditAlbum(row)}>
            تعديل
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteAlbum(row)}>
            حذف
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
          <Button
            variant={viewMode === "grid" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setViewMode("grid")}
            icon={Grid}
          >
            شبكة
          </Button>
          <Button
            variant={viewMode === "table" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setViewMode("table")}
            icon={List}
          >
            جدول
          </Button>
          <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
            إنشاء ألبوم جديد
          </Button>
        </div>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الألبومات</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">الألبومات النشطة</p>
              <p className="text-lg font-bold text-primary">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">الألبومات المميزة</p>
              <p className="text-lg font-bold text-primary">{stats.featured}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الأغاني</p>
              <p className="text-lg font-bold text-primary">{stats.totalSongs}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      {/* <AlbumFiltersComponent filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} /> */}

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onEdit={handleEditAlbum}
              onDelete={handleDeleteAlbum}
              onToggleStatus={handleToggleStatus}
              onToggleFeatured={handleToggleFeatured}
            />
          ))}
          {albums.length === 0 && !isLoading && (
            <Card className="col-span-full text-center py-12">
              <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد ألبومات</p>
              <div className="flex items-center justify-center">
                <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                    إنشاء ألبوم جديد
                </Button>
              </div>
            </Card>
          )}
        </div>
      ) : (
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
      )}

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
