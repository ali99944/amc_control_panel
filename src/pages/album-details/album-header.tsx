"use client"
import { ArrowLeft, Edit, Star, Eye, EyeOff, Trash2, Music, Calendar, User, Clock } from 'lucide-react'
import type { Album } from "../../types/album"
import Button from '../../components/ui/button'
import Toolbar from '../../components/ui/toolbar'
import { formatDate } from '../../lib/date'
import { getStorageFile } from '../../lib/storage'

interface AlbumHeaderProps {
  album: Album
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onToggleStatus: () => void
  onToggleFeatured: () => void
  isUpdating?: boolean
}

export default function AlbumHeader({
  album,
  onBack,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
  isUpdating = false,
}: AlbumHeaderProps) {
  const getAlbumTypeLabel = (type: Album["album_type"]) => {
    switch (type) {
      case "Single":
        return "أغنية منفردة"
      case "EP":
        return "EP"
      case "Album":
        return "ألبوم"
      case "Compilation":
        return "مجموعة"
      default:
        return type
    }
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}س ${minutes}د`
    }
    return `${minutes}د`
  }

  return (
    <div className="space-y-4">
      <Toolbar title="تفاصيل الألبوم">
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onEdit} icon={Edit} disabled={isUpdating}>
            تعديل
          </Button>
          <Button
            variant={album.is_featured ? "secondary" : "primary"}
            onClick={onToggleFeatured}
            icon={Star}
            disabled={isUpdating}
          >
            {album.is_featured ? "إلغاء الإبراز" : "إبراز"}
          </Button>
          <Button
            variant={album.is_active ? "secondary" : "primary"}
            onClick={onToggleStatus}
            icon={album.is_active ? EyeOff : Eye}
            disabled={isUpdating}
          >
            {album.is_active ? "إلغاء التفعيل" : "تفعيل"}
          </Button>
          <Button variant="danger" onClick={onDelete} icon={Trash2} disabled={isUpdating}>
            حذف
          </Button>
          <Button variant="primary-inverted" icon={ArrowLeft} onClick={onBack}>
            العودة للألبومات
          </Button>
        </div>
      </Toolbar>

      {/* Album Info Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Album Cover */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-gray-100 rounded-xl overflow-hidden">
              {album.image ? (
                <img
                  src={getStorageFile(album.image) || "/placeholder.svg"}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Album Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
                {album.name}
                {album.is_featured && <Star className="w-6 h-6 text-yellow-500" />}
              </h1>
              {album.description && (
                <p className="text-gray-600 leading-relaxed">{album.description}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{album.artist?.name || "فنان غير معروف"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(album.release_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>{album.songs_count} أغنية</span>
              </div>
              {album.total_duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(album.total_duration)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {getAlbumTypeLabel(album.album_type)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  album.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {album.is_active ? "نشط" : "غير نشط"}
              </span>
            </div>

            {/* Additional Info */}
            {(album.record_label || album.producer) && (
              <div className="space-y-2 text-sm text-gray-600">
                {album.record_label && (
                  <div>
                    <span className="font-medium">شركة الإنتاج:</span> {album.record_label}
                  </div>
                )}
                {album.producer && (
                  <div>
                    <span className="font-medium">المنتج:</span> {album.producer}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
