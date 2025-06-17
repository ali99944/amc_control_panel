/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  ListMusic,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Play,
  Heart,
  Download,
  Users,
  Clock,
  Calendar,
  Eye,
  Lock,
  Globe,
  Music,
  User,
} from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Modal from "../../components/ui/modal"
import PlaylistBuilder from "../../components/ui/playlist-builder"
import Song from "../../types/song"

interface Playlist {
  id: string
  name: string
  description: string
  creator: string
  creatorId: string
  songsCount: number
  followers: number
  totalDuration: string
  isPublic: boolean
  createdDate: string
  lastUpdated: string
  plays: number
  likes: number
  category: string
  cover?: string
  songs?: any[]
}

const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "أفضل الأغاني العربية",
    description: "مجموعة من أجمل الأغاني العربية الكلاسيكية",
    creator: "علي طارق",
    creatorId: "admin1",
    songsCount: 45,
    followers: 1250,
    totalDuration: "3:24:15",
    isPublic: true,
    createdDate: "2024-01-15",
    lastUpdated: "2024-01-20",
    plays: 15420,
    likes: 892,
    category: "طرب",
    songs: [],
  },
  {
    id: "2",
    name: "موسيقى للعمل",
    description: "أغاني هادئة ومحفزة للتركيز أثناء العمل",
    creator: "سارة أحمد",
    creatorId: "user123",
    songsCount: 32,
    followers: 890,
    totalDuration: "2:15:30",
    isPublic: true,
    createdDate: "2024-01-12",
    lastUpdated: "2024-01-18",
    plays: 9876,
    likes: 543,
    category: "إنتاجية",
    songs: [],
  },
  {
    id: "3",
    name: "أغاني الذكريات",
    description: "أغاني تحمل ذكريات جميلة من الماضي",
    creator: "محمد علي",
    creatorId: "user456",
    songsCount: 28,
    followers: 567,
    totalDuration: "2:45:20",
    isPublic: false,
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-15",
    plays: 6543,
    likes: 321,
    category: "نوستالجيا",
    songs: [],
  },
  {
    id: "4",
    name: "أحدث الأغاني",
    description: "آخر الإصدارات الموسيقية الجديدة",
    creator: "أحمد محمد",
    creatorId: "user789",
    songsCount: 52,
    followers: 2340,
    totalDuration: "4:12:45",
    isPublic: true,
    createdDate: "2024-01-08",
    lastUpdated: "2024-01-19",
    plays: 23450,
    likes: 1456,
    category: "حديث",
    songs: [],
  },
  {
    id: "5",
    name: "موسيقى كلاسيكية",
    description: "تشكيلة من أجمل القطع الموسيقية الكلاسيكية",
    creator: "فاطمة حسن",
    creatorId: "user101",
    songsCount: 38,
    followers: 678,
    totalDuration: "3:56:12",
    isPublic: true,
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-17",
    plays: 8765,
    likes: 432,
    category: "كلاسيكي",
    songs: [],
  },
]

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterVisibility, setFilterVisibility] = useState<string>("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

  const getVisibilityIcon = (isPublic: boolean) => {
    return isPublic ? <Globe size={16} className="text-primary" /> : <Lock size={16} className="text-gray-400" />
  }

  const getVisibilityBadge = (isPublic: boolean) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isPublic ? "bg-primary/20 text-primary" : "bg-gray-600/20 text-gray-400"
        }`}
      >
        {isPublic ? "عامة" : "خاصة"}
      </span>
    )
  }

  const handleCreatePlaylist = (data: any) => {
    const newPlaylist: Playlist = {
      id: (playlists.length + 1).toString(),
      name: data.name,
      description: data.description,
      creator: "المدير الحالي",
      creatorId: "current-admin",
      songsCount: data.songs?.length || 0,
      followers: 0,
      totalDuration: "0:00:00",
      isPublic: data.isPublic,
      createdDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      plays: 0,
      likes: 0,
      category: data.category,
      songs: data.songs || [],
    }
    setPlaylists([...playlists, newPlaylist])
    setShowCreateModal(false)
  }

  const handleEditPlaylist = (data: any) => {
    if (!selectedPlaylist) return

    const updatedPlaylist: Playlist = {
      ...selectedPlaylist,
      name: data.name,
      description: data.description,
      category: data.category,
      isPublic: data.isPublic,
      songsCount: data.songs?.length || selectedPlaylist.songsCount,
      songs: data.songs || selectedPlaylist.songs,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setPlaylists(playlists.map((p) => (p.id === selectedPlaylist.id ? updatedPlaylist : p)))
    setShowEditModal(false)
    setSelectedPlaylist(null)
  }

  const handleDeletePlaylist = () => {
    if (!selectedPlaylist) return

    setPlaylists(playlists.filter((p) => p.id !== selectedPlaylist.id))
    setShowDeleteModal(false)
    setSelectedPlaylist(null)
  }

  const columns: Column<Playlist>[] = [
    {
      key: "name",
      title: "قائمة التشغيل",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center ml-3">
            <ListMusic size={20} className="text-black" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium text-black">{value}</span>
              <span className="mr-2">{getVisibilityIcon(row.isPublic)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <User size={14} className="ml-1" />
              {row.creator}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      title: "الفئة",
      sortable: true,
      render: (value) => <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{value}</span>,
    },
    {
      key: "songsCount",
      title: "عدد الأغاني",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Music size={16} className="text-primary ml-1" />
          <span className="text-black">{value}</span>
        </div>
      ),
    },
    {
      key: "followers",
      title: "المتابعون",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Users size={16} className="text-blue-400 ml-1" />
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "totalDuration",
      title: "المدة الإجمالية",
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-gray-800" />
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
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "likes",
      title: "الإعجابات",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Heart size={16} className="text-red-400 ml-1" />
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "isPublic",
      title: "الرؤية",
      sortable: true,
      render: (value) => getVisibilityBadge(value),
    },
    {
      key: "lastUpdated",
      title: "آخر تحديث",
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-800" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_, row) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button className="p-2 text-black hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
            <Play size={16} />
          </button>
          <button className="p-2 text-black hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye size={16} />
          </button>
          <button
            onClick={() => {
              setSelectedPlaylist(row)
              setShowEditModal(true)
            }}
            className="p-2 text-black hover:text-yellow-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              setSelectedPlaylist(row)
              setShowDeleteModal(true)
            }}
            className="p-2 text-black hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <button className="p-2 text-black hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ]

  const filteredPlaylists = playlists.filter((playlist) => {
    const matchesSearch =
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || playlist.category === filterCategory
    const matchesVisibility =
      filterVisibility === "all" ||
      (filterVisibility === "public" && playlist.isPublic) ||
      (filterVisibility === "private" && !playlist.isPublic)
    return matchesSearch && matchesCategory && matchesVisibility
  })

  const stats = [
    {
      label: "إجمالي قوائم التشغيل",
      value: playlists.length.toLocaleString(),
      icon: ListMusic,
      color: "text-primary",
    },
    {
      label: "القوائم العامة",
      value: playlists.filter((p) => p.isPublic).length.toLocaleString(),
      icon: Globe,
      color: "text-primary",
    },
    {
      label: "القوائم الخاصة",
      value: playlists.filter((p) => !p.isPublic).length.toLocaleString(),
      icon: Lock,
      color: "text-gray-400",
    },
    {
      label: "إجمالي المتابعين",
      value: playlists.reduce((acc, playlist) => acc + playlist.followers, 0).toLocaleString(),
      icon: Users,
      color: "text-blue-400",
    },
  ]

  const categories = [...new Set(playlists.map((playlist) => playlist.category))]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#1ed760] rounded-xl p-4 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة قوائم التشغيل</h1>
            <p className="text-black/80">إدارة وتنظيم قوائم التشغيل في مركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-black/20 text-black rounded-lg hover:bg-black/30 transition-colors"
          >
            <Plus size={20} className="ml-2" />
            إنشاء قائمة تشغيل جديدة
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
                placeholder="البحث في قوائم التشغيل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black/80 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
            >
              <option value="all">جميع الفئات</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={filterVisibility}
              onChange={(e) => setFilterVisibility(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
            >
              <option value="all">جميع القوائم</option>
              <option value="public">عامة</option>
              <option value="private">خاصة</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-[#1ed760] transition-colors">
              <Download size={16} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Playlists Table */}
      <DataTable
        data={filteredPlaylists}
        columns={columns}
        pageSize={10}
        className="bg-white border-gray-200"
        emptyState={
          <div className="p-8 text-center">
            <ListMusic size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">لا توجد قوائم تشغيل</h3>
            <p className="text-gray-400">لم يتم العثور على قوائم تشغيل مطابقة لمعايير البحث</p>
          </div>
        }
      />

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="إنشاء قائمة تشغيل جديدة"
        size="lg"
      >
        <PlaylistForm onSubmit={handleCreatePlaylist} onCancel={() => setShowCreateModal(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="تعديل قائمة التشغيل" size="lg">
        <PlaylistForm
          playlist={selectedPlaylist}
          onSubmit={handleEditPlaylist}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="حذف قائمة التشغيل">
        <div className="space-y-4">
          <p className="text-gray-600">
            هل أنت متأكد من حذف قائمة التشغيل "{selectedPlaylist?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleDeletePlaylist}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              حذف
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function PlaylistForm({
  playlist,
  onSubmit,
  onCancel,
}: {
  playlist?: Playlist | null
  onSubmit: (data: unknown) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: playlist?.name || "",
    description: playlist?.description || "",
    category: playlist?.category || "",
    isPublic: playlist?.isPublic || true,
  })
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(playlist?.songs || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, songs: playlistSongs })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">اسم قائمة التشغيل</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPublic"
          checked={formData.isPublic}
          onChange={() => setFormData({ ...formData })}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="isPublic" className="text-sm text-gray-700">
          قائمة تشغيل عامة
        </label>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">الأغاني</h4>
        <PlaylistBuilder onPlaylistChange={setPlaylistSongs} initialSongs={playlistSongs} />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
        >
          {playlist ? "تحديث قائمة التشغيل" : "إنشاء قائمة التشغيل"}
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
