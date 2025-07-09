"use client"

import { useState } from "react"
import { Plus, Music, Eye, EyeOff, Edit, Trash2, Palette } from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useGenres } from "../../hooks/use-genres"
import { Genre } from "../../types"
import CreateGenreDialog from "./create-genre-dialog"
import DeleteGenreDialog from "./delete-genre-dialog"
import UpdateGenreDialog from "./update-genre-dialog"
import { getStorageFile } from "../../lib/storage"
import { formatDate } from "../../lib/date"


export default function GenresPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)

  // Fetch genres data
  const { data: genres = [], isLoading, refetch } = useGenres()

  // Calculate stats
  const stats = {
    total: genres.length,
    active: genres.filter((g) => g.is_active).length,
    inactive: genres.filter((g) => !g.is_active).length,
    withImages: genres.filter((g) => g.image).length,
  }

  // Handle edit genre
  const handleEditGenre = (genre: Genre) => {
    setSelectedGenre(genre)
    setIsUpdateDialogOpen(true)
  }

  // Handle delete genre
  const handleDeleteGenre = (genre: Genre) => {
    setSelectedGenre(genre)
    setIsDeleteDialogOpen(true)
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // DataTable columns
  const columns: Column<Genre>[] = [
    {
      key: "image",
      title: "الصورة",
      width: "80px",
      render: (value: string) => (
        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
          {value ? (
            <img src={getStorageFile(value) || "/placeholder.svg"} alt="Genre" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      title: "الاسم",
      sortable: true,
      render: (value: string, row: Genre) => (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: row.color }} />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "description",
      title: "الوصف",
      render: (value: string | null) => <span className="text-gray-600">{value || "لا يوجد وصف"}</span>,
    },
    {
      key: "is_active",
      title: "الحالة",
      width: "100px",
      render: (value: boolean) => (
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
      ),
    },
    {
      key: "created_at",
      title: "تاريخ الإنشاء",
      sortable: true,
      render: (value: string) => formatDate(value),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "120px",
      render: (_, row: Genre) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleEditGenre(row)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteGenre(row)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة الأنواع الموسيقية">
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
          إضافة نوع جديد
        </Button>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">إجمالي الأنواع</p>
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">الأنواع النشطة</p>
              <p className="text-2xl font-bold text-primary">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <EyeOff className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">الأنواع غير النشطة</p>
              <p className="text-2xl font-bold text-primary">{stats.inactive}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">مع صور</p>
              <p className="text-2xl font-bold text-primary">{stats.withImages}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Genres Table */}
      <DataTable
        data={genres}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد أنواع موسيقية</p>
            <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              إضافة نوع جديد
            </Button>
          </div>
        }
      />

      {/* Dialogs */}
      <CreateGenreDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <UpdateGenreDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        genre={selectedGenre}
        onSuccess={handleDialogSuccess}
      />

      <DeleteGenreDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        genre={selectedGenre}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
