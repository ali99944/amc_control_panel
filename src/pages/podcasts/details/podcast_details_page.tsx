"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Mic, Users, Play, Calendar, Settings, Plus, Edit, Trash2, Star, Eye, Download, Upload, BarChart3, Clock, Globe, Lock } from 'lucide-react'
import { useNavigate, useParams } from "react-router-dom"
import { Tooltip } from "recharts"
import DataTable, { Column } from "../../../components/datatable"
import Button from "../../../components/ui/button"
import Card from "../../../components/ui/card"
import Switch from "../../../components/ui/switch"
import Toolbar from "../../../components/ui/toolbar"
import { Podcast, PodcastEpisode } from "../../../types/podcast"
import UpdatePodcastDialog from "../update_podcast_dialog"
import CreateEpisodeDialog from "./create_episode_dialog"
import DeleteEpisodeDialog from "./delete_episode_dialog"
import PodcastSettingsDialog from "./podcast_settings_dialog"
import UpdateEpisodeDialog from "./update_episode_dialog"
import { formatDate } from "../../../lib/date"

// Mock data - replace with actual API call
const mockPodcastDetails: Podcast = {
  id: 1,
  title: "تقنيات المستقبل",
  description: "بودكاست يناقش أحدث التقنيات والابتكارات في عالم التكنولوجيا. نستضيف خبراء ومختصين لمناقشة التطورات التقنية وتأثيرها على حياتنا اليومية والمستقبل.",
  cover_image: "/placeholder.svg?height=200&width=200",
  creator_id: 1,
  category_id: 1,
  language: "ar",
  is_explicit: false,
  is_active: true,
  is_featured: true,
  total_episodes: 25,
  total_duration: 45000, // 12.5 hours in seconds
  subscribers_count: 1250,
  total_plays: 15420,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-15T00:00:00Z",
  creator: {
    id: 1,
    name: "أحمد التقني",
    email: "ahmed.tech@example.com",
    gender: "male",
    birth_date: "1985-01-01",
    phone_number: "+966501234567",
    profile_picture: "/placeholder.svg?height=50&width=50",
    is_active: true,
    is_banned: false,
    joined_at: "2024-01-01T00:00:00Z",
    last_login_time: "2024-01-15T09:00:00Z",
  },
  category: {
    id: 1,
    name: "Technology",
    name_ar: "التقنية",
    description: "Technology and innovation podcasts",
    is_active: true,
    podcasts_count: 15,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
}

const mockEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    podcast_id: 1,
    title: "الذكاء الاصطناعي في 2024",
    description: "نناقش أحدث تطورات الذكاء الاصطناعي وتأثيرها على مختلف الصناعات",
    audio_file: "/audio/episode1.mp3",
    duration: 1800, // 30 minutes
    episode_number: 25,
    season_number: 2,
    is_published: true,
    published_at: "2024-01-15T00:00:00Z",
    play_count: 850,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    podcast_id: 1,
    title: "مستقبل الحوسبة الكمية",
    description: "استكشاف عالم الحوسبة الكمية وإمكانياتها المستقبلية",
    audio_file: "/audio/episode2.mp3",
    duration: 2100, // 35 minutes
    episode_number: 24,
    season_number: 2,
    is_published: true,
    published_at: "2024-01-10T00:00:00Z",
    play_count: 720,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
  {
    id: 3,
    podcast_id: 1,
    title: "الأمن السيبراني للشركات",
    description: "كيفية حماية الشركات من التهديدات السيبرانية المتزايدة",
    audio_file: "/audio/episode3.mp3",
    duration: 1950, // 32.5 minutes
    episode_number: 23,
    season_number: 2,
    is_published: false,
    published_at: null,
    play_count: 0,
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
]

export default function PodcastDetailsPage() {
  const navigate = useNavigate()
  const params = useParams()
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null)
  const [activeTab, setActiveTab] = useState<"episodes" | "analytics" | "settings">("episodes")

  // Dialog states
  const [isCreateEpisodeOpen, setIsCreateEpisodeOpen] = useState(false)
  const [isUpdateEpisodeOpen, setIsUpdateEpisodeOpen] = useState(false)
  const [isDeleteEpisodeOpen, setIsDeleteEpisodeOpen] = useState(false)
  const [isUpdatePodcastOpen, setIsUpdatePodcastOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPodcast(mockPodcastDetails)
      setEpisodes(mockEpisodes)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!podcast) {
    return (
      <div className="text-center py-8">
        <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">لم يتم العثور على البودكاست</p>
        <Button variant="primary" className="mt-4" onClick={() => navigate("/podcasts")}>
          العودة للبودكاست
        </Button>
      </div>
    )
  }

  // Format duration
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  // Format total duration for display
  const formatTotalDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}س ${minutes}د`
    }
    return `${minutes}د`
  }

  // Handle episode actions
  const handleCreateEpisode = () => {
    setIsCreateEpisodeOpen(true)
  }

  const handleEditEpisode = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode)
    setIsUpdateEpisodeOpen(true)
  }

  const handleDeleteEpisode = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode)
    setIsDeleteEpisodeOpen(true)
  }

  const handleTogglePublish = async (episode: PodcastEpisode) => {
    // Simulate API call to toggle publish status
    console.log("Toggling publish status for episode:", episode.id)
    const updatedEpisodes = episodes.map((ep) =>
      ep.id === episode.id
        ? {
            ...ep,
            is_published: !ep.is_published,
            published_at: !ep.is_published ? new Date().toISOString() : null,
          }
        : ep
    )
    setEpisodes(updatedEpisodes)
  }

  const handleToggleFeatured = async () => {
    // Simulate API call to toggle featured status
    console.log("Toggling featured status for podcast:", podcast.id)
    setPodcast({ ...podcast, is_featured: !podcast.is_featured })
  }

  const handleToggleActive = async () => {
    // Simulate API call to toggle active status
    console.log("Toggling active status for podcast:", podcast.id)
    setPodcast({ ...podcast, is_active: !podcast.is_active })
  }

  // Episodes table columns
  const episodeColumns: Column<PodcastEpisode>[] = [
    {
      key: "episode_number",
      title: "رقم الحلقة",
      width: "100px",
      sortable: true,
      render: (value: number, row: PodcastEpisode) => (
        <div className="text-center">
          <span className="font-mono text-sm font-medium">#{value}</span>
          {row.season_number && <div className="text-xs text-gray-500">الموسم {row.season_number}</div>}
        </div>
      ),
    },
    {
      key: "title",
      title: "عنوان الحلقة",
      sortable: true,
      render: (value: string, row: PodcastEpisode) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 line-clamp-2 mt-1">{row.description}</div>
        </div>
      ),
    },
    {
      key: "duration",
      title: "المدة",
      width: "100px",
      render: (value: number) => <span className="font-mono text-sm">{formatDuration(value)}</span>,
    },
    {
      key: "play_count",
      title: "التشغيلات",
      width: "100px",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Play className="w-3 h-3 text-gray-400" />
          <span className="text-sm">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "is_published",
      title: "الحالة",
      width: "120px",
      render: (value: boolean, row: PodcastEpisode) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={value}
            onChange={() => handleTogglePublish(row)}
            size="sm"
            color={value ? "success" : "default"}
          />
          <span className={`text-xs ${value ? "text-green-600" : "text-gray-500"}`}>
            {value ? "منشور" : "مسودة"}
          </span>
        </div>
      ),
    },
    {
      key: "published_at",
      title: "تاريخ النشر",
      sortable: true,
      render: (value: string | null) => (
        <span className="text-sm text-gray-600">{value ? formatDate(value) : "غير منشور"}</span>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "120px",
      render: (_, row: PodcastEpisode) => (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="secondary" onClick={() => handleEditEpisode(row)} title="تعديل">
            <Edit className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteEpisode(row)} title="حذف">
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ),
    },
  ]

  // Calculate episode stats
  const episodeStats = {
    total: episodes.length,
    published: episodes.filter((ep) => ep.is_published).length,
    draft: episodes.filter((ep) => !ep.is_published).length,
    totalPlays: episodes.reduce((acc, ep) => acc + ep.play_count, 0),
    averageDuration: episodes.length > 0 ? episodes.reduce((acc, ep) => acc + ep.duration, 0) / episodes.length : 0,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Toolbar
        title={podcast.title}
        backButton={{
          onClick: () => navigate("/podcasts"),
          icon: ArrowLeft,
        }}
      >
        <div className="flex gap-2">
          <Button variant="secondary" icon={BarChart3}>
            التحليلات
          </Button>
          <Button variant="secondary" icon={Settings} onClick={() => setIsSettingsOpen(true)}>
            الإعدادات
          </Button>
          <Button variant="secondary" icon={Edit} onClick={() => setIsUpdatePodcastOpen(true)}>
            تعديل البودكاست
          </Button>
        </div>
      </Toolbar>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Podcast Overview */}
          <Card>
            <div >
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {podcast.cover_image ? (
                    <img
                      src={podcast.cover_image || "/placeholder.svg"}
                      alt="Podcast cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Mic className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{podcast.title}</h2>
                        {podcast.is_featured && (
                          <Tooltip trigger="hover" content="بودكاست مميز">
                            <Star className="w-5 h-5 text-yellow-500" />
                          </Tooltip>
                        )}
                        {podcast.is_explicit && (
                          <Tooltip trigger="hover" content="محتوى صريح">
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">صريح</span>
                          </Tooltip>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{podcast.category?.name_ar}</p>
                      <p className="text-gray-700 leading-relaxed">{podcast.description}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={podcast.is_active}
                          onChange={handleToggleActive}
                          color={podcast.is_active ? "success" : "default"}
                        />
                        <span className={`text-sm ${podcast.is_active ? "text-green-600" : "text-gray-500"}`}>
                          {podcast.is_active ? "نشط" : "معطل"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={podcast.is_featured}
                          onChange={handleToggleFeatured}
                          color={podcast.is_featured ? "warning" : "default"}
                        />
                        <span className={`text-sm ${podcast.is_featured ? "text-yellow-600" : "text-gray-500"}`}>
                          مميز
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{podcast.total_episodes}</div>
                      <div className="text-sm text-gray-500">حلقة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{podcast.subscribers_count.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">متابع</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{podcast.total_plays.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">تشغيل</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{formatTotalDuration(podcast.total_duration)}</div>
                      <div className="text-sm text-gray-500">إجمالي المدة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card className="border-b border-gray-200">
            <nav className="-mb-px flex gap-x-8 space-x-reverse">
              <button
                onClick={() => setActiveTab("episodes")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "episodes"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                الحلقات ({episodeStats.total})
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "analytics"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                التحليلات
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "settings"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                الإعدادات
              </button>
            </nav>
          </Card>

          {/* Tab Content */}
          {activeTab === "episodes" && (
            <Card>
              <div >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">إدارة الحلقات</h3>
                  <Button variant="primary" icon={Plus} onClick={handleCreateEpisode}>
                    إضافة حلقة جديدة
                  </Button>
                </div>

                {/* Episode Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-gray-900">{episodeStats.total}</div>
                    <div className="text-xs text-gray-500">إجمالي الحلقات</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">{episodeStats.published}</div>
                    <div className="text-xs text-gray-500">منشور</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-yellow-600">{episodeStats.draft}</div>
                    <div className="text-xs text-gray-500">مسودة</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">{episodeStats.totalPlays.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">إجمالي التشغيلات</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-600">{formatDuration(episodeStats.averageDuration)}</div>
                    <div className="text-xs text-gray-500">متوسط المدة</div>
                  </div>
                </div>

                {/* Episodes Table */}
                <DataTable
                  data={episodes}
                  columns={episodeColumns}
                  searchable
                  emptyState={
                    <div className="text-center py-8">
                      <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">لا توجد حلقات</p>
                      <Button variant="primary" size="sm" className="mt-4" onClick={handleCreateEpisode}>
                        إضافة حلقة جديدة
                      </Button>
                    </div>
                  }
                />
              </div>
            </Card>
          )}

          {activeTab === "analytics" && (
            <Card>
              <div >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">تحليلات البودكاست</h3>
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p>سيتم إضافة التحليلات التفصيلية هنا</p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <div >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">إعدادات البودكاست</h3>
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4" />
                  <p>سيتم إضافة الإعدادات التفصيلية هنا</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Creator Info */}
          <Card>
            <div >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات المنشئ</h3>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full overflow-hidden">
                  {podcast.creator?.profile_picture ? (
                    <img
                      src={podcast.creator.profile_picture || "/placeholder.svg"}
                      alt="Creator"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white font-medium text-lg">{podcast.creator?.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{podcast.creator?.name}</h4>
                  <p className="text-sm text-gray-500">منشئ البودكاست</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">البريد الإلكتروني:</span>
                  <span className="text-gray-900">{podcast.creator?.email}</span>
                </div>
                {podcast.creator?.phone_number && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم الهاتف:</span>
                    <span className="text-gray-900">{podcast.creator.phone_number}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">عضو منذ:</span>
                  <span className="text-gray-900">{formatDate(podcast.creator?.joined_at || "")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">حالة الحساب:</span>
                  <span className={`${podcast.creator?.is_active ? "text-green-600" : "text-red-600"}`}>
                    {podcast.creator?.is_active ? "نشط" : "غير نشط"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Podcast Info */}
          <Card>
            <div >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات البودكاست</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">رقم البودكاست:</span>
                  <span className="font-mono text-gray-900">#{podcast.id.toString().padStart(6, "0")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">اللغة:</span>
                  <span className="text-gray-900">{podcast.language === "ar" ? "العربية" : "الإنجليزية"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ الإنشاء:</span>
                  <span className="text-gray-900">{formatDate(podcast.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخر تحديث:</span>
                  <span className="text-gray-900">{formatDate(podcast.updated_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المحتوى:</span>
                  <span className={`${podcast.is_explicit ? "text-red-600" : "text-green-600"}`}>
                    {podcast.is_explicit ? "صريح" : "مناسب للجميع"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>

              <div className="space-y-3">
                <Button variant="secondary" className="w-full" icon={Upload}>
                  رفع حلقة جديدة
                </Button>
                <Button variant="secondary" className="w-full" icon={Download}>
                  تصدير البيانات
                </Button>
                <Button variant="secondary" className="w-full" icon={Eye}>
                  معاينة البودكاست
                </Button>
                <Button variant="secondary" className="w-full" icon={BarChart3}>
                  تقرير مفصل
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <CreateEpisodeDialog
        isOpen={isCreateEpisodeOpen}
        onClose={() => setIsCreateEpisodeOpen(false)}
        podcastId={podcast.id}
        onSuccess={() => {
          // Refresh episodes
          console.log("Episode created")
        }}
      />

      <UpdateEpisodeDialog
        isOpen={isUpdateEpisodeOpen}
        onClose={() => setIsUpdateEpisodeOpen(false)}
        episode={selectedEpisode}
        onSuccess={() => {
          // Refresh episodes
          console.log("Episode updated")
        }}
      />

      <DeleteEpisodeDialog
        isOpen={isDeleteEpisodeOpen}
        onClose={() => setIsDeleteEpisodeOpen(false)}
        episode={selectedEpisode}
        onSuccess={() => {
          // Refresh episodes
          console.log("Episode deleted")
        }}
      />

      <UpdatePodcastDialog
        isOpen={isUpdatePodcastOpen}
        onClose={() => setIsUpdatePodcastOpen(false)}
        podcast={podcast}
        onSuccess={() => {
          // Refresh podcast
          console.log("Podcast updated")
        }}
      />

      <PodcastSettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        podcast={podcast}
        onSuccess={() => {
          // Refresh podcast
          console.log("Settings updated")
        }}
      />
    </div>
  )
}
