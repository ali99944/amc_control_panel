"use client"

import { useState } from "react"
import { Plus, Music, Eye, Edit, Trash2, Clock, Calendar } from 'lucide-react'
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useSongs } from "../../hooks/use-songs"
import CreateSongDialog from "./create-song-dialog"
import DeleteSongDialog from "./delete-song-dialog"
import UpdateSongDialog from "./update-song-dialog"
import { useNavigate } from "react-router-dom"
import { Song } from "../../types/song"
import { formatDate } from "../../lib/date"
// import { getStorageFile } from "../../lib/storage"
// import SongFiltersComponent from "./songs-filter"


export default function SongsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  const navigate = useNavigate()

  // Fetch songs data
  const { data: songs = [], isLoading, refetch } = useSongs()

  // Calculate stats
  const stats = {
    total: songs.length,
    active: songs.filter((s) => s.is_active).length,
    explicit: songs.filter((s) => s.explicit).length,
    // totalPlays: songs.reduce((acc, song) => acc + song.plays_count, 0),
    // totalLikes: songs.reduce((acc, song) => acc + song.likes_count, 0),
    withLyrics: songs.filter((s) => s.lyrics && s.lyrics.length > 0).length,
  }

  // Handle edit song
  const handleEditSong = (song: Song) => {
    setSelectedSong(song)
    setIsUpdateDialogOpen(true)
  }

  // Handle delete song
  const handleDeleteSong = (song: Song) => {
    console.log('deleting');
    
    setSelectedSong(song)
    setIsDeleteDialogOpen(true)
  }

  // Handle view song details
  const handleViewSong = (song: Song) => {
    navigate(`/songs/${song.id}`)
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // Format duration helper
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = (seconds % 60).toFixed(2)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}


  // DataTable columns
  const columns: Column<Song>[] = [
    {
      key: "image",
      title: "الغلاف",
      width: "80px",
      render: (value: string, row: Song) => (
        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden cursor-pointer" onClick={() => handleViewSong(row)}>
          {value ? (
            <img src={value || "/placeholder.svg"} alt={row.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title",
      title: "الأغنية",
      sortable: true,
      render: (value: string, row: Song) => (
        <div className="cursor-pointer" onClick={() => handleViewSong(row)}>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            {value}
            {row.explicit && (
              <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded font-medium">صريح</span>
            )}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-3">
            {/* Artist section */}
            {row.artist ? (
              <span className="flex items-center gap-1">
                <span className="font-medium">{row.artist.name}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-gray-400 italic">
                فنان غير معروف
              </span>
            )}

            {/* Genre section */}
            {row.genre ? (
              <span className="flex items-center gap-1">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: row.genre.color }}
                />
                <span>{row.genre.name}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-gray-400 italic">
                <div 
                  className="w-2 h-2 rounded-full bg-gray-300"
                />
                تصنيف غير محدد
              </span>
            )}

            {/* Duration section */}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {row.original_audio?.duration ? (
                formatDuration(row.original_audio.duration)
              ) : (
                <span className="text-gray-400 italic">غير متوفر</span>
              )}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "track_number",
      title: "المسار",
      // width: "80px",
      sortable: true,
      render: (value: number) => (
        <div className="text-start">
          {value ?? 'no track number'}
        </div>
      ),
    },
    {
      key: "release_date",
      title: "تاريخ الإصدار",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm">
          <div className="text-gray-900">{formatDate(value)}</div>
        </div>
      ),
    },
    // {
    //   key: "is_active",
    //   title: "الحالة",
    //   width: "100px",
    //   render: (value: boolean) => (
    //     <div className="flex items-center gap-2">
    //       {value ? (
    //         <>
    //           <Eye className="w-4 h-4 text-green-600" />
    //           <span className="text-green-600 text-sm">نشط</span>
    //         </>
    //       ) : (
    //         <>
    //           <EyeOff className="w-4 h-4 text-gray-400" />
    //           <span className="text-gray-400 text-sm">غير نشط</span>
    //         </>
    //       )}
    //     </div>
    //   ),
    // },
    {
      key: "actions",
      title: "الإجراءات",
      width: "120px",
      render: (_, row: Song) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleEditSong(row)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteSong(row)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة الأغاني">
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
          إضافة أغنية جديدة
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
              <p className="text-xs text-gray-600">إجمالي الأغاني</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">النشطة</p>
              <p className="text-lg font-bold text-primary">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">محتوى صريح</p>
              <p className="text-lg font-bold text-primary">{stats.explicit}</p>
            </div>
          </div>
        </Card>

        {/* <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي التشغيل</p>
              <p className="text-lg font-bold text-primary">{formatNumber(stats.totalPlays)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الإعجابات</p>
              <p className="text-lg font-bold text-primary">{formatNumber(stats.totalLikes)}</p>
            </div>
          </div>
        </Card> */}

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">مع كلمات</p>
              <p className="text-lg font-bold text-primary">{stats.withLyrics}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* <SongFiltersComponent
        filters={{

        }}

        onClearFilters={() => {}}
        onFiltersChange={() => {}}
      /> */}

      {/* Songs Table */}
      <DataTable
        data={songs}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        // onRowClick={handleViewSong}
        emptyState={
          <div className="text-center py-8">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد أغاني</p>
            <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              إضافة أغنية جديدة
            </Button>
          </div>
        }
      />

      {/* Dialogs */}
      <CreateSongDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <UpdateSongDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        song={selectedSong}
        onSuccess={handleDialogSuccess}
      />

      <DeleteSongDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        song={selectedSong}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
