"use client"
import { useState } from "react"
import { Edit, Save, X } from "lucide-react"
import Button from "../../../components/ui/button"
import Card from "../../../components/ui/card"
import LyricsEditor from "../../../components/ui/lyrics-editor"


interface LyricsCardProps {
  lyrics: string
  isUpdating: boolean
  onSave: (lyrics: string) => void
}

export default function LyricsCard({ lyrics, isUpdating, onSave }: LyricsCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedLyrics, setEditedLyrics] = useState(lyrics)

  const handleSave = () => {
    onSave(editedLyrics)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedLyrics(lyrics)
    setIsEditing(false)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary">كلمات الأغنية</h3>
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
        <LyricsEditor  onChange={setEditedLyrics} placeholder="اكتب كلمات الأغنية هنا..." />
      ) : (
        <div className="text-gray-700">
          {lyrics ? (
            <pre className="whitespace-pre-wrap font-sans leading-relaxed">{lyrics}</pre>
          ) : (
            <p className="text-gray-500 italic">لا توجد كلمات للأغنية</p>
          )}
        </div>
      )}
    </Card>
  )
}
