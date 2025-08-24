"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { songFormSchema, type SongFormData } from "./song-form-schema"
import { useArtists } from "../../hooks/use-artists"
import { useGenres } from "../../hooks/use-genres"
import type { Song } from "../../types/song"
import { Input } from "../../components/ui/input"
import AudioPicker from "../../components/ui/audio-picker"
import Button from "../../components/ui/button"
import DatePicker from "../../components/ui/date-picker"
import ImagePicker from "../../components/ui/image-picker"
import Switch from "../../components/ui/switch"
import Textarea from "../../components/ui/textarea"
import { Select } from "../../components/ui/select"
import LyricsEditor from "../../components/ui/lyrics-editor"
import { formatDate } from "../../lib/date"

interface SongFormProps {
  initialData?: Song
  onSubmit: (data: SongFormData & { cover_image?: File; audio_file?: File }) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export default function SongForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = "حفظ",
  cancelText = "إلغاء",
  onCancel,
}: SongFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SongFormData>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      artist_id: initialData?.artist?.id.toString(),
      genre_id: initialData?.genre?.id.toString(),
      release_date: initialData?.release_date || "",
      explicit: initialData?.explicit || false,
      lyrics: initialData?.lyrics || "",
      description: initialData?.description || "",
    },
  })

  const [selectedCoverImage, setSelectedCoverImage] = React.useState<File | null>(null)
  const [selectedAudioFile, setSelectedAudioFile] = React.useState<File | null>(null)

  // Fetch artists and genres
  const { data: artists = [] } = useArtists()
  const { data: genres = [] } = useGenres()

  const handleFormSubmit = (data: SongFormData) => {
    onSubmit({
      ...data,
      ...(selectedCoverImage && { cover_image: selectedCoverImage }),
      ...(selectedAudioFile && { audio_file: selectedAudioFile }),
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title Field */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="عنوان الأغنية"
            placeholder="مثال: أغنية جميلة، موسيقى رائعة..."
            error={errors.title?.message}
            required
          />
        )}
      />

      {/* Artist and Genre Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Artist Select */}
        <Controller
          name="artist_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="الفنان"
              // error={errors.artist_id?.message}
              options={
                artists.filter(artist => artist.is_active)
                .map(artist => {
                  return {
                    label: artist.name,
                    value: artist.id.toString()
                  }
                })
              }
            />
          )}
        />

        {/* Genre Select */}
        <Controller
          name="genre_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="النوع الموسيقي"
              // error={errors.genre_id?.message}
              options={
                genres.filter(genre => genre.is_active)
                .map(genre => {
                  return {
                    label: genre.name,
                    value: genre.id.toString()
                  }
                })
              }
            />
          )}
        />
      </div>

      {/* Release Date and Track Number Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Release Date */}
        <Controller
          name="release_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? formatDate(field.value) : undefined}
              onChange={(date) => {;
                field.onChange(formatDate(date))
              }}
              label="تاريخ الإصدار"
              placeholder="اختر تاريخ الإصدار"
              error={errors.release_date?.message}
              required
            />
          )}
        />

      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">غلاف الأغنية</label>
        <ImagePicker
          onChange={(file) => setSelectedCoverImage(file as File)}
          multiple={false}
          maxSize={5}
          placeholder="اختر صورة غلاف للأغنية"
          showPreview
          showFileInfo
        />
        {initialData?.cover_image && !selectedCoverImage && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">الغلاف الحالي:</p>
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

      {/* Audio File */}
      {!initialData && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الملف الصوتي <span className="text-red-500">*</span>
          </label>
          <AudioPicker
            onChange={(file) => setSelectedAudioFile(file as File)}
            multiple={false}
            maxSize={100}
            placeholder="اختر الملف الصوتي للأغنية"
            showPreview
            showFileInfo
          />
        </div>
      )}

      {/* Explicit Content Switch */}
      <div className="flex ">
        <Controller
          name="explicit"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={field.onChange}
              label="محتوى صريح"
              description="هل تحتوي الأغنية على محتوى صريح أو كلمات غير مناسبة؟"
            />
          )}
        />
      </div>

      {/* Lyrics */}
      <Controller
        name="lyrics"
        control={control}
        render={({ field }) => (
          <LyricsEditor
            initialLyrics={field.value}
            audioFile={selectedAudioFile}
            onChange={(lyrics) => field.onChange(lyrics)}
            label="كلمات الأغنية"
            placeholder="اكتب كلمات الأغنية هنا..."
            error={errors.lyrics?.message}
          />
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="وصف الأغنية"
            rows={4}
            placeholder="وصف مختصر عن الأغنية، قصتها، أو معناها..."
            error={errors.description?.message}
          />
        )}
      />

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
