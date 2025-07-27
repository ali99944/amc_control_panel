"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, X } from 'lucide-react'
import { albumFormSchema, type AlbumFormData } from "./album-form-schema"
import { useState } from "react"
import { Label } from "recharts"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Select from "../../components/ui/select"
import Switch from "../../components/ui/switch"
import Textarea from "../../components/ui/textarea"
import { useArtists } from "../../hooks/use-artists"
import { Album } from "../../types/album"

interface AlbumFormProps {
  initialData?: Album
  onSubmit: (data: AlbumFormData, image?: File) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export default function AlbumForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = "حفظ",
  cancelText = "إلغاء",
  onCancel,
}: AlbumFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  )

  const { data: artists = [] } = useArtists()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      artist_id: initialData?.artist_id,
      release_date: initialData?.release_date ? 
        new Date(initialData.release_date).toISOString().split('T')[0] : "",
      album_type: initialData?.album_type || "Album",
      is_active: initialData?.is_active,
      is_featured: initialData?.is_featured,
    },
  })

  const watchedValues = watch()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleFormSubmit = (data: AlbumFormData) => {
    onSubmit(data, selectedImage || undefined)
  }

  const albumTypeOptions = [
    { label: "أغنية منفردة", value: "Single" },
    { label: "EP", value: "EP" },
    { label: "ألبوم", value: "Album" },
    { label: "مجموعة", value: "Compilation" },
  ]

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Album Image */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          صورة الألبوم
        </Label>
        <div className="flex items-start gap-4">
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="معاينة الألبوم"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">اختر صورة</p>
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="album-image"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => document.getElementById('album-image')?.click()}
              >
                اختيار صورة
              </Button>
              {imagePreview && (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                  إزالة
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              الحد الأقصى: 5MB. الصيغ المدعومة: JPG, PNG, WebP
            </p>
          </div>
        </div>
      </div>

      {/* Album Name */}
      <Input
        {...register("name")}
        label="اسم الألبوم"
        placeholder="مثال: الألبوم الأول"
        error={errors.name?.message}
        required
      />

      {/* Description */}
      <Textarea
        {...register("description")}
        label="وصف الألبوم"
        rows={3}
        placeholder="وصف مختصر عن الألبوم..."
        error={errors.description?.message}
      />

      {/* Artist Selection */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          الفنان <span className="text-red-500">*</span>
        </Label>
        <Select
          value={watchedValues.artist_id?.toString()}
          onChange={(value) => setValue("artist_id", parseInt(value))}
          options={[
            { label: "اختر فنان", value: "0" },
            ...artists.map((artist) => ({
              label: artist.name,
              value: artist.id.toString(),
            })),
          ]}
          error={errors.artist_id?.message}
        />
      </div>

      {/* Album Type and Release Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            نوع الألبوم <span className="text-red-500">*</span>
          </Label>
          <Select
            value={watchedValues.album_type}
            onChange={(value) => setValue("album_type", value as Album['album_type'])}
            options={albumTypeOptions}
            error={errors.album_type?.message}
          />
        </div>

        <Input
          {...register("release_date")}
          type="date"
          error={errors.release_date?.message}
          required
        />
      </div>

      {/* Record Label and Producer */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          {...register("record_label")}
          label="شركة الإنتاج"
          placeholder="مثال: شركة الموسيقى العربية"
          error={errors.record_label?.message}
        />

        <Input
          {...register("producer")}
          label="المنتج"
          placeholder="مثال: أحمد المنتج"
          error={errors.producer?.message}
        />
      </div> */}

      {/* Status Switches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <Label className="font-medium text-gray-900">حالة النشر</Label>
            <p className="text-sm text-gray-600">
              تحديد ما إذا كان الألبوم مفعل ومرئي للمستخدمين
            </p>
          </div>
          <Switch
            checked={watchedValues.is_active}
            onChange={(checked) => setValue("is_active", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <Label className="font-medium text-gray-900">ألبوم مميز</Label>
            <p className="text-sm text-gray-600">
              عرض الألبوم في قسم الألبومات المميزة
            </p>
          </div>
          <Switch
            checked={watchedValues.is_featured}
            onChange={(checked) => setValue("is_featured", checked)}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={!isDirty && !initialData}
          className="flex-1"
        >
          {submitText}
        </Button>
      </div>
    </form>
  )
}
