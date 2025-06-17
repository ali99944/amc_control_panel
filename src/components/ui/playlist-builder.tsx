/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Search, Plus, X, Music, Play, Grip } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import Song from "../../types/song"



interface PlaylistBuilderProps {
  availableSongs?: Song[]
  initialSongs?: Song[]
  onPlaylistChange?: (songs: Song[]) => void
  className?: string
}

const mockAvailableSongs: Song[] = [
  {
    id: 1,
    title: "أغنية رائعة",
    artist: null,
    album: "ألبوم الذكريات",
    duration: "4:32",
  },
  {
    id: 2,
    title: "لحن الحياة",
    artist: null,
    album: "الأصالة",
    duration: "6:15",
  },
  {
    id: 3,
    title: "موسيقى هادئة",
    artist: null,
    duration: "3:28",
  },
  {
    id: 4,
    title: "أغنية حديثة",
    artist: null,
    album: "العصر الجديد",
    duration: "3:45",
  },
  {
    id: 5,
    title: "لحن قديم",
    artist: null,
    album: "التراث",
    duration: "5:20",
  },
]

export default function PlaylistBuilder({
  availableSongs = mockAvailableSongs,
  initialSongs = [],
  onPlaylistChange,
  className = "",
}: PlaylistBuilderProps) {
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(initialSongs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(availableSongs)

  useEffect(() => {
    const filtered = availableSongs.filter(
      (song) =>
        (song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //   song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.album?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !playlistSongs.some((ps) => ps.id === song.id),
    )
    setFilteredSongs(filtered)
  }, [searchTerm, availableSongs, playlistSongs])

  useEffect(() => {
    onPlaylistChange?.(playlistSongs)
  }, [playlistSongs, onPlaylistChange])

  const addSongToPlaylist = (song: Song) => {
    setPlaylistSongs([...playlistSongs, song])
  }

  const removeSongFromPlaylist = (songId: number) => {
    setPlaylistSongs(playlistSongs.filter((song) => song.id !== songId))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === "available" && destination.droppableId === "playlist") {
      const song = filteredSongs[source.index]
      addSongToPlaylist(song)
    } else if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const items = Array.from(playlistSongs)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)
      setPlaylistSongs(items)
    }
  }

  const getTotalDuration = () => {
    const totalSeconds = playlistSongs.reduce((acc, song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number)
      return acc + minutes * 60 + seconds
    }, 0)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${className}`}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Available Songs */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">الأغاني المتاحة</h3>
            <span className="text-sm text-gray-500">{filteredSongs.length} أغنية</span>
          </div>

          <div className="relative mb-4">
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الأغاني..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Droppable droppableId="available">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 max-h-96 overflow-y-auto ${
                  snapshot.isDraggingOver ? "bg-primary/5 rounded-lg" : ""
                }`}
              >
                {filteredSongs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                          snapshot.isDragging ? "rotate-2 scale-105" : ""
                        }`}
                      >
                        <Grip size={16} className="text-gray-400" />
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <Music size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{song.title}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {song.artist?.name} {song.album && `• ${song.album}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{song.duration}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              addSongToPlaylist(song)
                            }}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {filteredSongs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Music size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>لا توجد أغاني متاحة</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>

        {/* Playlist */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">قائمة التشغيل</h3>
            <div className="text-sm text-gray-500">
              {playlistSongs.length} أغنية • {getTotalDuration()}
            </div>
          </div>

          <Droppable droppableId="playlist">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 max-h-96 overflow-y-auto min-h-32 ${
                  snapshot.isDraggingOver ? "bg-primary/5 rounded-lg" : ""
                }`}
              >
                {playlistSongs.map((song, index) => (
                  <Draggable key={song.id} draggableId={`playlist-${song.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${
                          snapshot.isDragging ? "rotate-2 scale-105" : ""
                        }`}
                      >
                        <Grip size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-500 w-6">{index + 1}</span>
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <Music size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{song.title}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {song.artist?.name} {song.album && `• ${song.album}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{song.duration}</span>
                          <button
                            onClick={() => console.log("Play", song.id)}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Play size={16} />
                          </button>
                          <button
                            onClick={() => removeSongFromPlaylist(song.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {playlistSongs.length === 0 && (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <Music size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>اسحب الأغاني هنا لإنشاء قائمة التشغيل</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}
