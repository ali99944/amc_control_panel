"use client"

import type React from "react"

import { useState } from "react"
import { Disc, Plus, Search, Edit, Trash2, Play, Heart, Download, Calendar, Music, User, Eye } from "lucide-react"
import DataTable, { Column } from "../components/datatable"
import AlbumBuilder from "../components/ui/album-builder"
import Dropdown from "../components/ui/dropdown"
import FileUploader from "../components/ui/file-uploader"
import Modal from "../components/ui/modal"
import Select from "../components/ui/select"


interface Album {
  id: string
  title: string
  artistId: string
  artistName: string
  genreId: string
  genreName: string
  releaseDate: string
  songsCount: number
  totalDuration: string
  plays: number
  likes: number
  status: "active" | "pending" | "removed"
  type: "studio" | "live" | "compilation" | "single"
  description?: string
  cover?: string
}

const mockAlbums: Album[] = [
  {
    id: "1",
    title: "ألبوم الذكريات",
    artistId: "artist1",
    artistName: "محمد منير",
    genreId: "genre1",
    genreName: "طرب",
    releaseDate: "2024-01-15",
    songsCount: 12,
    totalDuration: "52:30",
    plays: 45620,
    likes: 2340,
    status: "active",
    type: "studio",
    description: "مجموعة من أجمل الأغاني التراثية",
  },
  {
    id: "2",
    title: "الأصالة",
    artistId: "artist2",
    artistName: "أم كلثوم",
    genreId: "genre2",
    genreName: "كلاسيكي",
    releaseDate: "2023-12-20",
    songsCount: 8,
    totalDuration: "48:15",
    plays: 78950,
    likes: 4567,
    status: "active",
    type: "compilation",
    description: "تجميعة من أشهر أغاني أم كلثوم",
  },
  {
    id: "3",
    title: "الصباح",
    artistId: "artist3",
    artistName: "فيروز",
    genreId: "genre3",
    genreName: "فولكلور",
    releaseDate: "2024-01-05",
    songsCount: 10,
    totalDuration: "38:45",
    plays: 32180,
    likes: 1890,
    status: "pending",
    type: "studio",
    description: "ألبوم جديد من فيروز",
  },
]

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>(mockAlbums)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGenre, setFilterGenre] = useState<string>("all")
  const [filterArtist, setFilterArtist] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-primary/20 text-primary",
      pending: "bg-yellow-500/20 text-yellow-600",
      removed: "bg-red-500/20 text-red-600",
    }
    const labels = {
      active: "نشط",
      pending: "في الانتظار",
      removed: "محذوف",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getTypeBadge = (type: string) => {
    const styles = {
      studio: "bg-blue-100 text-blue-600",
      live: "bg-green-100 text-green-600",
      compilation: "bg-purple-100 text-purple-600",
      single: "bg-orange-100 text-orange-600",
    }
    const labels = {
      studio: "استوديو",
      live: "مباشر",
      compilation: "تجميعة",
      single: "أغنية منفردة",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    )
  }

  const handleEdit = (album: Album) => {
    setSelectedAlbum(album)
    setShowEditModal(true)
  }

  const handleDelete = (albumId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الألبوم؟")) {
      setAlbums(albums.filter((a) => a.id !== albumId))
    }
  }

  const columns: Column<Album>[] = [
    {
      key: "title",
      title: "الألبوم",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center ml-3">
            <Disc size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="flex items-center text-sm text-gray-500">
              <User size={14} className="ml-1" />
              {row.artistName}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "genreName",
      title: "النوع",
      sortable: true,
      render: (value) => <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{value}</span>,
    },
    {
      key: "type",
      title: "نوع الألبوم",
      sortable: true,
      render: (value) => getTypeBadge(value),
    },
    {
      key: "songsCount",
      title: "عدد الأغاني",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Music size={16} className="text-primary ml-1" />
          <span className="text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "totalDuration",
      title: "المدة الإجمالية",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-400 ml-1" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "plays",
      title: "مرات التشغيل",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Play size={16} className="text-primary ml-1" />
          <span className="text-gray-900">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "likes",
      title: "الإعجابات",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Heart size={16} className="text-red-500 ml-1" />
          <span className="text-gray-900">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "status",
      title: "الحالة",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "releaseDate",
      title: "تاريخ الإصدار",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-400 ml-1" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_, row) => (
        <Dropdown
          items={[
            {
              label: "تشغيل",
              icon: <Play size={16} />,
              onClick: () => console.log("Play", row.id),
            },
            {
              label: "عرض",
              icon: <Eye size={16} />,
              onClick: () => console.log("View", row.id),
            },
            {
              label: "تعديل",
              icon: <Edit size={16} />,
              onClick: () => handleEdit(row),
            },
            {
              label: "تحميل",
              icon: <Download size={16} />,
              onClick: () => console.log("Download", row.id),
            },
            {
              label: "حذف",
              icon: <Trash2 size={16} />,
              onClick: () => handleDelete(row.id),
              destructive: true,
            },
          ]}
        />
      ),
    },
  ]

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artistName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = filterGenre === "all" || album.genreId === filterGenre
    const matchesArtist = filterArtist === "all" || album.artistId === filterArtist
    const matchesStatus = filterStatus === "all" || album.status === filterStatus
    const matchesType = filterType === "all" || album.type === filterType
    return matchesSearch && matchesGenre && matchesArtist && matchesStatus && matchesType
  })

  const stats = [
    {
      label: "إجمالي الألبومات",
      value: albums.length.toLocaleString(),
      icon: Disc,
      color: "text-primary",
    },
    {
      label: "الألبومات النشطة",
      value: albums.filter((a) => a.status === "active").length.toLocaleString(),
      icon: Disc,
      color: "text-primary",
    },
    {
      label: "في الانتظار",
      value: albums.filter((a) => a.status === "pending").length.toLocaleString(),
      icon: Calendar,
      color: "text-yellow-500",
    },
    {
      label: "إجمالي التشغيلات",
      value: albums.reduce((acc, album) => acc + album.plays, 0).toLocaleString(),
      icon: Play,
      color: "text-blue-500",
    },
  ]

  const genreOptions = [
    { value: "all", label: "جميع الأنواع" },
    { value: "genre1", label: "طرب" },
    { value: "genre2", label: "كلاسيكي" },
    { value: "genre3", label: "فولكلور" },
  ]

  const artistOptions = [
    { value: "all", label: "جميع الفنانين" },
    { value: "artist1", label: "محمد منير" },
    { value: "artist2", label: "أم كلثوم" },
    { value: "artist3", label: "فيروز" },
  ]

  const statusOptions = [
    { value: "all", label: "جميع الحالات" },
    { value: "active", label: "نشط" },
    { value: "pending", label: "في الانتظار" },
    { value: "removed", label: "محذوف" },
  ]

  const typeOptions = [
    { value: "all", label: "جميع الأنواع" },
    { value: "studio", label: "استوديو" },
    { value: "live", label: "مباشر" },
    { value: "compilation", label: "تجميعة" },
    { value: "single", label: "أغنية منفردة" },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-primary rounded-xl p-4 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الألبومات</h1>
            <p className="text-black/80">إدارة وتنظيم الألبومات في مركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-black/20 text-black rounded-lg hover:bg-black/30 transition-colors"
          >
            <Plus size={20} className="ml-2" />
            إضافة ألبوم جديد
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">{stat.label}</p>
                <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في الألبومات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select options={genreOptions} value={filterGenre} onChange={setFilterGenre} />
            <Select options={artistOptions} value={filterArtist} onChange={setFilterArtist} />
            <Select options={typeOptions} value={filterType} onChange={setFilterType} />
            <Select options={statusOptions} value={filterStatus} onChange={setFilterStatus} />
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
              <Download size={16} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Albums Table */}
      <DataTable
        data={filteredAlbums}
        columns={columns}
        pageSize={10}
        className="bg-white"
        emptyState={
          <div className="p-8 text-center">
            <Disc size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد ألبومات</h3>
            <p className="text-gray-500">لم يتم العثور على ألبومات مطابقة لمعايير البحث</p>
          </div>
        }
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false)
          setShowEditModal(false)
          setSelectedAlbum(null)
        }}
        title={selectedAlbum ? "تعديل الألبوم" : "إضافة ألبوم جديد"}
        size="xl"
      >
        <AlbumForm
          album={selectedAlbum}
          onSubmit={(data) => {
            console.log("Submit album:", data)
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedAlbum(null)
          }}
          onCancel={() => {
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedAlbum(null)
          }}
        />
      </Modal>
    </div>
  )
}

function AlbumForm({
  album,
  onSubmit,
  onCancel,
}: {
  album?: Album | null
  onSubmit: (data: unknown) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: album?.title || "",
    artistId: album?.artistId || "",
    genreId: album?.genreId || "",
    releaseDate: album?.releaseDate || "",
    type: album?.type || "studio",
    status: album?.status || "active",
    description: album?.description || "",
  })
  const [albumSongs, setAlbumSongs] = useState<unknown[]>([])
  const [coverFiles, setCoverFiles] = useState<unknown[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, songs: albumSongs, cover: coverFiles })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الألبوم</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الفنان</label>
          <Select
            options={[
              { value: "artist1", label: "محمد منير" },
              { value: "artist2", label: "أم كلثوم" },
              { value: "artist3", label: "فيروز" },
            ]}
            value={formData.artistId}
            onChange={(value) => setFormData({ ...formData, artistId: value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
          <Select
            options={[
              { value: "genre1", label: "طرب" },
              { value: "genre2", label: "كلاسيكي" },
              { value: "genre3", label: "فولكلور" },
            ]}
            value={formData.genreId}
            onChange={(value) => setFormData({ ...formData, genreId: value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نوع الألبوم</label>
          <Select
            options={[
              { value: "studio", label: "استوديو" },
              { value: "live", label: "مباشر" },
              { value: "compilation", label: "تجميعة" },
              { value: "single", label: "أغنية منفردة" },
            ]}
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value as "studio" | "live" | "compilation" | "single" })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الإصدار</label>
          <input
            type="date"
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
          <Select
            options={[
              { value: "active", label: "نشط" },
              { value: "pending", label: "في الانتظار" },
              { value: "removed", label: "محذوف" },
            ]}
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value as "active" | "pending" | "removed"})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">غلاف الألبوم</label>
        <FileUploader type="image" accept="image/*" multiple={false} maxSize={10} onFilesChange={setCoverFiles} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">مسارات الألبوم</h4>
        <AlbumBuilder onAlbumChange={setAlbumSongs} initialSongs={[]} artistId={formData.artistId} />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
        >
          {album ? "تحديث الألبوم" : "إضافة الألبوم"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </form>
  )
}
