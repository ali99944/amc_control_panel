"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Save, RotateCcw } from "lucide-react"
import SectionForm from "./section-form"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { PrivacyPolicy } from "../../types/privacy_policy"
import { PrivacyPolicyFormData, privacyPolicyFormSchema } from "./privacy-policy-schema"

interface PrivacyPolicyFormProps {
  initialData?: PrivacyPolicy
  onSubmit: (data: PrivacyPolicyFormData) => void
  isLoading?: boolean
}

export default function PrivacyPolicyForm({ initialData, onSubmit, isLoading = false }: PrivacyPolicyFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    register,
  } = useForm<PrivacyPolicyFormData>({
    resolver: zodResolver(privacyPolicyFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      sections: initialData?.sections.map((section) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        points: section.points,
      })) || [
        {
          id: "1",
          title: "",
          description: "",
          points: [""],
        },
      ],
    },
  })

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  })

  const addSection = () => {
    appendSection({
      id: `${Date.now()}`,
      title: "",
      description: "",
      points: [""],
    })
  }

  const handleReset = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Policy Title */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">معلومات سياسة الخصوصية</h3>
        <Input
          {...register("title")}
          label="عنوان سياسة الخصوصية"
          placeholder="مثال: سياسة الخصوصية"
          error={errors.title?.message}
          required
        />
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">أقسام سياسة الخصوصية</h3>
          <Button type="button" variant="secondary" onClick={addSection} icon={Plus}>
            إضافة قسم جديد
          </Button>
        </div>

        {errors.sections?.message && <p className="text-sm text-red-600">{errors.sections.message}</p>}

        <div className="space-y-4">
          {sectionFields.map((field, index) => (
            <SectionForm
              key={field.id}
              control={control}
              sectionIndex={index}
              onRemove={() => removeSection(index)}
              errors={errors}
              canRemove={sectionFields.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 border-t border-gray-200 bg-white p-6 rounded-lg">
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          disabled={isLoading || !isDirty}
          icon={RotateCcw}
          className="flex-1"
        >
          إعادة تعيين
        </Button>
        <Button type="submit" variant="primary" loading={isLoading} disabled={!isDirty} icon={Save} className="flex-1">
          حفظ سياسة الخصوصية
        </Button>
      </div>
    </form>
  )
}
