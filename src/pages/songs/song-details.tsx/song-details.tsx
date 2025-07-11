"use client"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Music } from "lucide-react"
import Button from "../../../components/ui/button"
import ConfirmationDialog from "../../../components/ui/confirmation-dialog"
import DangerDialog from "../../../components/ui/danger-dialog"
import { Input } from "../../../components/ui/input"
import { useArtists } from "../../../hooks/use-artists"
import { useAudioPlayer } from "../../../hooks/use-audio-player"
import { useGenres } from "../../../hooks/use-genres"
import { useNotifications } from "../../../hooks/use-notification"
import { useSong, useUpdateSong, useGenerateSongVersion, useDeleteSongVersion } from "../../../hooks/use-songs"
import { SongVersion } from "../../../types/song"
import { shareContent, downloadFile } from "../../../utils/share-utils"
import AudioVersionsCard from "./audio-versions"
import DescriptionCard from "./description-card"
import LyricsCard from "./lyrics-card"
import SongHeader from "./song-header"
import SongInfoCard from "./song-info-card"
import { getApiError } from "../../../lib/error_handler"
import { AxiosError } from "axios"

export default function SongDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const songId = Number.parseInt(id as string)
  const { notify } = useNotifications()

  // Audio player hook
  const { isPlaying, currentTime, duration, togglePlayback, seek } = useAudioPlayer()

  // Dialog states
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [isDeleteVersionDialogOpen, setIsDeleteVersionDialogOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<SongVersion | null>(null)
  const [generateForm, setGenerateForm] = useState({
    bitrate: 128,
    suffix: "mp3_128",
  })

  // Fetch data
  const { data: song, isLoading, refetch } = useSong(songId)
  const { data: artists = [] } = useArtists()
  const { data: genres = [] } = useGenres()

  // Mutations
  const { mutate: updateSong, isPending: isUpdating } = useUpdateSong(song?.id, () => {
    refetch()
  })

  const { mutate: generateVersion, isPending: isGenerating } = useGenerateSongVersion(() => {
    refetch()
    setIsGenerateDialogOpen(false)
    notify.success("تم إنشاء النسخة بنجاح")
  })

  const { mutate: deleteVersion, isPending: isDeleting } = useDeleteSongVersion(() => {
    refetch()
    setIsDeleteVersionDialogOpen(false)
    notify.success("تم حذف النسخة بنجاح")
  })

  // Handlers
  const handleUpdateSong = (data: FormData) => {
    updateSong(data)
  }

  const handleSaveDescription = (description: string) => {
    const formData = new FormData()
    formData.append("id", song!.id.toString())
    formData.append("description", description)
    updateSong(formData)
  }

  const handleSaveLyrics = (lyrics: string) => {
    const formData = new FormData()
    formData.append("id", song!.id.toString())
    formData.append("lyrics", lyrics)
    updateSong(formData)
  }

  const handleShare = async () => {
    if (!song) return

    const shareData = {
      title: song.title,
      text: `استمع إلى أغنية "${song.title}" للفنان ${song.artist?.name}`,
      url: window.location.href,
    }

    const success = await shareContent(shareData)
    if (success) {
      notify.success("تم نسخ رابط المشاركة")
    } else {
      notify.error("فشل في مشاركة الأغنية")
    }
  }

  const handleDownload = async () => {
    if (!song?.original_audio?.file_url) return

    try {
      await downloadFile(song.original_audio.file_url, `${song.title}.${song.original_audio.format}`)
      notify.success("تم بدء التحميل")
    } catch (error) {
      const errorObject = getApiError(error as AxiosError)
      notify.error(errorObject.message)
    }
  }
  

  const handlePlayVersion = (version: SongVersion) => {
    console.log(version);
    
    notify.info("تشغيل النسخة المحددة")
  }

  const handleDownloadVersion = async (version: SongVersion) => {
    try {
      await downloadFile(version.file_url, `${song!.title}_${version.quality}.${version.format}`)
      notify.success("تم بدء التحميل")
    } catch (error) {
      console.log(error);
      
      notify.error("فشل في تحميل النسخة")
    }
  }

  const handleGenerateVersion = () => {
    generateVersion({
      song_id: song!.id,
      bitrate: generateForm.bitrate,
      suffix: generateForm.suffix,
    })
  }

  const handleDeleteVersion = () => {
    if (!selectedVersion) return
    deleteVersion({ id: selectedVersion.id })
  }

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

  return (
    <div className="space-y-6">
      <SongHeader title={song.title} onBack={() => navigate("/songs")} />

      <SongInfoCard
        song={song}
        artists={artists}
        genres={genres}
        isUpdating={isUpdating}
        onUpdateSong={handleUpdateSong}
        onPlay={togglePlayback}
        onShare={handleShare}
        onDownload={handleDownload}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onSeek={seek}
      />

      <DescriptionCard description={song.description || ""} isUpdating={isUpdating} onSave={handleSaveDescription} />

      <LyricsCard lyrics={song.lyrics || ""} isUpdating={isUpdating} onSave={handleSaveLyrics} />

      <AudioVersionsCard
        song={song}
        onGenerateVersion={() => setIsGenerateDialogOpen(true)}
        onDeleteVersion={(version) => {
          setSelectedVersion(version)
          setIsDeleteVersionDialogOpen(true)
        }}
        onPlayVersion={handlePlayVersion}
        onDownloadVersion={handleDownloadVersion}
      />

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
        message="هل أنت متأكد من حذف هذه النسخة؟ هذا الإجراء لا يمكن التراجع عنه."
        confirmText="حذف"
        loading={isDeleting}
      />
    </div>
  )
}
