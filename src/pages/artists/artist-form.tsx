"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { artistFormSchema, type ArtistFormData } from "./artist-form-schema"
import type { Artist } from "../../types/artist"
import { Input } from "../../components/ui/input"
import Button from "../../components/ui/button"
import ImagePicker from "../../components/ui/image-picker"
import Textarea from "../../components/ui/textarea"
import LabeledSwitch from "../../components/ui/labeled-switch"

interface ArtistFormProps {
  initialData?: Artist
  onSubmit: (data: ArtistFormData & { image?: File }) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export default function ArtistForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = "حفظ",
  cancelText = "إلغاء",
  onCancel,
}: ArtistFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      bio: initialData?.bio || "",
      is_featured: initialData?.is_featured ?? false,
      is_active: initialData?.is_active ?? true,
    },
  })

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null)

  const handleFormSubmit = (data: ArtistFormData) => {
    onSubmit({
      ...data,
      ...(selectedImage && { image: selectedImage }),
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Name Field */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="اسم الفنان"
            placeholder="مثال: محمد عبده، أم كلثوم، فيروز..."
            error={errors.name?.message}
            required
          />
        )}
      />

      {/* Bio Field */}
      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="السيرة الذاتية"
            rows={6}
            placeholder="نبذة عن الفنان، مسيرته الفنية، وأهم إنجازاته..."
            error={errors.bio?.message}
          />
        )}
      />

      {/* Image Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">صورة الفنان</label>
        <ImagePicker
          onChange={(file) => setSelectedImage(file as File)}
          multiple={false}
          maxSize={5}
          placeholder="اختر صورة للفنان"
          showPreview
          showFileInfo
        />
        {initialData?.image && !selectedImage && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">الصورة الحالية:</p>
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={initialData.image || "/placeholder.svg"}
                alt="Current artist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Switches */}
      <div className="gap-6 space-y-4">
        {/* Featured Switch */}
        <div>
          <Controller
            name="is_featured"
            control={control}
            render={({ field }) => (
              <LabeledSwitch
                checked={field.value}
                onChange={field.onChange}
                description="عرض الفنان في القسم المميز"
                title="فنان مميز"
              />
            )}
          />
        </div>

        {/* Active Switch */}
        <div>
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <LabeledSwitch
                checked={field.value}
                onChange={field.onChange}
                description="هل تريد تفعيل هذا الفنان؟"
                title="تفعيل الفنان؟"
              />
            )}
          />
        </div>
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
