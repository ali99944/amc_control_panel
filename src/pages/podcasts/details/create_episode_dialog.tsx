"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Button from "../../../components/ui/button"
import Dialog from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import Switch from "../../../components/ui/switch"
import Textarea from "../../../components/ui/textarea"


const episodeFormSchema = z.object({
  title: z.string().min(1, "عنوان الحلقة مطلوب").max(200, "العنوان طويل جداً"),
  description: z.string().min(1, "وصف الحلقة مطلوب").max(1000, "الوصف طويل جداً"),
  episode_number: z.number().min(1, "رقم الحلقة يجب أن يكون أكبر من 0"),
  season_number: z.number().optional(),
  is_published: z.boolean(),
})

type EpisodeFormData = z.infer<typeof episodeFormSchema>

interface CreateEpisodeDialogProps {
  isOpen: boolean
  onClose: () => void
  podcastId: number
  onSuccess?: () => void
}

export default function CreateEpisodeDialog({ isOpen, onClose, podcastId, onSuccess }: CreateEpisodeDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      episode_number: 1,
      season_number: 1,
      is_published: false,
    },
  })

  const handleFormSubmit = async (data: EpisodeFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Creating episode:", { ...data, podcastId, audioFile })

      reset()
      setAudioFile(null)
      onClose()
      onSuccess?.()
    } catch (error) {
      console.error("Error creating episode:", error)
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

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إضافة حلقة جديدة" size="lg">
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

        {/* Audio File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ملف الصوت</label>
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
                  <p className="font-medium">اضغط لرفع ملف الصوت</p>
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
              label="نشر الحلقة فوراً"
              description="إذا تم تفعيل هذا الخيار، ستكون الحلقة متاحة للمستمعين فوراً"
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
            إضافة الحلقة
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
