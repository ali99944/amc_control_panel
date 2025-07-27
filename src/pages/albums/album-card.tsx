"use client"
import { Music, Calendar, User, Star, Eye, EyeOff, Edit, Trash2, MoreVertical } from "lucide-react"
import { useState } from "react"
import { Album } from "../../types/album"
import Card from "../../components/ui/card"
import Button from "../../components/ui/button"
import { formatDate } from "../../lib/date"
import { getStorageFile } from "../../lib/storage"

interface AlbumCardProps {
  album: Album
  onEdit: (album: Album) => void
  onDelete: (album: Album) => void
  onToggleStatus: (album: Album) => void
  onToggleFeatured: (album: Album) => void
  onView?: (album: Album) => void
}

export default function AlbumCard({
  album,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
  onView,
}: AlbumCardProps) {
  const [showActions, setShowActions] = useState(false)

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
    <Card className="relative group transition-shadow duration-200">
      {/* Actions Menu */}
      <div className="absolute top-4 left-4 z-10">
        <div className="relative">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowActions(!showActions)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>

          {showActions && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px] z-20">
              {onView && (
                <button
                  onClick={() => {
                    onView(album)
                    setShowActions(false)
                  }}
                  className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  عرض التفاصيل
                </button>
              )}
              <button
                onClick={() => {
                  onEdit(album)
                  setShowActions(false)
                }}
                className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                تعديل
              </button>
              <button
                onClick={() => {
                  onToggleStatus(album)
                  setShowActions(false)
                }}
                className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                {album.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {album.is_active ? "إلغاء التفعيل" : "تفعيل"}
              </button>
              <button
                onClick={() => {
                  onToggleFeatured(album)
                  setShowActions(false)
                }}
                className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Star className={`w-4 h-4 ${album.is_featured ? "text-yellow-500" : ""}`} />
                {album.is_featured ? "إلغاء الإبراز" : "إبراز"}
              </button>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  onDelete(album)
                  setShowActions(false)
                }}
                className="w-full text-right px-3 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Badges */}
      <div className="absolute top-4 right-4 flex gap-2">
        {album.is_featured && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            مميز
          </span>
        )}
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            album.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {album.is_active ? "نشط" : "غير نشط"}
        </span>
      </div>

      {/* Album Image */}
      <div className="w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        {album.image ? (
          <img src={getStorageFile(album.image) || "/placeholder.svg"} alt={album.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* Album Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{album.name}</h3>
          {album.description && <p className="text-sm text-gray-600 line-clamp-2 mt-1">{album.description}</p>}
        </div>

        {/* Artist */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{album.artist?.name || "فنان غير معروف"}</span>
        </div>

        {/* Album Type */}
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {getAlbumTypeLabel(album.album_type)}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Music className="w-4 h-4" />
            <span>{album.songs_count} أغنية</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(album.release_date)}</span>
          </div>
        </div>

        {/* Duration */}
        {album.total_duration && (
          <div className="text-sm text-gray-600">المدة الإجمالية: {formatDuration(album.total_duration)}</div>
        )}

        {/* Additional Info */}
        <div className="space-y-1 text-xs text-gray-500">
          {album.record_label && <div>شركة الإنتاج: {album.record_label}</div>}
          {album.producer && <div>المنتج: {album.producer}</div>}
        </div>
      </div>

      {/* Click overlay to close actions menu */}
      {showActions && <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />}
    </Card>
  )
}
