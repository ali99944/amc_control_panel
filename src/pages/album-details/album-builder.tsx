/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Plus, Search, X, Music, Play, GripVertical, Trash2, Filter } from 'lucide-react'
import { useAlbumBuilder } from "../../hooks/use-album-builder"
import { useArtists } from "../../hooks/use-artists"
import { useGenres } from "../../hooks/use-genres"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import Select from "../../components/ui/select"

interface AlbumBuilderProps {
  albumId: number
  onSongsChange?: () => void
}

export default function AlbumBuilder({ albumId, onSongsChange }: AlbumBuilderProps) {
  const [isAddingMode, setIsAddingMode] = useState(false)
  const [selectedSongs, setSelectedSongs] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const { data: artists = [] } = useArtists()
  const { data: genres = [] } = useGenres()

  const {
    state,
    addSongs,
    removeSongs,
    reorderAlbumTracks,
    updateSearch,
    updateFilters,
    isAdding,
    isRemoving,
  } = useAlbumBuilder(albumId)

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAddSelectedSongs = () => {
    if (selectedSongs.length > 0) {
      addSongs(selectedSongs)
      setSelectedSongs([])
      setIsAddingMode(false)
      onSongsChange?.()
    }
  }

  const handleRemoveSong = (songId: number) => {
    removeSongs([songId])
    onSongsChange?.()
  }

  const handleSongSelection = (songId: number) => {
    setSelectedSongs(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    )
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(state.selectedSongs)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const tracks = items.map((song, index) => ({
      song_id: song.id,
      track_number: index + 1,
    }))

    reorderAlbumTracks(tracks)
  }

  const totalDuration = state.selectedSongs.reduce((acc, song) => acc + song.duration, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">أغاني الألبوم</h3>
          <p className="text-sm text-gray-600">
            {state.selectedSongs.length} أغنية • {formatDuration(totalDuration)}
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsAddingMode(true)}
          disabled={isAdding || isRemoving}
        >
          إضافة أغاني
        </Button>
      </div>

      {/* Album Songs List */}
      <Card>
        {state.selectedSongs.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">لا توجد أغاني في الألبوم</p>
            <Button variant="primary" onClick={() => setIsAddingMode(true)}>
              إضافة أغاني
            </Button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="album-songs">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {state.selectedSongs.map((song, index) => (
                    <Draggable key={song.id} draggableId={song.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center gap-4 p-4 bg-gray-50 rounded-lg transition-all ${
                            snapshot.isDragging ? "shadow-lg bg-white" : "hover:bg-gray-100"
                          }`}
                        >
                          <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>
                          
                          <div className="w-8 text-sm text-gray-500 font-medium">
                            {(song.track_number || index + 1).toString().padStart(2, "0")}
                          </div>

                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {song.cover_image ? (
                              <img
                                src={song.cover_image || "/placeholder.svg"}
                                alt={song.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Music className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{song.title}</h4>
                            <p className="text-sm text-gray-600">{song.artist.name}</p>
                          </div>

                          {song.genre && (
                            <div className="flex items-center gap-1">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: song.genre.color }}
                              />
                              <span className="text-xs text-gray-600">{song.genre.name}</span>
                            </div>
                          )}

                          <div className="text-sm text-gray-600 font-mono">
                            {formatDuration(song.duration)}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="secondary" disabled>
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleRemoveSong(song.id)}
                              disabled={isRemoving}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Card>

      {/* Add Songs Modal */}
      {isAddingMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">إضافة أغاني للألبوم</h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setIsAddingMode(false)
                  setSelectedSongs([])
                }}
                icon={X}
              >
                إغلاق
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="البحث في الأغاني..."
                    value={state.searchQuery}
                    onChange={(e) => updateSearch(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setShowFilters(!showFilters)}
                  icon={Filter}
                >
                  فلاتر
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    value={state.filterArtist?.toString() || ""}
                    onChange={(value) => updateFilters(value ? Number.parseInt(value) : null, state.filterGenre)}
                    options={[
                      { label: "جميع الفنانين", value: "" },
                      ...artists.map((artist) => ({
                        label: artist.name,
                        value: artist.id.toString(),
                      })),
                    ]}
                  />
                  <Select
                    value={state.filterGenre?.toString() || ""}
                    onChange={(value) => updateFilters(state.filterArtist, value ? Number.parseInt(value) : null)}
                    options={[
                      { label: "جميع الأنواع", value: "" },
                      ...genres.map((genre) => ({
                        label: genre.name,
                        value: genre.id.toString(),
                      })),
                    ]}
                  />
                </div>
              )}
            </div>

            {/* Available Songs */}
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {state.availableSongs.length === 0 ? (
                <div className="text-center py-8">
                  <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد أغاني متاحة للإضافة</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {state.availableSongs.map((song) => (
                    <div
                      key={song.id}
                      className={`flex items-center gap-4 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedSongs.includes(song.id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSongSelection(song.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSongs.includes(song.id)}
                        onChange={() => handleSongSelection(song.id)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />

                      <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {song.cover_image ? (
                          <img
                            src={song.cover_image || "/placeholder.svg"}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{song.title}</h4>
                        <p className="text-sm text-gray-600">{song.artist.name}</p>
                      </div>

                      {song.genre && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: song.genre.color }}
                          />
                          <span className="text-xs text-gray-600">{song.genre.name}</span>
                        </div>
                      )}

                      <div className="text-sm text-gray-600 font-mono">
                        {formatDuration(song.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {selectedSongs.length} أغنية محددة
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsAddingMode(false)
                    setSelectedSongs([])
                  }}
                >
                  إلغاء
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddSelectedSongs}
                  disabled={selectedSongs.length === 0 || isAdding}
                  loading={isAdding}
                >
                  إضافة {selectedSongs.length > 0 && `(${selectedSongs.length})`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
