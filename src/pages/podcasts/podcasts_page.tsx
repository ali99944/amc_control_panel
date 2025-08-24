// "use client"

// import { useState } from "react"
// import { Plus, Mic, Users, Play, Edit, Trash2, Star } from "lucide-react"
// import DataTable, { type Column } from "../../components/datatable"
// import Button from "../../components/ui/button"
// import Card from "../../components/ui/card"
// import Toolbar from "../../components/ui/toolbar"
// import type { Podcast } from "../../types/podcast"
// import { formatDate } from "../../lib/date"

// import Tooltip from "../../components/ui/tooltip"
// import CreatePodcastDialog from "./create_podcast_dialog"
// import DeletePodcastDialog from "./delete_podcast_dialog"
// import UpdatePodcastDialog from "./update_podcast_dialog"

// // Mock data - replace with actual API calls
// const mockPodcasts: Podcast[] = [
//   {
//     id: 1,
//     title: "تقنيات المستقبل",
//     description: "بودكاست يناقش أحدث التقنيات والابتكارات في عالم التكنولوجيا",
//     cover_image: "/placeholder.svg?height=100&width=100",
//     creator_id: 1,
//     category_id: 1,
//     language: "ar",
//     is_explicit: false,
//     is_active: true,
//     is_featured: true,
//     total_episodes: 25,
//     total_duration: 18000, // 5 hours in seconds
//     subscribers_count: 1250,
//     total_plays: 15420,
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-15T00:00:00Z",
//     creator: {
//       id: 1,
//       name: "أحمد التقني",
//       email: "ahmed.tech@example.com",
//       gender: "male",
//       birth_date: "1985-01-01",
//       phone_number: "+966501234567",
//       profile_picture: null,
//       is_active: true,
//       is_banned: false,
//       joined_at: "2024-01-01T00:00:00Z",
//       last_login_time: "2024-01-15T09:00:00Z",
//     },
//     category: {
//       id: 1,
//       name: "Technology",
//       name_ar: "التقنية",
//       description: "Technology and innovation podcasts",
//       is_active: true,
//       podcasts_count: 15,
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-01T00:00:00Z",
//     },
//     latest_episode: {
//       id: 1,
//       podcast_id: 1,
//       title: "الذكاء الاصطناعي في 2024",
//       description: "نناقش أحدث تطورات الذكاء الاصطناعي",
//       audio_file: "/audio/episode1.mp3",
//       duration: 1800,
//       episode_number: 25,
//       season_number: 2,
//       is_published: true,
//       published_at: "2024-01-15T00:00:00Z",
//       play_count: 850,
//       created_at: "2024-01-15T00:00:00Z",
//       updated_at: "2024-01-15T00:00:00Z",
//     },
//   },
//   {
//     id: 2,
//     title: "قصص نجاح",
//     description: "بودكاست يحكي قصص نجاح رواد الأعمال العرب",
//     cover_image: "/placeholder.svg?height=100&width=100",
//     creator_id: 2,
//     category_id: 2,
//     language: "ar",
//     is_explicit: false,
//     is_active: true,
//     is_featured: false,
//     total_episodes: 18,
//     total_duration: 12600, // 3.5 hours in seconds
//     subscribers_count: 890,
//     total_plays: 8750,
//     created_at: "2024-01-10T00:00:00Z",
//     updated_at: "2024-01-14T00:00:00Z",
//     creator: {
//       id: 2,
//       name: "سارة الأعمال",
//       email: "sara.business@example.com",
//       gender: "female",
//       birth_date: "1990-05-15",
//       phone_number: "+966507654321",
//       profile_picture: null,
//       is_active: true,
//       is_banned: false,
//       joined_at: "2024-01-10T00:00:00Z",
//       last_login_time: "2024-01-14T14:00:00Z",
//     },
//     category: {
//       id: 2,
//       name: "Business",
//       name_ar: "الأعمال",
//       description: "Business and entrepreneurship podcasts",
//       is_active: true,
//       podcasts_count: 8,
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-01T00:00:00Z",
//     },
//     latest_episode: {
//       id: 2,
//       podcast_id: 2,
//       title: "رحلة رائد أعمال شاب",
//       description: "قصة نجاح ملهمة لرائد أعمال سعودي",
//       audio_file: "/audio/episode2.mp3",
//       duration: 2100,
//       episode_number: 18,
//       season_number: 1,
//       is_published: true,
//       published_at: "2024-01-14T00:00:00Z",
//       play_count: 420,
//       created_at: "2024-01-14T00:00:00Z",
//       updated_at: "2024-01-14T00:00:00Z",
//     },
//   },
// ]

// export default function PodcastsPage() {
//   const [podcasts] = useState<Podcast[]>(mockPodcasts)
//   const [isLoading] = useState(false)
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
//   const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null)

//   // Calculate stats
//   const stats = {
//     total: podcasts.length,
//     active: podcasts.filter((p) => p.is_active).length,
//     featured: podcasts.filter((p) => p.is_featured).length,
//     totalEpisodes: podcasts.reduce((acc, podcast) => acc + podcast.total_episodes, 0),
//     totalSubscribers: podcasts.reduce((acc, podcast) => acc + podcast.subscribers_count, 0),
//     totalPlays: podcasts.reduce((acc, podcast) => acc + podcast.total_plays, 0),
//   }

//   // Format duration
//   const formatDuration = (seconds: number): string => {
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)

//     if (hours > 0) {
//       return `${hours}س ${minutes}د`
//     }
//     return `${minutes}د`
//   }

//   // Handle actions
//   const handleEditPodcast = (podcast: Podcast) => {
//     setSelectedPodcast(podcast)
//     setIsUpdateDialogOpen(true)
//   }

//   const handleDeletePodcast = (podcast: Podcast) => {
//     setSelectedPodcast(podcast)
//     setIsDeleteDialogOpen(true)
//   }

//   const handleDialogSuccess = () => {
//     // Refresh data
//     console.log("Podcast operation completed")
//   }

//   // DataTable columns
//   const columns: Column<Podcast>[] = [
//     {
//       key: "cover_image",
//       title: "الغلاف",
//       width: "80px",
//       render: (value: string | null) => (
//         <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
//           {value ? (
//             <img src={value || "/placeholder.svg"} alt="Podcast cover" className="w-full h-full object-cover" />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <Mic className="w-5 h-5 text-gray-400" />
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       key: "title",
//       title: "البودكاست",
//       sortable: true,
//       render: (value: string, row: Podcast) => (
//         <div>
//           <div className="font-medium text-gray-900 flex items-center gap-2">
//             {value}
//             {row.is_featured && (
//               <Tooltip trigger="hover" content="مميز">
//                 <Star className="w-4 h-4 text-yellow-500" />
//               </Tooltip>
//             )}
//             {row.is_explicit && (
//               <Tooltip trigger="hover" content="محتوى صريح">
//                 <span className="text-xs bg-red-100 text-red-600 px-1 rounded">E</span>
//               </Tooltip>
//             )}
//           </div>
//           <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
//             <span className="flex items-center gap-1">
//               <Mic className="w-3 h-3" />
//               {row.total_episodes} حلقة
//             </span>
//             <span className="flex items-center gap-1">
//               <Play className="w-3 h-3" />
//               {row.total_plays.toLocaleString()} تشغيل
//             </span>
//             <span className="flex items-center gap-1">
//               <Users className="w-3 h-3" />
//               {row.subscribers_count.toLocaleString()} متابع
//             </span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "creator",
//       title: "المنشئ",
//       render: (_, row: Podcast) => (
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
//             <span className="text-white text-xs font-medium">{row.creator?.name.charAt(0)}</span>
//           </div>
//           <span className="text-sm text-gray-700">{row.creator?.name}</span>
//         </div>
//       ),
//     },
//     {
//       key: "category",
//       title: "الفئة",
//       render: (_, row: Podcast) => <span className="text-sm text-gray-700">{row.category?.name_ar}</span>,
//     },
//     {
//       key: "latest_episode",
//       title: "آخر حلقة",
//       render: (_, row: Podcast) => (
//         <div>
//           {row.latest_episode ? (
//             <>
//               <div className="text-sm font-medium text-gray-900 line-clamp-1">{row.latest_episode.title}</div>
//               <div className="text-xs text-gray-500">{formatDate(row.latest_episode.published_at || "")}</div>
//             </>
//           ) : (
//             <span className="text-sm text-gray-400">لا توجد حلقات</span>
//           )}
//         </div>
//       ),
//     },
//     {
//       key: "is_active",
//       title: "الحالة",
//       width: "100px",
//       render: (value: boolean) => (
//         <span
//           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//             value ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
//           }`}
//         >
//           {value ? "نشط" : "معطل"}
//         </span>
//       ),
//     },
//     {
//       key: "created_at",
//       title: "تاريخ الإنشاء",
//       sortable: true,
//       render: (value: string) => formatDate(value),
//     },
//     {
//       key: "actions",
//       title: "الإجراءات",
//       width: "140px",
//       render: (_, row: Podcast) => (
//         <div className="flex items-center gap-2">
//           <Button size="sm" variant="secondary" onClick={() => handleEditPodcast(row)} title="تعديل">
//             <Edit className="w-4 h-4" />
//           </Button>
//           <Button size="sm" variant="danger" onClick={() => handleDeletePodcast(row)} title="حذف">
//             <Trash2 className="w-4 h-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ]

//   return (
//     <div className="space-y-4">
//       {/* Page Header */}
//       <Toolbar title="إدارة البودكاست">
//         <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
//           إنشاء بودكاست جديد
//         </Button>
//       </Toolbar>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//               <Mic className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">إجمالي البودكاست</p>
//               <p className="text-lg font-bold text-primary">{stats.total}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
//               <Play className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">بودكاست نشط</p>
//               <p className="text-lg font-bold text-green-600">{stats.active}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
//               <Star className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">بودكاست مميز</p>
//               <p className="text-lg font-bold text-yellow-600">{stats.featured}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
//               <Mic className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">إجمالي الحلقات</p>
//               <p className="text-lg font-bold text-blue-600">{stats.totalEpisodes}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
//               <Users className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">إجمالي المتابعين</p>
//               <p className="text-lg font-bold text-purple-600">{stats.totalSubscribers.toLocaleString()}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//               <Play className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">إجمالي التشغيلات</p>
//               <p className="text-lg font-bold text-primary">{stats.totalPlays.toLocaleString()}</p>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Podcasts Table */}
//       <DataTable
//         data={podcasts}
//         columns={columns}
//         loading={isLoading}
//         searchable
//         exportable
//         emptyState={
//           <div className="text-center py-8">
//             <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">لا توجد بودكاست</p>
//             <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
//               إنشاء بودكاست جديد
//             </Button>
//           </div>
//         }
//       />

//       {/* Dialogs */}
//       <CreatePodcastDialog
//         isOpen={isCreateDialogOpen}
//         onClose={() => setIsCreateDialogOpen(false)}
//         onSuccess={handleDialogSuccess}
//       />

//       <UpdatePodcastDialog
//         isOpen={isUpdateDialogOpen}
//         onClose={() => setIsUpdateDialogOpen(false)}
//         podcast={selectedPodcast}
//         onSuccess={handleDialogSuccess}
//       />

//       <DeletePodcastDialog
//         isOpen={isDeleteDialogOpen}
//         onClose={() => setIsDeleteDialogOpen(false)}
//         podcast={selectedPodcast}
//         onSuccess={handleDialogSuccess}
//       />
//     </div>
//   )
// }
