"use client"

import { useState } from "react"
import { Plus, Music, Globe, Lock, Edit, Trash2, Clock } from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Toolbar from "../../components/ui/toolbar"
import { usePlaylists } from "../../hooks/use-playlists"
import { Playlist } from "../../types/playlist"
import CreatePlaylistDialog from "./create-playlist-dialog"
import DeletePlaylistDialog from "./delete-playlist-dialog"
import UpdatePlaylistDialog from "./update-playlist-dialog"
import Tooltip from "../../components/ui/tooltip"
import { formatDate } from "../../lib/date"
import StatisticCard from "../../components/ui-components/statistic-card"
// import PlaylistFiltersComponent from "./playlists_filter"


export default function PlaylistsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

  // Fetch playlists data
  const { data: playlists = [], isLoading, refetch } = usePlaylists()

  // Calculate stats
  const stats = {
    total: playlists.length,
    public: playlists.filter((p) => p.is_public).length,
    private: playlists.filter((p) => !p.is_public).length,
    totalSongs: playlists.reduce((acc, playlist) => acc + playlist.songs.length, 0),
    totalDuration: playlists.reduce((acc, playlist) => acc + 
      playlist.songs.reduce((accs, song) => accs + song.original_audio.duration, 0)
    , 0),
    averageSongs:
      playlists.length > 0
        ? Math.round(playlists.reduce((acc, playlist) => acc + playlist.songs.length, 0) / playlists.length)
        : 0,
  }

  // Handle edit playlist
  const handleEditPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist)
    setIsUpdateDialogOpen(true)
  }

  // Handle delete playlist
  const handleDeletePlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist)
    setIsDeleteDialogOpen(true)
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // Format duration helper
  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return "0:00"

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  // Format total duration for stats
  const formatTotalDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}س ${minutes}د`
    }
    return `${minutes}د`
  }

  // DataTable columns
  const columns: Column<Playlist>[] = [
    {
      key: "cover_image",
      title: "الغلاف",
      width: "80px",
      render: (value: string | null) => (
        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
          {value ? (
            <img src={value || "/placeholder.svg"} alt="Playlist cover" className="w-full h-full object-cover" />
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
      title: "قائمة التشغيل",
      sortable: true,
      render: (value: string, row: Playlist) => (
        <div>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            {value}
            {row.is_public ? (
              <Tooltip
                trigger="hover"
                content="عامة"
              >
                <Globe className="w-4 h-4 text-green-600" />
              </Tooltip>
            ) : (
              <Tooltip
                trigger="hover"
                content="خاصة"
              >
                <Lock className="w-4 h-4 text-gray-400"  />
              </Tooltip>
            )}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1">
              <Music className="w-3 h-3" />
              {row.songs.length} أغنية
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(row.songs.reduce((acc, song) => acc + song.original_audio.duration,0))}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      title: "الوصف",
      render: (value: string | null) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 line-clamp-2">{value || "لا يوجد وصف"}</p>
        </div>
      ),
    },
    // {
    //   key: "is_public",
    //   title: "النوع",
    //   width: "100px",
    //   render: (value: boolean) => (
    //     <div className="flex items-center gap-2">
    //       {value ? (
    //         <>
    //           <Globe className="w-4 h-4 text-green-600" />
    //           <span className="text-green-600 text-sm">عامة</span>
    //         </>
    //       ) : (
    //         <>
    //           <Lock className="w-4 h-4 text-gray-400" />
    //           <span className="text-gray-400 text-sm">خاصة</span>
    //         </>
    //       )}
    //     </div>
    //   ),
    // },
    {
      key: "created_at",
      title: "تاريخ الإنشاء",
      sortable: true,
      render: (value: string) => formatDate(value),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "140px",
      render: (_, row: Playlist) => (
        <div className="flex items-center gap-2">

          <Button size="sm" variant="secondary" onClick={() => handleEditPlaylist(row)} className="!px-2" title="تعديل">
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeletePlaylist(row)} className="!px-2" title="حذف">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة قوائم التشغيل">
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)} className="!py-2.5 !px-2.5">
        </Button>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

        <StatisticCard 
          stat={{
            icon: Music,
            name: 'اجمالي القوائم',
            value: stats.total
          }}
        />

        <StatisticCard 
          stat={{
            icon: Globe,
            name: 'القوائم العامة',
            value: stats.public
          }}
        />

        <StatisticCard 
          stat={{
            icon: Lock,
            name: 'القوائم الخاصة',
            value: stats.private
          }}
        />

        <StatisticCard 
          stat={{
            icon: Music,
            name: 'إجمالي الأغاني',
            value: stats.totalSongs
          }}
        />

        <StatisticCard 
          stat={{
            icon: Clock,
            name: 'إجمالي المدة',
            value: formatTotalDuration(stats.totalDuration)
          }}
        />

        <StatisticCard 
          stat={{
            icon: Music,
            name: 'متوسط الأغاني',
            value: stats.averageSongs
          }}
        />
      </div>

      {/* <PlaylistFiltersComponent 
        filters={{}}
        onClearFilters={() => {}}
        onFiltersChange={() => {}}
      /> */}

      {/* Playlists Table */}
      <DataTable
        data={playlists}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد قوائم تشغيل</p>
            <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              إنشاء قائمة تشغيل جديدة
            </Button>
          </div>
        }
      />

      {/* Dialogs */}
      <CreatePlaylistDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <UpdatePlaylistDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        playlist={selectedPlaylist}
        onSuccess={handleDialogSuccess}
      />

      <DeletePlaylistDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        playlist={selectedPlaylist}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
