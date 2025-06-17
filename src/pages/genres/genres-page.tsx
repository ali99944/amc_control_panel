"use client"

import { useState } from "react"
import { Palette, Plus, Search, MoreHorizontal, Edit, Trash2, Music, Calendar, Eye, Download, Users } from 'lucide-react'
import DataTable, { Column } from "../../components/datatable"
import Modal from "../../components/ui/modal"
import { useMutationAction } from "../../hooks/queries-actions"

interface Genre {
  id: string
  name: string
  nameEn: string
  description: string
  color: string
  songsCount: number
  artistsCount: number
  playlistsCount: number
  totalPlays: number
  createdDate: string
  isActive: boolean
}

const mockGenres: Genre[] = [
  {
    id: "1",
    name: "طرب",
    nameEn: "Tarab",
    description: "الموسيقى العربية الكلاسيكية والطرب الأصيل",
    color: "#FF6B6B",
    songsCount: 1250,
    artistsCount: 45,
    playlistsCount: 89,
    totalPlays: 2500000,
    createdDate: "2024-01-15",
    isActive: true,
  },
  {
    id: "2",
    name: "بوب عربي",
    nameEn: "Arabic Pop",
    description: "الأغاني العربية العصرية والبوب",
    color: "#4ECDC4",
    songsCount: 890,
    artistsCount: 67,
    playlistsCount: 156,
    totalPlays: 3200000,
    createdDate: "2024-01-12",
    isActive: true,
  },
  {
    id: "3",
    name: "راب عربي",
    nameEn: "Arabic Rap",
    description: "موسيقى الراب والهيب هوب العربية",
    color: "#45B7D1",
    songsCount: 567,
    artistsCount: 34,
    playlistsCount: 78,
    totalPlays: 1800000,
    createdDate: "2024-01-10",
    isActive: true,
  },
  {
    id: "4",
    name: "موسيقى كلاسيكية",
    nameEn: "Classical",
    description: "الموسيقى الكلاسيكية العالمية",
    color: "#96CEB4",
    songsCount: 234,
    artistsCount: 12,
    playlistsCount: 23,
    totalPlays: 450000,
    createdDate: "2024-01-08",
    isActive: true,
  },
  {
    id: "5",
    name: "جاز",
    nameEn: "Jazz",
    description: "موسيقى الجاز والبلوز",
    color: "#FFEAA7",
    songsCount: 345,
    artistsCount: 23,
    playlistsCount: 34,
    totalPlays: 670000,
    createdDate: "2024-01-05",
    isActive: false,
  },
]

export default function GenresPage() {
  const [genres] = useState<Genre[]>(mockGenres)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    description: "",
    color: "#1DB954",
    isActive: true,
  })

  // API Hooks
  // const { data: genresData, isLoading } = useGetQuery<Genre[]>({
  //   key: ["genres"],
  //   url: "/api/genres",
  //   options: { enabled: false }, // Disable for demo
  // })

  const createGenreMutation = useMutationAction<Genre, typeof formData>({
    method: "post",
    url: "/api/genres",
    key: ["genres"],
    onSuccessCallback: () => {
      setShowCreateModal(false)
      resetForm()
    },
  })

  const updateGenreMutation = useMutationAction<Genre, typeof formData & { id: string }>({
    method: "put",
    url: `/api/genres/${selectedGenre?.id}`,
    key: ["genres"],
    onSuccessCallback: () => {
      setShowEditModal(false)
      resetForm()
      setSelectedGenre(null)
    },
  })

  const deleteGenreMutation = useMutationAction<void, { id: string }>({
    method: "delete",
    url: "/api/genres",
    key: ["genres"],
  })

  const resetForm = () => {
    setFormData({
      name: "",
      nameEn: "",
      description: "",
      color: "#1DB954",
      isActive: true,
    })
  }

  const handleCreate = () => {
    createGenreMutation.mutate(formData)
  }

  const handleEdit = (genre: Genre) => {
    setSelectedGenre(genre)
    setFormData({
      name: genre.name,
      nameEn: genre.nameEn,
      description: genre.description,
      color: genre.color,
      isActive: genre.isActive,
    })
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    if (selectedGenre) {
      updateGenreMutation.mutate({ ...formData, id: selectedGenre.id })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا النوع؟")) {
      deleteGenreMutation.mutate({ id })
    }
  }

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isActive ? "نشط" : "غير نشط"}
      </span>
    )
  }

  const columns: Column<Genre>[] = [
    {
      key: "name",
      title: "النوع",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center ml-3"
            style={{ backgroundColor: row.color }}
          >
            <Palette size={20} className="text-white" />
          </div>
          <div>
            <span className="font-medium text-black">{value}</span>
            <div className="text-sm text-gray-500">{row.nameEn}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      title: "الوصف",
      render: (value) => (
        <span className="text-gray-700 text-sm max-w-xs truncate block">{value}</span>
      ),
    },
    {
      key: "songsCount",
      title: "عدد الأغاني",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Music size={16} className="text-primary ml-1" />
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "artistsCount",
      title: "عدد الفنانين",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Users size={16} className="text-blue-500 ml-1" />
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "totalPlays",
      title: "مرات التشغيل",
      sortable: true,
      render: (value) => (
        <span className="text-black font-medium">{value.toLocaleString()}</span>
      ),
    },
    {
      key: "isActive",
      title: "الحالة",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "createdDate",
      title: "تاريخ الإنشاء",
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-500" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_, row) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button 
            onClick={() => handleEdit(row)}
            className="p-2 text-black hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => handleDelete(row.id)}
            className="p-2 text-black hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
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

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    genre.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    genre.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    {
      label: "إجمالي الأنواع",
      value: genres.length.toLocaleString(),
      icon: Palette,
      color: "text-primary",
    },
    {
      label: "الأنواع النشطة",
      value: genres.filter((g) => g.isActive).length.toLocaleString(),
      icon: Eye,
      color: "text-green-500",
    },
    {
      label: "إجمالي الأغاني",
      value: genres.reduce((acc, genre) => acc + genre.songsCount, 0).toLocaleString(),
      icon: Music,
      color: "text-blue-500",
    },
    {
      label: "إجمالي التشغيل",
      value: genres.reduce((acc, genre) => acc + genre.totalPlays, 0).toLocaleString(),
      icon: Users,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#1ed760] rounded-xl p-4 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الأنواع الموسيقية</h1>
            <p className="text-black/80">إدارة وتنظيم أنواع الموسيقى في مركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-black/20 text-black rounded-lg hover:bg-black/30 transition-colors"
          >
            <Plus size={20} className="ml-2" />
            إضافة نوع جديد
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
                placeholder="البحث في الأنواع الموسيقية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black/80 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-[#1ed760] transition-colors">
              <Download size={16} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Genres Table */}
      <DataTable
        data={filteredGenres}
        columns={columns}
        pageSize={10}
        emptyState={
          <div className="p-8 text-center">
            <Palette size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">لا توجد أنواع موسيقية</h3>
            <p className="text-gray-500">لم يتم العثور على أنواع موسيقية مطابقة لمعايير البحث</p>
          </div>
        }
      />

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          resetForm()
        }}
        title="إضافة نوع موسيقي جديد"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم النوع (عربي)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="مثال: طرب"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم النوع (إنجليزي)
            </label>
            <input
              type="text"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Example: Tarab"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="وصف النوع الموسيقي..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اللون المميز
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-12 h-10 border border-gray-200 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="#1DB954"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="isActive" className="mr-2 text-sm text-gray-700">
              نوع نشط
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCreate}
              disabled={createGenreMutation.isPending}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
            >
              {createGenreMutation.isPending ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button
              onClick={() => {
                setShowCreateModal(false)
                resetForm()
              }}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          resetForm()
          setSelectedGenre(null)
        }}
        title="تعديل النوع الموسيقي"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم النوع (عربي)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم النوع (إنجليزي)
            </label>
            <input
              type="text"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اللون المميز
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-12 h-10 border border-gray-200 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="editIsActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="editIsActive" className="mr-2 text-sm text-gray-700">
              نوع نشط
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleUpdate}
              disabled={updateGenreMutation.isPending}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
            >
              {updateGenreMutation.isPending ? "جاري التحديث..." : "تحديث"}
            </button>
            <button
              onClick={() => {
                setShowEditModal(false)
                resetForm()
                setSelectedGenre(null)
              }}
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
