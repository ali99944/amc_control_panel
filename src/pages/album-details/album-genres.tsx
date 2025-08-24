"use client"
import { useState } from "react"
import { Plus, X, Tag } from "lucide-react"
import { useGenres } from "../../hooks/use-genres"
import type { Album } from "../../types/album"
import Card from "../../components/ui/card"
import Button from "../../components/ui/button"
import { Select } from "../../components/ui/select"

interface AlbumGenresProps {
  album: Album
  onGenresUpdate?: () => void
}

export default function AlbumGenres({ album, onGenresUpdate }: AlbumGenresProps) {
  const [isAddingGenre, setIsAddingGenre] = useState(false)
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0)

  const { data: allGenres = [] } = useGenres()

  // Get available genres (not already in album)
  const albumGenreIds = album.genres?.map((ag) => ag.genre.id) || []
  const availableGenres = allGenres.filter((genre) => !albumGenreIds.includes(genre.id))

  const handleAddGenre = () => {
    if (selectedGenreId > 0) {
      // API call to add genre to album
      console.log("Adding genre", selectedGenreId, "to album", album.id)
      setIsAddingGenre(false)
      setSelectedGenreId(0)
      onGenresUpdate?.()
    }
  }

  const handleRemoveGenre = (genreId: number) => {
    // API call to remove genre from album
    console.log("Removing genre", genreId, "from album", album.id)
    onGenresUpdate?.()
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          أنواع الألبوم
        </h3>
        {availableGenres.length > 0 && (
          <Button variant="secondary" size="sm" icon={Plus} onClick={() => setIsAddingGenre(true)}>
            إضافة نوع
          </Button>
        )}
      </div>

      {/* Current Genres */}
      <div className="space-y-3">
        {album.genres && album.genres.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {album.genres.map((albumGenre) => (
              <div
                key={albumGenre.id}
                className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200"
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: albumGenre.genre.color }} />
                <span className="text-sm font-medium text-gray-900">{albumGenre.genre.name}</span>
                <button
                  onClick={() => handleRemoveGenre(albumGenre.genre.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Tag className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">لا توجد أنواع مضافة للألبوم</p>
          </div>
        )}

        {/* Add Genre Form */}
        {isAddingGenre && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Select
                  value={selectedGenreId.toString()}
                  onChange={(value) => setSelectedGenreId(Number.parseInt(value as string))}
                  options={[
                    { label: "اختر نوع موسيقي", value: "0" },
                    ...availableGenres.map((genre) => ({
                      label: genre.name,
                      value: genre.id.toString(),
                    })),
                  ]}
                />
              </div>
              <Button variant="primary" size="sm" onClick={handleAddGenre} disabled={selectedGenreId === 0}>
                إضافة
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setIsAddingGenre(false)
                  setSelectedGenreId(0)
                }}
              >
                إلغاء
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
