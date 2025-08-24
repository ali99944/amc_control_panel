"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import Button from "../../../components/ui/button"
import Dialog from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Select } from "../../../components/ui/select"
import Switch from "../../../components/ui/switch"
import Textarea from "../../../components/ui/textarea"
import { Podcast } from "../../../types/podcast"


interface PodcastSettingsFormData {
  title: string
  description: string
  language: string
  is_explicit: boolean
  is_active: boolean
  is_featured: boolean
}

interface PodcastSettingsDialogProps {
  isOpen: boolean
  onClose: () => void
  podcast: Podcast | null
  onSuccess?: () => void
}

export default function PodcastSettingsDialog({ isOpen, onClose, podcast, onSuccess }: PodcastSettingsDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [coverImage, setCoverImage] = useState<File | null>(null)

  const { control, handleSubmit, reset } = useForm<PodcastSettingsFormData>()

  useEffect(() => {
    if (podcast) {
      reset({
        title: podcast.title,
        description: podcast.description,
        language: podcast.language,
        is_explicit: podcast.is_explicit,
        is_active: podcast.is_active,
        is_featured: podcast.is_featured,
      })
    }
  }, [podcast, reset])

  const handleFormSubmit = async (data: PodcastSettingsFormData) => {
    if (!podcast) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Updating podcast settings:", { ...data, podcastId: podcast.id, coverImage })

      setCoverImage(null)
      onClose()
      onSuccess?.()
    } catch (error) {
      console.error("Error updating podcast settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCoverImage(file)
    }
  }

  if (!podcast) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إعدادات البودكاست" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">المعلومات الأساسية</h4>

          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} label="عنوان البودكاست" required />}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => <Textarea {...field} label="وصف البودكاست" rows={4} required />}
          />

          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="اللغة"
                options={[
                  { label: "العربية", value: "ar" },
                  { label: "الإنجليزية", value: "en" },
                ]}
              />
            )}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف</label>
          <div className="flex items-start gap-4">
            {/* Current Cover */}
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {podcast.cover_image ? (
                <img
                  src={podcast.cover_image || "/placeholder.svg"}
                  alt="Current cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs">لا توجد صورة</span>
                </div>
              )}
            </div>

            {/* Upload New Cover */}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
                id="cover-upload"
              />
              <label
                htmlFor="cover-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {coverImage ? "تم اختيار صورة جديدة" : "اختيار صورة جديدة"}
              </label>
              {coverImage && <p className="text-sm text-gray-500 mt-1">{coverImage.name}</p>}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">الإعدادات</h4>

          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                label="بودكاست نشط"
                description="إذا تم إلغاء التفعيل، لن يكون البودكاست متاحاً للمستمعين"
                color="success"
              />
            )}
          />

          <Controller
            name="is_featured"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                label="بودكاست مميز"
                description="سيظهر البودكاست في قسم المحتوى المميز"
                color="warning"
              />
            )}
          />

          <Controller
            name="is_explicit"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                label="محتوى صريح"
                description="يحتوي البودكاست على محتوى قد لا يناسب جميع الأعمار"
                color="danger"
              />
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} className="flex-1">
            إلغاء
          </Button>
          <Button type="submit" variant="primary" loading={isLoading} className="flex-1">
            حفظ الإعدادات
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
