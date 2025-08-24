"use client"
import Toolbar from '../../../components/ui/toolbar'
import Button from '../../../components/ui/button'


interface SongHeaderProps {
  title: string
  onBack: () => void
}

export default function SongHeader({ title, onBack }: SongHeaderProps) {
  return (
    <Toolbar title={title}>
      <div className="flex items-center gap-2">
        <Button variant="primary-inverted" onClick={onBack}>
          العودة للأغاني
        </Button>
      </div>
    </Toolbar>
  )
}
