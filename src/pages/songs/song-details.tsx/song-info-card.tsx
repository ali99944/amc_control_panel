"use client"
import { useState } from "react"
import { Music, User, Tag, Calendar, Clock, Play, Pause, Heart, Share2, Download, Edit, Save, X } from 'lucide-react'
import Button from "../../../components/ui/button"
import Card from "../../../components/ui/card"
import Select from "../../../components/ui/select"
import { formatDate } from "../../../lib/date"
import { getStorageFile } from "../../../lib/storage"
import { Genre } from "../../../types"
import { Artist } from "../../../types/artist"
import { Song } from "../../../types/song"
import AudioPlayer from "./audio-player"


interface SongInfoCardProps {
  song: Song
  artists: Artist[]
  genres: Genre[]
  isUpdating: boolean
  onUpdateSong: (data: FormData) => void
  onPlay: () => void
  onShare: () => void
  onDownload: () => void
  isPlaying: boolean
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

export default function SongInfoCard({
  song,
  artists,
  genres,
  isUpdating,
  onUpdateSong,
  onPlay,
  onShare,
  onDownload,
  isPlaying,
  currentTime,
  duration,
  onSeek,
}: SongInfoCardProps) {
  const [isEditingDetails, setIsEditingDetails] = useState(false)
  const [selectedArtistId, setSelectedArtistId] = useState<number>(song.artist?.id || 0)
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(song.genre?.id)

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const saveDetails = () => {
    const formData = new FormData()
    formData.append("id", song.id.toString())
    formData.append("artist_id", selectedArtistId.toString())
    if (selectedGenreId) formData.append("genre_id", selectedGenreId.toString())
    onUpdateSong(formData)
    setIsEditingDetails(false)
  }

  return (
    <Card>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cover Image */}
        <div className="flex-shrink-0">
          <div className="w-48 h-48 bg-gray-100 rounded-xl overflow-hidden">
            {song.cover_image ? (
              <img
                src={getStorageFile(song.cover_image) || "/placeholder.svg"}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Song Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              {song.title}
              {song.explicit && (
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded font-medium">صريح</span>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {isEditingDetails ? (
                  <Select
                    value={selectedArtistId?.toString()}
                    onChange={(value) => setSelectedArtistId(Number.parseInt(value))}
                    options={artists.map((artist) => ({
                      label: artist.name,
                      value: artist.id.toString(),
                    }))}
                  />
                ) : (
                  <span>{song.artist?.name ?? "فنان غير معروف"}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {isEditingDetails ? (
                  <Select
                    value={selectedGenreId?.toString()}
                    onChange={(value) => setSelectedGenreId(Number.parseInt(value))}
                    options={genres.map((genre) => ({
                      label: genre.name,
                      value: genre.id.toString(),
                    }))}
                  />
                ) : (
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: song.genre?.color ?? "#000" }} />
                    {song.genre?.name ?? "تصنيف غير محدد"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(song.release_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(song?.original_audio?.duration ?? 0)}</span>
              </div>
            </div>
          </div>

          {/* Edit Details Button */}
          <div className="flex items-center gap-2">
            {isEditingDetails ? (
              <>
                <Button size="sm" variant="primary" onClick={saveDetails} loading={isUpdating}>
                  <Save className="w-4 h-4" />
                  حفظ
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setIsEditingDetails(false)}>
                  <X className="w-4 h-4" />
                  إلغاء
                </Button>
              </>
            ) : (
              <Button size="sm" variant="secondary" onClick={() => setIsEditingDetails(true)}>
                <Edit className="w-4 h-4" />
                تعديل التفاصيل
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              {song.plays_count} تشغيل
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {song.likes_count ?? 0} إعجاب
            </div>
            <div className="flex items-center gap-1">
              <Music className="w-4 h-4" />
              المسار #{song.track_number ?? "TRACK-SONG-12457"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={onPlay}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "إيقاف" : "تشغيل"}
            </Button>
            <Button variant="secondary" onClick={onShare}>
              <Share2 className="w-4 h-4" />
              مشاركة
            </Button>
            <Button variant="secondary" onClick={onDownload}>
              <Download className="w-4 h-4" />
              تحميل
            </Button>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      <div className="mt-6">
        <AudioPlayer
          src={getStorageFile(song?.original_audio?.file_url    ) ?? ""}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onPlay={onPlay}
          onSeek={onSeek}
        />
      </div>
    </Card>
  )
}
