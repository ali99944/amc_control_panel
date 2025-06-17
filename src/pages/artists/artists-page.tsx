"use client"

import { useState } from "react"
import {
  Mic,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Music,
  Calendar,
  Eye,
  Download,
  Users,
  Star,
  Play,
  Heart,
  User,
} from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Modal from "../../components/ui/modal"
import { useMutationAction } from "../../hooks/queries-actions"

interface Artist {
  id: string
  name: string
  nameEn: string
  bio: string
  avatar?: string
  country: string
  genre: string
  songsCount: number
  albumsCount: number
  followersCount: number
  totalPlays: number
  monthlyListeners: number
  verified: boolean
  createdDate: string
  isActive: boolean
  socialLinks: {
    instagram?: string
    twitter?: string
    youtube?: string
    spotify?: string
  }
}

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "محمد عبده",
    nameEn: "Mohammed Abdu",
    bio: "فنان سعودي مشهور بصوته المميز في الطرب العربي",
    country: "السعودية",
    genre: "طرب",
    songsCount: 245,
    albumsCount: 32,
    followersCount: 2500000,
    totalPlays: 45000000,
    monthlyListeners: 1200000,
    verified: true,
    createdDate: "2024-01-15",
    isActive: true,
    socialLinks: {
      instagram: "@mohammed_abdu",
      twitter: "@mohammed_abdu",
      youtube: "MohammedAbduOfficial",
    },
  },
  {
    id: "2",
    name: "فيروز",
    nameEn: "Fairuz",
    bio: "المطربة اللبنانية الأسطورية وسفيرة الأغنية العربية",
    country: "لبنان",
    genre: "طرب",
    songsCount: 189,
    albumsCount: 28,
    followersCount: 3200000,
    totalPlays: 67000000,
    monthlyListeners: 1800000,
    verified: true,
    createdDate: "2024-01-12",
    isActive: true,
    socialLinks: {
      instagram: "@fairuz_official",
      youtube: "FairuzOfficial",
    },
  },
  {
    id: "3",
    name: "عمرو دياب",
    nameEn: "Amr Diab",
    bio: "الهضبة - مطرب مصري وملك البوب العربي",
    country: "مصر",
    genre: "بوب عربي",
    songsCount: 312,
    albumsCount: 45,
    followersCount: 4100000,
    totalPlays: 89000000,
    monthlyListeners: 2300000,
    verified: true,
    createdDate: "2024-01-10",
    isActive: true,
    socialLinks: {
      instagram: "@amrdiab",
      twitter: "@amrdiab",
      youtube: "AmrDiabOfficial",
      spotify: "amr-diab",
    },
  },
  {
    id: "4",
    name: "نانسي عجرم",
    nameEn: "Nancy Ajram",
    bio: "مطربة لبنانية مشهورة بأغانيها العصرية",
    country: "لبنان",
    genre: "بوب عربي",
    songsCount: 156,
    albumsCount: 18,
    followersCount: 2800000,
    totalPlays: 52000000,
    monthlyListeners: 1500000,
    verified: true,
    createdDate: "2024-01-08",
    isActive: true,
    socialLinks: {
      instagram: "@nancyajram",
      twitter: "@nancyajram",
      youtube: "NancyAjramOfficial",
    },
  },
  {
    id: "5",
    name: "كاظم الساهر",
    nameEn: "Kazem Al Saher",
    bio: "المطرب العراقي المعروف بقيصر الأغنية العربية",
    country: "العراق",
    genre: "طرب",
    songsCount: 198,
    albumsCount: 25,
    followersCount: 1900000,
    totalPlays: 38000000,
    monthlyListeners: 950000,
    verified: true,
    createdDate: "2024-01-05",
    isActive: false,
    socialLinks: {
      instagram: "@kazemalsaher",
      youtube: "KazemAlSaherOfficial",
    },
  },
]

export default function ArtistsPage() {
  const [artists] = useState<Artist[]>(mockArtists)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGenre, setFilterGenre] = useState<string>("all")
  const [filterCountry, setFilterCountry] = useState<string>("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    bio: "",
    country: "",
    genre: "",
    verified: false,
    isActive: true,
    socialLinks: {
      instagram: "",
      twitter: "",
      youtube: "",
      spotify: "",
    },
  })

  // API Hooks
  // const { data: artistsData, isLoading } = useGetQuery<Artist[]>({
  //   key: ["artists"],
  //   url: "/api/artists",
  //   options: { enabled: false }, // Disable for demo
  // })

  const createArtistMutation = useMutationAction<Artist, typeof formData>({
    method: "post",
    url: "/api/artists",
    key: ["artists"],
    onSuccessCallback: () => {
      setShowCreateModal(false)
      resetForm()
    },
  })

  const updateArtistMutation = useMutationAction<Artist, typeof formData & { id: string }>({
    method: "put",
    url: `/api/artists/${selectedArtist?.id}`,
    key: ["artists"],
    onSuccessCallback: () => {
      setShowEditModal(false)
      resetForm()
      setSelectedArtist(null)
    },
  })

  const deleteArtistMutation = useMutationAction<void, { id: string }>({
    method: "delete",
    url: "/api/artists",
    key: ["artists"],
  })

  const resetForm = () => {
    setFormData({
      name: "",
      nameEn: "",
      bio: "",
      country: "",
      genre: "",
      verified: false,
      isActive: true,
      socialLinks: {
        instagram: "",
        twitter: "",
        youtube: "",
        spotify: "",
      },
    })
  }

  const handleCreate = () => {
    createArtistMutation.mutate(formData)
  }

  const handleEdit = (artist: Artist) => {
    setSelectedArtist(artist)
    setFormData({
      name: artist.name,
      nameEn: artist.nameEn,
      bio: artist.bio,
      country: artist.country,
      genre: artist.genre,
      verified: artist.verified,
      isActive: artist.isActive,
      socialLinks: {
        instagram: '',
        spotify: '',
        twitter: '',
        youtube: ''
      },
    })
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    if (selectedArtist) {
      updateArtistMutation.mutate({ ...formData, id: selectedArtist.id })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الفنان؟")) {
      deleteArtistMutation.mutate({ id })
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

  // const getVerifiedBadge = (verified: boolean) => {
  //   return verified ? (
  //     <div className="flex items-center">
  //       <Star size={16} className="text-blue-500 ml-1" />
  //       <span className="text-blue-500 text-xs font-medium">موثق</span>
  //     </div>
  //   ) : null
  // }

  const columns: Column<Artist>[] = [
    {
      key: "name",
      title: "الفنان",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center ml-3">
            <User size={20} className="text-white" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium text-black">{value}</span>
              {row.verified && <Star size={16} className="text-blue-500 mr-2" />}
            </div>
            <div className="text-sm text-gray-500">{row.nameEn}</div>
            <div className="text-xs text-gray-400">{row.country}</div>
          </div>
        </div>
      ),
    },
    {
      key: "genre",
      title: "النوع",
      sortable: true,
      render: (value) => <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{value}</span>,
    },
    {
      key: "songsCount",
      title: "الأغاني",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Music size={16} className="text-primary ml-1" />
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "followersCount",
      title: "المتابعون",
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
        <div className="flex items-center">
          <Play size={16} className="text-green-500 ml-1" />
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "monthlyListeners",
      title: "المستمعون الشهريون",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Heart size={16} className="text-red-500 ml-1" />
          <span className="text-black">{value.toLocaleString()}</span>
        </div>
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
      title: "تاريخ الإضافة",
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
          <button className="p-2 text-black hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
            <Eye size={16} />
          </button>
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

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = filterGenre === "all" || artist.genre === filterGenre
    const matchesCountry = filterCountry === "all" || artist.country === filterCountry
    return matchesSearch && matchesGenre && matchesCountry
  })

  const stats = [
    {
      label: "إجمالي الفنانين",
      value: artists.length.toLocaleString(),
      icon: Mic,
      color: "text-primary",
    },
    {
      label: "الفنانون الموثقون",
      value: artists.filter((a) => a.verified).length.toLocaleString(),
      icon: Star,
      color: "text-blue-500",
    },
    {
      label: "إجمالي الأغاني",
      value: artists.reduce((acc, artist) => acc + artist.songsCount, 0).toLocaleString(),
      icon: Music,
      color: "text-green-500",
    },
    {
      label: "إجمالي المتابعين",
      value: artists.reduce((acc, artist) => acc + artist.followersCount, 0).toLocaleString(),
      icon: Users,
      color: "text-purple-500",
    },
  ]

  const genres = [...new Set(artists.map((artist) => artist.genre))]
  const countries = [...new Set(artists.map((artist) => artist.country))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#1ed760] rounded-xl p-4 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الفنانين</h1>
            <p className="text-black/80">إدارة وتنظيم الفنانين في مركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-black/20 text-black rounded-lg hover:bg-black/30 transition-colors"
          >
            <Plus size={20} className="ml-2" />
            إضافة فنان جديد
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
                <stat.icon size={24} className="text-black/80" />
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
                placeholder="البحث في الفنانين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black/80 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
            >
              <option value="all">جميع الأنواع</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
            >
              <option value="all">جميع البلدان</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <button className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-[#1ed760] transition-colors">
              <Download size={16} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Artists Table */}
      <DataTable
        data={filteredArtists}
        columns={columns}
        pageSize={10}
        emptyState={
          <div className="p-8 text-center">
            <Mic size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">لا يوجد فنانون</h3>
            <p className="text-gray-500">لم يتم العثور على فنانين مطابقين لمعايير البحث</p>
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
        title="إضافة فنان جديد"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الفنان (عربي)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="مثال: محمد عبده"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الفنان (إنجليزي)</label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Example: Mohammed Abdu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">السيرة الذاتية</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="نبذة عن الفنان..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">البلد</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="مثال: السعودية"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">النوع الموسيقي</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="مثال: طرب"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">روابط التواصل الاجتماعي</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Instagram"
              />
              <input
                type="text"
                value={formData.socialLinks.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Twitter"
              />
              <input
                type="text"
                value={formData.socialLinks.youtube}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="YouTube"
              />
              <input
                type="text"
                value={formData.socialLinks.spotify}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, spotify: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Spotify"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="verified" className="mr-2 text-sm text-gray-700">
                فنان موثق
              </label>
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
                فنان نشط
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCreate}
              disabled={createArtistMutation.isPending}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
            >
              {createArtistMutation.isPending ? "جاري الحفظ..." : "حفظ"}
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
          setSelectedArtist(null)
        }}
        title="تعديل بيانات الفنان"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الفنان (عربي)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الفنان (إنجليزي)</label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">السيرة الذاتية</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">البلد</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">النوع الموسيقي</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">روابط ��لتواصل الاجتماعي</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Instagram"
              />
              <input
                type="text"
                value={formData.socialLinks.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Twitter"
              />
              <input
                type="text"
                value={formData.socialLinks.youtube}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="YouTube"
              />
              <input
                type="text"
                value={formData.socialLinks.spotify}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, spotify: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Spotify"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="editVerified"
                checked={formData.verified}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="editVerified" className="mr-2 text-sm text-gray-700">
                فنان موثق
              </label>
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
                فنان نشط
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleUpdate}
              disabled={updateArtistMutation.isPending}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
            >
              {updateArtistMutation.isPending ? "جاري التحديث..." : "تحديث"}
            </button>
            <button
              onClick={() => {
                setShowEditModal(false)
                resetForm()
                setSelectedArtist(null)
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
