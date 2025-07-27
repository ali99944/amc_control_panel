"use client"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Music } from "lucide-react"
import Button from "../../components/ui/button"
import { useAlbum, useToggleAlbumStatus, useToggleAlbumFeatured } from "../../hooks/use-albums"
import { useNotifications } from "../../hooks/use-notification"
import DeleteAlbumDialog from "../albums/delete-album-dialog"
import UpdateAlbumDialog from "../albums/update-album-dialog"
import AlbumBuilder from "./album-builder"
import AlbumGenres from "./album-genres"
import AlbumHeader from "./album-header"
import AlbumStats from "./album-stats"


export default function AlbumDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const albumId = Number.parseInt(id as string)
  const { notify } = useNotifications()

  // Dialog states
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Fetch album data
  const { data: album, isLoading, refetch } = useAlbum(albumId)

  // Mutations
  const { mutate: toggleStatus, isPending: isTogglingStatus } = useToggleAlbumStatus(() => {
    refetch()
    notify.success("تم تحديث حالة الألبوم بنجاح")
  })

  const { mutate: toggleFeatured, isPending: isTogglingFeatured } = useToggleAlbumFeatured(() => {
    refetch()
    notify.success("تم تحديث حالة الإبراز بنجاح")
  })

  // Handlers
  const handleBack = () => {
    navigate("/albums")
  }

  const handleEdit = () => {
    setIsUpdateDialogOpen(true)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleToggleStatus = () => {
    if (album) {
      toggleStatus({ id: album.id })
    }
  }

  const handleToggleFeatured = () => {
    if (album) {
      toggleFeatured({ id: album.id })
    }
  }

  const handleDialogSuccess = () => {
    refetch()
  }

  const handleSongsChange = () => {
    refetch()
  }

  // Mock additional stats (in real app, these would come from API)
  const additionalStats = {
    total_plays: 125000,
    total_likes: 8500,
    total_downloads: 3200,
    average_rating: 4.7,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل تفاصيل الألبوم...</p>
        </div>
      </div>
    )
  }

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">الألبوم غير موجود</p>
          <Button variant="primary" onClick={handleBack} className="mt-4">
            العودة للألبومات
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Album Header */}
      <AlbumHeader
        album={album}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onToggleFeatured={handleToggleFeatured}
        isUpdating={isTogglingStatus || isTogglingFeatured}
      />

      {/* Album Stats */}
      <AlbumStats album={album} additionalStats={additionalStats} />

      {/* Album Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Album Builder */}
        <div className="lg:col-span-2">
          <AlbumBuilder albumId={album.id} onSongsChange={handleSongsChange} />
        </div>

        {/* Sidebar - Album Genres */}
        <div className="lg:col-span-1">
          <AlbumGenres album={album} onGenresUpdate={refetch} />
        </div>
      </div>

      {/* Dialogs */}
      <UpdateAlbumDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        album={album}
        onSuccess={handleDialogSuccess}
      />

      <DeleteAlbumDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        album={album}
        onSuccess={() => {
          handleDialogSuccess()
          navigate("/albums")
        }}
      />
    </div>
  )
}
