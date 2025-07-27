"use client"
import { Music, Clock, Star, TrendingUp, Play } from "lucide-react"
import type { Album } from "../../types/album"
import Card from "../../components/ui/card"

interface AlbumStatsProps {
  album: Album
  additionalStats?: {
    total_plays?: number
    total_likes?: number
    total_downloads?: number
    average_rating?: number
  }
}

export default function AlbumStats({ album, additionalStats }: AlbumStatsProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}س ${minutes}د`
    }
    return `${minutes}د`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}م`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}ك`
    }
    return num.toString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-600">عدد الأغاني</p>
            <p className="text-lg font-bold text-primary">{album.songs_count}</p>
          </div>
        </div>
      </Card>

      {album.total_duration && (
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">المدة الإجمالية</p>
              <p className="text-lg font-bold text-blue-600">{formatDuration(album.total_duration)}</p>
            </div>
          </div>
        </Card>
      )}

      {additionalStats?.total_plays && (
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي التشغيلات</p>
              <p className="text-lg font-bold text-green-600">{formatNumber(additionalStats.total_plays)}</p>
            </div>
          </div>
        </Card>
      )}

      {additionalStats?.total_likes && (
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الإعجابات</p>
              <p className="text-lg font-bold text-primary">{formatNumber(additionalStats.total_likes)}</p>
            </div>
          </div>
        </Card>
      )}

      {additionalStats?.average_rating && (
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">متوسط التقييم</p>
              <p className="text-lg font-bold text-primary">{additionalStats.average_rating.toFixed(1)}/5</p>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-600">عدد الأنواع</p>
            <p className="text-lg font-bold text-primary">{album.genres_count}</p>
          </div>
        </div>
      </Card>

      {album.is_featured && (
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">الحالة</p>
              <p className="text-lg font-bold text-yellow-600">مميز</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
