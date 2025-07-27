"use client"

import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { playlistFormSchema, type PlaylistFormData } from "./playlist-form-schema"
import type { Playlist } from "../../types/playlist"
import { Input } from "../../components/ui/input"
import Button from "../../components/ui/button"
import ImagePicker from "../../components/ui/image-picker"
import PlaylistBuilder from "../../components/ui/playlist-builder"
import Switch from "../../components/ui/switch"
import Textarea from "../../components/ui/textarea"
import { Song } from "../../types/song"
import Select from "../../components/ui/select"

interface PlaylistFormProps {
  initialData?: Playlist
  availableSongs?: Song[]
  initialSongs?: Song[]
  onSubmit: (data: PlaylistFormData & { cover_image?: File }) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export default function PlaylistForm({
  initialData,
  availableSongs = [],
  initialSongs = [],
  onSubmit,
  isLoading = false,
  submitText = "حفظ",
  cancelText = "إلغاء",
  onCancel,
}: PlaylistFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      is_public: initialData?.is_public ?? true,
      song_ids: initialSongs.map(song => song.id) || [],
      source: 'editorial',
    },
  })

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null)
  const [selectedSongs, setSelectedSongs] = React.useState<Song[]>(initialSongs)

  const handlePlaylistChange = (songs: Song[]) => {
    setSelectedSongs(songs)
    setValue("song_ids", songs.map(song => song.id))
  }

  const handleFormSubmit: SubmitHandler<PlaylistFormData> = (data) => {
    onSubmit({
      ...data,
      ...(selectedImage && { cover_image: selectedImage }),
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Info Section */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">معلومات قائمة التشغيل</h4>
        
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="اسم قائمة التشغيل"
              placeholder="مثال: أغاني الصباح، موسيقى الاسترخاء..."
              error={errors.name?.message}
              required
            />
          )}
        />

        {/* Description Field */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="الوصف"
              rows={4}
              placeholder="وصف مختصر عن قائمة التشغيل ونوع الموسيقى..."
              error={errors.description?.message}
            />
          )}
        />

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف</label>
          <ImagePicker
            onChange={(file) => setSelectedImage(file as File)}
            multiple={false}
            maxSize={5}
            placeholder="اختر صورة غلاف لقائمة التشغيل"
            showPreview
            showFileInfo
          />
          {initialData?.cover_image && !selectedImage && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">الصورة الحالية:</p>
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={initialData.cover_image || "/placeholder.svg"}
                  alt="Current cover"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Public Switch */}
        <div>
          <Controller
            name="is_public"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                label="قائمة تشغيل عامة"
                description="السماح للمستخدمين الآخرين برؤية هذه القائمة"
                color="success"
              />
            )}
          />
        </div>
      </div>

{/* Source Selection */}
<div>
  <Controller
    name="source"
    control={control}
    render={({ field }) => (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">مصدر قائمة التشغيل</label>
        <Select
          {...field}
          options={[
            {
              label: "تحريري",
              value: "editorial"
            },
            {
              label: "محتوي نظام",
              value: "curated"
            },
            {
              label: "ترند",
              value: "trending"
            },
          ]}
        />
        {errors.source && (
          <p className="text-sm text-red-600">{errors.source.message}</p>
        )}
      </div>
    )}
  />
</div>

      {/* Songs Selection Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-gray-900">اختيار الأغاني</h4>
          <div className="text-sm text-gray-500">
            {selectedSongs.length} أغنية مختارة
          </div>
        </div>
        
        <Controller
          name="song_ids"
          control={control}
          render={() => (
            <div>
              <PlaylistBuilder
                availableSongs={availableSongs}
                initialSongs={selectedSongs}
                onPlaylistChange={handlePlaylistChange}
              />
              {errors.song_ids && (
                <p className="text-sm text-red-600 mt-2">{errors.song_ids.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading} className="flex-1">
            {cancelText}
          </Button>
        )}
        <Button type="submit" variant="primary" loading={isLoading} className="flex-1">
          {submitText}
        </Button>
      </div>
    </form>
  )
}
