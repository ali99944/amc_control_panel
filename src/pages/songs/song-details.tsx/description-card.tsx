"use client"
import { useState } from "react"
import { Edit, Save, X } from "lucide-react"
import Button from "../../../components/ui/button"
import Card from "../../../components/ui/card"
import Textarea from "../../../components/ui/textarea"


interface DescriptionCardProps {
  description: string
  isUpdating: boolean
  onSave: (description: string) => void
}

export default function DescriptionCard({ description, isUpdating, onSave }: DescriptionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleSave = () => {
    onSave(editedDescription)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedDescription(description)
    setIsEditing(false)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary">وصف الأغنية</h3>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="primary" onClick={handleSave} loading={isUpdating}>
              <Save className="w-4 h-4" />
              حفظ
            </Button>
            <Button size="sm" variant="secondary" onClick={handleCancel}>
              <X className="w-4 h-4" />
              إلغاء
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4" />
            تعديل
          </Button>
        )}
      </div>
      {isEditing ? (
        <Textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          rows={10}
          placeholder="اكتب وصفاً للأغنية..."
          className="w-full bg-primary/10"
        />
      ) : (
        <div className="text-gray-700">
          {description ? (
            <p className="whitespace-pre-wrap">{description}</p>
          ) : (
            <p className="text-gray-500 italic">لا يوجد وصف للأغنية</p>
          )}
        </div>
      )}
    </Card>
  )
}
