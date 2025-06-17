"use client"

import { useState } from "react"
import { Music, Plus, Search, Edit, Trash2, Play, Heart, Download, Clock, Volume2, Disc, User, Eye } from 'lucide-react'
import DataTable, { Column } from "../../components/datatable"
import Dropdown from "../../components/ui/dropdown"
import Modal from "../../components/ui/modal"
import Select from "../../components/ui/select"

interface Song {
  id: string
  title: string
  artistId: string
  artistName: string
  albumId?: string
  albumName?: string
  genreId: string
  genreName: string
  duration: string
  releaseDate: string
  plays: number
  likes: number
  status: "active" | "pending" | "removed"
  fileSize: string
  quality: "128kbps" | "320kbps" | "lossless"
  uploadDate: string
  cover?: string
  lyrics?: string
  description?: string
}

const mockSongs: Song[] = [
  {
    id: "1",
    title: "أغنية رائعة",
    artistId: "artist1",
    artistName: "محمد منير",
    albumId: "album1",
    albumName: "ألبوم الذكريات",
    genreId: "genre1",
    genreName: "طرب",
    duration: "4:32",
    releaseDate: "2024-01-15",
    plays: 15420,
    likes: 892,
    status: "active",
    fileSize: "8.2 MB",
    quality: "320kbps",
    uploadDate: "2024-01-10",
    description: "أغنية جميلة من التراث العربي",
  },
  {
    id: "2",
    title: "لحن الحياة",
    artistId: "artist2",
    artistName: "أم كلثوم",
    albumId: "album2",
    albumName: "الأصالة",
    genreId: "genre2",
    genreName: "كلاسيكي",
    duration: "6:15",
    releaseDate: "2023-12-20",
    plays: 23150,
    likes: 1456,
    status: "active",
    fileSize: "14.3 MB",
    quality: "lossless",
    uploadDate: "2023-12-18",
    description: "من أجمل أغاني أم كلثوم",
  },
  {
    id: "3",
    title: "موسيقى هادئة",
    artistId: "artist3",
    artistName: "فيروز",
    genreId: "genre3",
    genreName: "فولكلور",
    duration: "3:28",
    releaseDate: "2024-01-05",
    plays: 9876,
    likes: 543,
    status: "pending",
    fileSize: "6.1 MB",
    quality: "320kbps",
    uploadDate: "2024-01-03",
    description: "أغنية هادئة ومريحة",
  },
]

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>(mockSongs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGenre, setFilterGenre] = useState<string>("all")
  const [filterArtist, setFilterArtist] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

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

  const getQualityBadge = (quality: string) => {
    const styles = {
      "128kbps": "bg-gray-100 text-gray-600",
      "320kbps": "bg-blue-100 text-blue-600",
      lossless: "bg-purple-100 text-purple-600",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[quality as keyof typeof styles]}`}>
        {quality}
      </span>
    )
  }

  const handleEdit = (song: Song) => {
    setSelectedSong(song)
    setShowEditModal(true)
  }

  const handleDelete = (songId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الأغنية؟")) {
      setSongs(songs.filter((s) => s.id !== songId))
    }
  }

  const columns: Column<Song>[] = [
    {
      key: "title",
      title: "الأغنية",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center ml-3">
            <Music size={20} className="text-white" />
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
      key: "albumName",
      title: "الألبوم",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Disc size={16} className="text-gray-400 ml-1" />
          <span className="text-gray-700">{value || "بدون ألبوم"}</span>
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
      key: "duration",
      title: "المدة",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Clock size={16} className="text-gray-400 ml-1" />
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
      key: "quality",
      title: "الجودة",
      sortable: true,
      render: (value) => getQualityBadge(value),
    },
    {
      key: "status",
      title: "الحالة",
      sortable: true,
      render: (value) => getStatusBadge(value),
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

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (song.albumName && song.albumName.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesGenre = filterGenre === "all" || song.genreId === filterGenre
    const matchesArtist = filterArtist === "all" || song.artistId === filterArtist
    const matchesStatus = filterStatus === "all" || song.status === filterStatus
    return matchesSearch && matchesGenre && matchesArtist && matchesStatus
  })

  const stats = [
    {
      label: "إجمالي الأغاني",
      value: songs.length.toLocaleString(),
      icon: Music,
      color: "text-primary",
    },
    {
      label: "الأغاني النشطة",
      value: songs.filter((s) => s.status === "active").length.toLocaleString(),
      icon: Volume2,
      color: "text-primary",
    },
    {
      label: "في الانتظار",
      value: songs.filter((s) => s.status === "pending").length.toLocaleString(),
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      label: "إجمالي التشغيلات",
      value: songs.reduce((acc, song) => acc + song.plays, 0).toLocaleString(),
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-primary rounded-xl p-4 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الأغاني</h1>
            <p className="text-black/80">إدارة وتنظيم مكتبة الموسيقى في مركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-black/20 text-black rounded-lg hover:bg-black/30 transition-colors"
          >
            <Plus size={20} className="ml-2" />
            إضافة أغنية جديدة
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
                placeholder="البحث في الأغاني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select options={genreOptions} value={filterGenre} onChange={setFilterGenre} />
            <Select options={artistOptions} value={filterArtist} onChange={setFilterArtist} />
            <Select options={statusOptions} value={filterStatus} onChange={setFilterStatus} />
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
              <Download size={16} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Songs Table */}
      <DataTable
        data={filteredSongs}
        columns={columns}
        pageSize={10}
        className="bg-white"
        emptyState={
          <div className="p-8 text-center">
            <Music size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أغاني</h3>
            <p className="text-gray-500">لم يتم العثور على أغاني مطابقة لمعايير البحث</p>
          </div>
        }
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false)
          setShowEditModal(false)
          setSelectedSong(null)
        }}
        title={selectedSong ? "تعديل الأغنية" : "إضافة أغنية جديدة"}
        size="lg"
      >
        <SongForm
          song={selectedSong}
          onSubmit={(data) => {
            console.log("Submit song:", data)
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedSong(null)
          }}
          onCancel={() => {
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedSong(null)
          }}
        />
      </Modal>
    </div>
  )
}

function SongForm({
  song,
  onSubmit,
  onCancel,
}: {
  song?: Song | null
  onSubmit: (data: unknown) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: song?.title || "",
    artistId: song?.artistId || "",
    albumId: song?.albumId || "",
    genreId: song?.genreId || "",
    duration: song?.duration || "",
    releaseDate: song?.releaseDate || "",
    quality: song?.quality || "320kbps",
    status: song?.status || "active",
    description: song?.description || "",
    lyrics: song?.lyrics || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الأغنية</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">الألبوم (اختياري)</label>
          <Select
            options={[
              { value: "", label: "بدون ألبوم" },
              { value: "album1", label: "ألبوم الذكريات" },
              { value: "album2", label: "الأصالة" },
            ]}
            value={formData.albumId}
            onChange={(value) => setFormData({ ...formData, albumId: value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">المدة</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="4:32"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">الجودة</label>
          <Select
            options={[
              { value: "128kbps", label: "128kbps" },
              { value: "320kbps", label: "320kbps" },
              { value: "lossless", label: "Lossless" },
            ]}
            value={formData.quality}
            onChange={(value) => setFormData({ ...formData, quality: value as "128kbps" | "320kbps" | "lossless" })}
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
            onChange={(value) => setFormData({ ...formData, status: value as "active" | "pending" | "removed" })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">كلمات الأغنية</label>
        <textarea
          value={formData.lyrics}
          onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
          rows={5}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
        >
          {song ? "تحديث الأغنية" : "إضافة الأغنية"}
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
