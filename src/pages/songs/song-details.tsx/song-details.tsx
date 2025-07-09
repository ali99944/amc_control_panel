"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Play,
  Pause,
  Heart,
  Share2,
  Download,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Music,
  Clock,
  FileAudio,
  Calendar,
  User,
  Tag,
} from "lucide-react"
import Button from "../../../components/ui/button"
import Card from "../../../components/ui/card"
import ConfirmationDialog from "../../../components/ui/confirmation-dialog"
import DangerDialog from "../../../components/ui/danger-dialog"
import { Input } from "../../../components/ui/input"
import Textarea from "../../../components/ui/textarea"
import Toolbar from "../../../components/ui/toolbar"
import { useArtists } from "../../../hooks/use-artists"
import { useGenres } from "../../../hooks/use-genres"
import { useSong, useUpdateSong, useGenerateSongVersion, useDeleteSongVersion } from "../../../hooks/use-songs"
import { SongVersion } from "../../../types/song"
import { useNavigate, useParams } from "react-router-dom"
import Select from "../../../components/ui/select"
import { formatDate } from "../../../lib/date"


export default function SongDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const songId = Number.parseInt(id as string)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isEditingLyrics, setIsEditingLyrics] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isEditingDetails, setIsEditingDetails] = useState(false)
  const [lyrics, setLyrics] = useState("")
  const [description, setDescription] = useState("")
  const [selectedArtistId, setSelectedArtistId] = useState<number>(0)
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined)
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [isDeleteVersionDialogOpen, setIsDeleteVersionDialogOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<SongVersion | null>(null)
  const [generateForm, setGenerateForm] = useState({
    bitrate: 128,
    suffix: "mp3_128",
  })

  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch data
  const { data: song, isLoading, refetch } = useSong(songId)
  const { data: artists = [] } = useArtists()
  const { data: genres = [] } = useGenres()

  // Mutations
  const { mutate: updateSong, isPending: isUpdating } = useUpdateSong(song?.id, () => {
    refetch()
    setIsEditingLyrics(false)
    setIsEditingDescription(false)
    setIsEditingDetails(false)
  })

  const { mutate: generateVersion, isPending: isGenerating } = useGenerateSongVersion(() => {
    refetch()
    setIsGenerateDialogOpen(false)
  })

  const { mutate: deleteVersion, isPending: isDeleting } = useDeleteSongVersion(() => {
    refetch()
    setIsDeleteVersionDialogOpen(false)
  })

  // Initialize form data when song loads
  useEffect(() => {
    if (song) {
      setLyrics(song.lyrics || "")
      setDescription(song.description || "")
      setSelectedArtistId(song.artist.id)
      setSelectedGenreId(song.genre?.id)
    }
  }, [song])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل تفاصيل الأغنية...</p>
        </div>
      </div>
    )
  }

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">الأغنية غير موجودة</p>
          <Button variant="primary" onClick={() => navigate("/songs")} className="mt-4">
            العودة للأغاني
          </Button>
        </div>
      </div>
    )
  }

  // Audio controls
  const togglePlayback = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  // Format time helper
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Format file size helper
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Save lyrics
  const saveLyrics = () => {
    const formData = new FormData()
    formData.append("id", song.id.toString())
    formData.append("lyrics", lyrics)
    updateSong(formData)
  }

  // Save description
  const saveDescription = () => {
    const formData = new FormData()
    formData.append("id", song.id.toString())
    formData.append("description", description)
    updateSong(formData)
  }

  // Save details (artist/genre)
  const saveDetails = () => {
    const formData = new FormData()
    formData.append("id", song.id.toString())
    formData.append("artist_id", selectedArtistId.toString())
    if(selectedGenreId) formData.append("genre_id", selectedGenreId?.toString())
    updateSong(formData)
  }

  // Generate new version
  const handleGenerateVersion = () => {
    generateVersion({
      song_id: song.id,
      bitrate: generateForm.bitrate,
      suffix: generateForm.suffix,
    })
  }

  // Delete version
  const handleDeleteVersion = () => {
    if (!selectedVersion) return
    deleteVersion({ id: selectedVersion.id })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Toolbar title={song.title}>
        <div className="flex items-center gap-2">
          <Button variant="primary-inverted" icon={ArrowLeft} onClick={() => navigate("/songs")}>
            العودة للأغاني
          </Button>
        </div>
      </Toolbar>

      {/* Song Info Card */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-gray-100 rounded-xl overflow-hidden">
              {song.cover_image ? (
                <img
                  src={song.cover_image || "/placeholder.svg"}
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
                      value={selectedArtistId.toString()}
                      onChange={(e) => setSelectedArtistId(Number.parseInt(e))}
                      options={artists.map(artist => {
                        return {
                            label: artist.name,
                            value: artist.id.toString()
                        }
                      })}
                    />
                  ) : (
                    <span>{song.artist.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {isEditingDetails ? (
                    <select
                      value={selectedGenreId}
                      onChange={(e) => setSelectedGenreId(+e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: song.genre?.color ?? '#000' }} />
                      {song.genre?.name ?? 'تصنيف غير محدد'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(song.release_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(song?.audio?.duration ?? 0)}</span>
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
                المسار #{song.track_number ?? 'TRACK-SONG-12457'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="primary" onClick={togglePlayback}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "إيقاف" : "تشغيل"}
              </Button>

              <Button variant="secondary">
                <Share2 className="w-4 h-4" />
                مشاركة
              </Button>
              <Button variant="secondary">
                <Download className="w-4 h-4" />
                تحميل
              </Button>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <audio
            ref={audioRef}
            src={song?.audio?.file_url ?? ''}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="flex items-center gap-4">
            <Button size="sm" variant="secondary" onClick={togglePlayback}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Description Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary">وصف الأغنية</h3>
          {isEditingDescription ? (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="primary" onClick={saveDescription} loading={isUpdating}>
                <Save className="w-4 h-4" />
                حفظ
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsEditingDescription(false)}>
                <X className="w-4 h-4" />
                إلغاء
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setIsEditingDescription(true)}>
              <Edit className="w-4 h-4" />
              تعديل
            </Button>
          )}
        </div>

        {isEditingDescription ? (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="اكتب وصفاً للأغنية..."
            className="w-full bg-primary/10"
          />
        ) : (
          <div className="text-gray-700">
            {song.description ? (
              <p className="whitespace-pre-wrap">{song.description}</p>
            ) : (
              <p className="text-gray-500 italic">لا يوجد وصف للأغنية</p>
            )}
          </div>
        )}
      </Card>

      {/* Lyrics Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary">كلمات الأغنية</h3>
          {isEditingLyrics ? (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="primary" onClick={saveLyrics} loading={isUpdating}>
                <Save className="w-4 h-4" />
                حفظ
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsEditingLyrics(false)}>
                <X className="w-4 h-4" />
                إلغاء
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setIsEditingLyrics(true)}>
              <Edit className="w-4 h-4" />
              تعديل
            </Button>
          )}
        </div>

        {isEditingLyrics ? (
          <Textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows={12}
            placeholder="اكتب كلمات الأغنية هنا..."
            className="w-full bg-primary/10"
          />
        ) : (
          <div className="text-gray-700">
            {song.lyrics ? (
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">{song.lyrics}</pre>
            ) : (
              <p className="text-gray-500 italic">لا توجد كلمات للأغنية</p>
            )}
          </div>
        )}
      </Card>

      {/* Audio Versions Card */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-primary">نسخ الأغنية</h3>
          <Button variant="primary" size="sm" onClick={() => setIsGenerateDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            إنشاء نسخة جديدة
          </Button>
        </div>

        <div className="space-y-4">
          {/* Original Audio */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <FileAudio className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">النسخة الأصلية</h4>
                  <div className="text-sm text-gray-600 flex items-center gap-4">
                    <span>{song?.audio?.format?.toUpperCase()}</span>
                    <span>{song?.audio?.bitrate} kbps</span>
                    <span>{formatFileSize(song?.audio?.filesize ?? 0)}</span>
                    <span>{formatTime(song?.audio?.duration ?? 0)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary">
                  <Play className="w-4 h-4" />
                  تشغيل
                </Button>
                <Button size="sm" variant="secondary">
                  <Download className="w-4 h-4" />
                  تحميل
                </Button>
              </div>
            </div>
          </div>

          {/* Generated Versions */}
          {(song?.versions ?? []).map((version) => (
            <div key={version.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                    <FileAudio className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{version.quality}</h4>
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <span>{version.format.toUpperCase()}</span>
                      <span>{version.bitrate} kbps</span>
                      <span>{formatFileSize(version.filesize)}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(version.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Play className="w-4 h-4" />
                    تشغيل
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="w-4 h-4" />
                    تحميل
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      setSelectedVersion(version)
                      setIsDeleteVersionDialogOpen(true)
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {(song?.versions ?? []).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileAudio className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>لا توجد نسخ إضافية</p>
              <p className="text-sm mt-1">يمكنك إنشاء نسخ بجودات مختلفة</p>
            </div>
          )}
        </div>
      </Card>

      {/* Generate Version Dialog */}
      <ConfirmationDialog
        isOpen={isGenerateDialogOpen}
        onClose={() => setIsGenerateDialogOpen(false)}
        onConfirm={handleGenerateVersion}
        title="إنشاء نسخة جديدة"
        confirmText="إنشاء"
        loading={isGenerating}
        variant="success"
        message={
          <div className="space-y-4">
            <p>إنشاء نسخة جديدة من الأغنية بجودة مختلفة</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">معدل البت (kbps)</label>
                <Input
                  type="number"
                  value={generateForm.bitrate}
                  onChange={(e) =>
                    setGenerateForm({ ...generateForm, bitrate: Number.parseInt(e.target.value) || 128 })
                  }
                  placeholder="128"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اللاحقة</label>
                <Input
                  value={generateForm.suffix}
                  onChange={(e) => setGenerateForm({ ...generateForm, suffix: e.target.value })}
                  placeholder="mp3_128"
                />
              </div>
            </div>
          </div>
        }
      />

      {/* Delete Version Dialog */}
      <DangerDialog
        isOpen={isDeleteVersionDialogOpen}
        onClose={() => setIsDeleteVersionDialogOpen(false)}
        onConfirm={handleDeleteVersion}
        title="حذف النسخة"
        message={`هل أنت متأكد من حذف هذه النسخة؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        loading={isDeleting}
      />
    </div>
  )
}
