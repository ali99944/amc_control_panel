"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tagFormSchema, type TagFormData } from "./tag-form-schema"
import { Tag } from "../../types/tag"
import { Input } from "../../components/ui/input"
import Button from "../../components/ui/button"
import Textarea from "../../components/ui/textarea"


interface TagFormProps {
  initialData?: Tag
  onSubmit: (data: TagFormData) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export default function TagForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = "حفظ",
  cancelText = "إلغاء",
  onCancel,
}: TagFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TagFormData>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Tag Name */}
      <Input
        {...register("name")}
        label="اسم التاغ"
        placeholder="مثال: روك، بوب، كلاسيكي..."
        error={errors.name?.message}
        required
      />

      {/* Tag Description */}
      <Textarea
        {...register("description")}
        label="الوصف"
        rows={3}
        placeholder="وصف مختصر عن التاغ ونوع الموسيقى التي يمثلها..."
        error={errors.description?.message}
      />

      {/* Form Actions */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading} className="flex-1">
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
