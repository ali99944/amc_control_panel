"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Button from "../../../components/ui/button"
import Dialog from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import Switch from "../../../components/ui/switch"
import Textarea from "../../../components/ui/textarea"
import { PodcastEpisode } from "../../../types/podcast"

const episodeFormSchema = z.object({
  title: z.string().min(1, "عنوان الحلقة مطلوب").max(200, "العنوان طويل جداً"),
  description: z.string().min(1, "وصف الحلقة مطلوب").max(1000, "الوصف طويل جداً"),
  episode_number: z.number().min(1, "رقم الحلقة يجب أن يكون أكبر من 0"),
  season_number: z.number().optional(),
  is_published: z.boolean(),
})

type EpisodeFormData = z.infer<typeof episodeFormSchema>

interface UpdateEpisodeDialogProps {
  isOpen: boolean
  onClose: () => void
  episode: PodcastEpisode | null
  onSuccess?: () => void
}

export default function UpdateEpisodeDialog({ isOpen, onClose, episode, onSuccess }: UpdateEpisodeDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeFormSchema),
  })

  useEffect(() => {
    if (episode) {
      reset({
        title: episode.title,
        description: episode.description,
        episode_number: episode.episode_number,
        season_number: episode.season_number || undefined,
        is_published: episode.is_published,
      })
    }
  }, [episode, reset])

  const handleFormSubmit = async (data: EpisodeFormData) => {
    if (!episode) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Updating episode:", { ...data, episodeId: episode.id, audioFile })

      setAudioFile(null)
      onClose()
      onSuccess?.()
    } catch (error) {
      console.error("Error updating episode:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  if (!episode) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تعديل الحلقة" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Episode Title */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="عنوان الحلقة"
              placeholder="مثال: الذكاء الاصطناعي في المستقبل"
              error={errors.title?.message}
              required
            />
          )}
        />

        {/* Episode Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="وصف الحلقة"
              rows={4}
              placeholder="وصف مفصل عن محتوى الحلقة..."
              error={errors.description?.message}
              required
            />
          )}
        />

        {/* Episode Numbers */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="episode_number"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                label="رقم الحلقة"
                placeholder="1"
                error={errors.episode_number?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
                required
              />
            )}
          />

          <Controller
            name="season_number"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                label="رقم الموسم (اختياري)"
                placeholder="1"
                error={errors.season_number?.message}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            )}
          />
        </div>

        {/* Current Audio File Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الملف الصوتي الحالي</label>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">الملف: {episode.audio_file}</p>
            <p className="text-sm text-gray-600">المدة: {Math.floor(episode.duration / 60)} دقيقة</p>
          </div>
        </div>

        {/* New Audio File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">استبدال الملف الصوتي (اختياري)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioFileChange}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center justify-center text-center"
            >
              {audioFile ? (
                <div className="text-green-600">
                  <p className="font-medium">{audioFile.name}</p>
                  <p className="text-sm text-gray-500">{(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-gray-500">
                  <p className="font-medium">اضغط لرفع ملف صوتي جديد</p>
                  <p className="text-sm">MP3, WAV, M4A (حد أقصى 100MB)</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Publish Toggle */}
        <Controller
          name="is_published"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={field.onChange}
              label="نشر الحلقة"
              description="إذا تم تفعيل هذا الخيار، ستكون الحلقة متاحة للمستمعين"
              color="success"
            />
          )}
        />

        {/* Form Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" variant="primary" loading={isLoading} className="flex-1">
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
