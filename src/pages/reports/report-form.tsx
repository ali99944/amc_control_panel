"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { reportFormSchema, type ReportFormData } from "./report-form-schema"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Textarea from "../../components/ui/textarea"
import { Checkbox } from "../../components/ui/checkbox"

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
    watch,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "users",
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
      metrics: [],
      format: "pdf",
      include_charts: true,
    },
  })

  const selectedType = watch("type")

  const reportTypes = [
    { value: "users", label: "تقرير المستخدمين", description: "إحصائيات وبيانات المستخدمين" },
    { value: "content", label: "تقرير المحتوى", description: "إحصائيات الأغاني والفنانين والألبومات" },
    { value: "engagement", label: "تقرير التفاعل", description: "مؤشرات التشغيل والاستماع" },
  ]

  const getMetricsByType = (type: string) => {
    switch (type) {
      case "users":
        return [
          { value: "total_users", label: "إجمالي المستخدمين" },
          { value: "active_users", label: "المستخدمين النشطين" },
          { value: "new_users", label: "المستخدمين الجدد" },
          { value: "user_retention", label: "معدل الاحتفاظ بالمستخدمين" },
          { value: "user_demographics", label: "التركيبة السكانية" },
        ]
      case "content":
        return [
          { value: "total_songs", label: "إجمالي الأغاني" },
          { value: "total_artists", label: "إجمالي الفنانين" },
          { value: "total_playlists", label: "إجمالي قوائم التشغيل" },
          { value: "content_growth", label: "نمو المحتوى" },
          { value: "popular_content", label: "المحتوى الأكثر شعبية" },
        ]
      case "engagement":
        return [
          { value: "total_plays", label: "إجمالي التشغيلات" },
          { value: "listening_hours", label: "ساعات الاستماع" },
          { value: "session_duration", label: "مدة الجلسات" },
          { value: "user_engagement", label: "تفاعل المستخدمين" },
          { value: "popular_times", label: "أوقات الذروة" },
        ]

      default:
        return []
    }
  }

  const formatOptions = [
    { value: "pdf", label: "PDF", description: "ملف PDF قابل للطباعة" },
    { value: "excel", label: "Excel", description: "جدول بيانات Excel" },
    { value: "csv", label: "CSV", description: "ملف CSV للبيانات الخام" },
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
              <Input
                {...field}
                type="date"
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
              <Input
                {...field}
                type="date"
                label="تاريخ النهاية"
                error={errors.date_range?.end_date?.message}
                required
              />
            )}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">المؤشرات المطلوبة</h4>
        <Controller
          name="metrics"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              {getMetricsByType(selectedType).map((metric) => (
                <label key={metric.value} className="flex items-center gap-x-2">
                  <Checkbox
                    value={metric.value}
                    checked={field.value.includes(metric.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, metric.value])
                      } else {
                        field.onChange(field.value.filter((v) => v !== metric.value))
                      }
                    }}
                  />
                  <span className="text-sm text-gray-700">{metric.label}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.metrics && <p className="text-sm text-red-600">{errors.metrics.message}</p>}
      </div>

      {/* Format and Options */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">صيغة التقرير والخيارات</h4>
        
        <Controller
          name="format"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">صيغة الملف</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {formatOptions.map((format) => (
                  <label
                    key={format.value}
                    className={`relative flex cursor-pointer rounded-lg border p-3 focus:outline-none ${
                      field.value === format.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={format.value}
                      checked={field.value === format.value}
                      onChange={field.onChange}
                      className="sr-only"
                    />
                    <div className="flex flex-1 flex-col">
                      <span className="block text-sm font-medium text-gray-900">{format.label}</span>
                      <span className="block text-xs text-gray-500">{format.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        />

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
