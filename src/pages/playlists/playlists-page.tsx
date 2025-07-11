"use client"

import { useState } from "react"
import { Plus, Music, Globe, Lock, Edit, Trash2, Clock } from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { usePlaylists } from "../../hooks/use-playlists"
import { Playlist } from "../../types/playlist"
import CreatePlaylistDialog from "./create-playlist-dialog"
import DeletePlaylistDialog from "./delete-playlist-dialog"
import UpdatePlaylistDialog from "./update-playlist-dialog"
import Tooltip from "../../components/ui/tooltip"
import { formatDate } from "../../lib/date"


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
    totalSongs: playlists.reduce((acc, playlist) => acc + playlist.songs_count, 0),
    totalDuration: playlists.reduce((acc, playlist) => acc + playlist.total_duration, 0),
    averageSongs:
      playlists.length > 0
        ? Math.round(playlists.reduce((acc, playlist) => acc + playlist.songs_count, 0) / playlists.length)
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
              {row.songs_count} أغنية
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(row.total_duration)}
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

          <Button size="sm" variant="secondary" onClick={() => handleEditPlaylist(row)} title="تعديل">
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeletePlaylist(row)} title="حذف">
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
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
          إنشاء قائمة تشغيل جديدة
        </Button>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي القوائم</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">القوائم العامة</p>
              <p className="text-lg font-bold text-primary">{stats.public}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">القوائم الخاصة</p>
              <p className="text-lg font-bold text-primary">{stats.private}</p>
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

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي المدة</p>
              <p className="text-lg font-bold text-primary">{formatTotalDuration(stats.totalDuration)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">متوسط الأغاني</p>
              <p className="text-lg font-bold text-primary">{stats.averageSongs}</p>
            </div>
          </div>
        </Card>
      </div>

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
