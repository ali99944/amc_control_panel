"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { genreFormSchema, type GenreFormData } from "./genre-form-schema"
import Button from "../../components/ui/button"
import ColorPicker from "../../components/ui/color-picker"
import ImagePicker from "../../components/ui/image-picker"
import { Input } from "../../components/ui/input"
import Switch from "../../components/ui/switch"
import Textarea from "../../components/ui/textarea"
import { getStorageFile } from "../../lib/storage"
import { Genre } from "../../types"

interface GenreFormProps {
  initialData?: Genre
  onSubmit: (data: GenreFormData & { image?: File }) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export default function GenreForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = "حفظ",
  cancelText = "إلغاء",
  onCancel,
}: GenreFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GenreFormData>({
    resolver: zodResolver(genreFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      color: initialData?.color || "#3b82f6",
      is_active: initialData?.is_active ?? true,
    },
  })

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null)

  const handleFormSubmit = (data: GenreFormData) => {
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
            label="اسم النوع الموسيقي"
            placeholder="مثال: روك، بوب، كلاسيكي..."
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
            rows={5}
            placeholder="وصف مختصر عن النوع الموسيقي..."
            error={errors.description?.message}
          />
        )}
      />

      {/* Color and Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">اللون المميز</label>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorPicker value={field.value || "#3b82f6"} onChange={field.onChange} showPresets showInput />
            )}
          />
          {errors.color && <p className="text-sm text-red-600 mt-1">{errors.color.message}</p>}
        </div>

        {/* Active Switch */}
        <div className="flex items-start flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                label="نشط"
                description="هل تريد تفعيل هذا النوع الموسيقي؟"
              />
            )}
          />
        </div>
      </div>

      {/* Image Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">صورة النوع الموسيقي</label>
        <ImagePicker
          onChange={(file) => setSelectedImage(file as File)}
          multiple={false}
          maxSize={2}
          placeholder="اختر صورة تمثل النوع الموسيقي"
          showPreview
          showFileInfo
        />
        {initialData?.image && !selectedImage && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">الصورة الحالية:</p>
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={getStorageFile(initialData.image) || "/placeholder.svg"}
                alt="Current genre"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
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
