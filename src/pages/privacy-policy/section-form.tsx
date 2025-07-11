/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useFieldArray } from "react-hook-form"
import { Plus, Trash2, GripVertical } from "lucide-react"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import Textarea from "../../components/ui/textarea"
// import { PrivacyPolicyFormData } from "./privacy-policy-schema"


interface SectionFormProps {
//   control: Control<PrivacyPolicyFormData>
  control: any
  sectionIndex: number
  onRemove: () => void
  errors?: any
  canRemove?: boolean
}

export default function SectionForm({ control, sectionIndex, onRemove, errors, canRemove = true }: SectionFormProps) {
  const {
    fields: pointFields,
    append: appendPoint,
    remove: removePoint,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.points`,
    // name: `sections`,
  })

  const addPoint = () => {
    appendPoint({
        id: "",
        description: "",
        title: "",
        points: []
    })
  }

  const sectionErrors = errors?.sections?.[sectionIndex]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <h4 className="text-lg font-medium text-gray-900">القسم {sectionIndex + 1}</h4>
        </div>
        {canRemove && (
          <Button type="button" variant="danger" size="sm" onClick={onRemove} title="حذف القسم">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Section Title */}
        <Input
          {...control.register(`sections.${sectionIndex}.title`)}
          label="عنوان القسم"
          placeholder="مثال: المعلومات التي نجمعها"
          error={sectionErrors?.title?.message}
          required
        />

        {/* Section Description */}
        <Textarea
          {...control.register(`sections.${sectionIndex}.description`)}
          label="وصف القسم"
          rows={3}
          placeholder="وصف تفصيلي عن محتوى هذا القسم..."
          error={sectionErrors?.description?.message}
          required
        />

        {/* Section Points */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              النقاط <span className="text-red-500">*</span>
            </label>
            <Button type="button" variant="secondary" size="sm" onClick={addPoint} icon={Plus}>
              إضافة نقطة
            </Button>
          </div>

          <div className="space-y-3">
            {pointFields.map((field, pointIndex) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    {...control.register(`sections.${sectionIndex}.points.${pointIndex}`)}
                    placeholder={`النقطة ${pointIndex + 1}`}
                    error={sectionErrors?.points?.[pointIndex]?.message}
                  />
                </div>
                {pointFields.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removePoint(pointIndex)}
                    title="حذف النقطة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {sectionErrors?.points?.message && (
            <p className="text-sm text-red-600 mt-2">{sectionErrors.points.message}</p>
          )}
        </div>
      </div>
    </Card>
  )
}
