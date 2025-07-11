"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { reportFormSchema, type ReportFormData } from "./report-form-schema"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Textarea from "../../components/ui/textarea"
import DatePicker from "../../components/ui/date-picker"

interface ReportFormProps {
  onSubmit: (data: ReportFormData) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export default function ReportForm({
  onSubmit,
  isLoading = false,
  submitText = "إنشاء التقرير",
  cancelText = "إلغاء",
  onCancel,
}: ReportFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "user_report",
      date_range: {
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
      },
      filters: {
        user_types: [],
        content_types: [],
        genres: [],
        artists: [],
      },
    },
  })


  const reportTypes = [
    { value: "user_report", label: "تقرير المستخدمين", description: "إحصائيات وبيانات المستخدمين" },
    { value: "content_report", label: "تقرير المحتوى", description: "إحصائيات الأغاني والفنانين والألبومات" },
    { value: "engagement_report", label: "تقرير التفاعل", description: "مؤشرات التشغيل والاستماع" },
  ]


  const handleFormSubmit = (data: ReportFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">معلومات التقرير</h4>

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="عنوان التقرير"
              placeholder="مثال: تقرير المستخدمين الشهري - يناير 2024"
              error={errors.title?.message}
              required
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="الوصف"
              rows={3}
              placeholder="وصف مختصر عن محتوى التقرير والغرض منه..."
              error={errors.description?.message}
            />
          )}
        />
      </div>

      {/* Report Type */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">نوع التقرير</h4>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((type) => (
                <label
                  key={type.value}
                  className={`relative flex cursor-pointer rounded-lg border p-2 focus:outline-none ${
                    field.value === type.value
                      ? "border-primary/40 bg-primary/10"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    value={type.value}
                    checked={field.value === type.value}
                    onChange={field.onChange}
                    className="sr-only"
                  />
                  <div className="flex flex-1">
                    <div className="flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">{type.label}</span>
                      <span className="block text-sm text-gray-500">{type.description}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.type && <p className="text-sm text-red-600">{errors.type.message}</p>}
      </div>

      {/* Date Range */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">الفترة الزمنية</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="date_range.start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="تاريخ البداية"
                error={errors.date_range?.start_date?.message}
                required
              />
            )}
          />
          <Controller
            name="date_range.end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="تاريخ النهاية"
                error={errors.date_range?.end_date?.message}
                required
              />
            )}
          />
        </div>
      </div>



      {/* Form Actions */}
      <div className="flex gap-4">
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
