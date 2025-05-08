"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetQuery, useMutationAction } from "../../hooks/queries-actions"
import { EditIcon, MusicIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react"


const Playlists = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  // Fetch playlists data
  const {
    data: playlists,
    isLoading,
    refetch,
  } = useGetQuery({
    key: ["playlists"],
    url: "/api/playlists",
    options: {
      enabled: false,
      initialData: [
        {
          id: 1,
          name: "Top Sudanese Hits",
          description: "The most popular Sudanese songs",
          createdBy: "Admin",
          createdAt: "2023-01-15",
          songCount: 12,
          coverImage: "/placeholder.svg?height=80&width=80",
          isPublic: true,
        },
        {
          id: 2,
          name: "Traditional Classics",
          description: "Classic traditional Sudanese music",
          createdBy: "Admin",
          createdAt: "2023-02-20",
          songCount: 8,
          coverImage: "/placeholder.svg?height=80&width=80",
          isPublic: true,
        },
        {
          id: 3,
          name: "Modern Fusion",
          description: "Modern fusion of Sudanese and Western music",
          createdBy: "Editor",
          createdAt: "2023-03-10",
          songCount: 15,
          coverImage: "/placeholder.svg?height=80&width=80",
          isPublic: true,
        },
        {
          id: 4,
          name: "Nubian Collection",
          description: "Collection of Nubian music",
          createdBy: "Admin",
          createdAt: "2023-04-05",
          songCount: 10,
          coverImage: "/placeholder.svg?height=80&width=80",
          isPublic: false,
        },
        {
          id: 5,
          name: "Folk Treasures",
          description: "Treasured folk music from Sudan",
          createdBy: "Editor",
          createdAt: "2023-05-12",
          songCount: 7,
          coverImage: "/placeholder.svg?height=80&width=80",
          isPublic: true,
        },
      ],
    },
  })

  // Delete playlist mutation
  const deleteMutation = useMutationAction({
    method: "delete",
    url: "/api/playlists",
    key: ["playlists"],
    onSuccessCallback: () => {
      refetch()
    },
  })

  const handleDeletePlaylist = (id: number) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      deleteMutation.mutate(id)
    }
  }

  // Filter and sort playlists
  const filteredPlaylists = playlists?.filter(
    (playlist) =>
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedPlaylists = [...(filteredPlaylists || [])].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "songs":
        return b.songCount - a.songCount
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Playlists Management</h1>
          <p className="text-gray-600">Manage all playlists in the system</p>
        </div>
        <Link
          to="/playlists/new"
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e0142d] transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create New Playlist
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search playlists..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="songs">Most Songs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Playlists Grid */}
      {isLoading ? (
        <div className="p-6 text-center bg-white rounded-lg border border-gray-200">Loading playlists...</div>
      ) : sortedPlaylists?.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg border border-gray-200">
          {searchTerm ? "No playlists match your search." : "No playlists found."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPlaylists?.map((playlist) => (
            <div key={playlist.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img
                      src={playlist.coverImage || "/placeholder.svg"}
                      alt={playlist.name}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{playlist.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{playlist.description}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="flex items-center">
                        <MusicIcon className="h-4 w-4 mr-1" />
                        {playlist.songCount} songs
                      </span>
                      <span className="mx-2">•</span>
                      <span>{new Date(playlist.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-1 flex items-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          playlist.isPublic ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {playlist.isPublic ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link to={`/playlists/${playlist.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    <EditIcon className="w-5 h-5" />
                    <span className="sr-only">Edit</span>
                  </Link>
                  <button onClick={() => handleDeletePlaylist(playlist.id)} className="text-red-600 hover:text-red-900">
                    <TrashIcon className="w-5 h-5" />
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Playlists

