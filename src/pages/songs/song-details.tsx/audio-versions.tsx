"use client"
import { Plus, FileAudio, Download, Trash2 } from "lucide-react"
import Button from "../../../components/ui/button"
import Card from "../../../components/ui/card"
import { Song, SongVersion } from "../../../types/song"
import { formatDate } from "../../../lib/date"

interface AudioVersionsCardProps {
  song: Song
  onGenerateVersion: () => void
  onDeleteVersion: (version: SongVersion) => void
  onDownloadVersion: (version: SongVersion) => void
}

export default function AudioVersionsCard({
  song,
  onGenerateVersion,
  onDeleteVersion,
  onDownloadVersion,
}: AudioVersionsCardProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-primary">نسخ الأغنية</h3>
        <Button variant="primary" size="sm" onClick={onGenerateVersion}>
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
                  <span>{song?.original_audio?.format?.toUpperCase()}</span>
                  <span>{song?.original_audio?.bitrate} kbps</span>
                  <span>{formatFileSize(song?.original_audio?.filesize ?? 0)}</span>
                  <span>{formatTime(song?.original_audio?.duration ?? 0)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">

              <Button
                size="sm"
                variant="secondary"
                onClick={() => onDownloadVersion(song?.original_audio as unknown as SongVersion)}
              >
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
                    <span>{formatFileSize(version.file_size)}</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(version.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => onDownloadVersion(version)}>
                  <Download className="w-4 h-4" />
                  تحميل
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDeleteVersion(version)}>
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
  )
}
