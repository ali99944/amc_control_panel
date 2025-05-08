"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useGetQuery, useMutationAction } from "../../hooks/queries-actions"
import { MusicIcon, PlusIcon, SearchIcon, TrashIcon, UploadIcon } from "lucide-react"


const PlaylistEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNewPlaylist = id === "new"
  const pageTitle = isNewPlaylist ? "Create New Playlist" : "Edit Playlist"

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
    coverImage: null,
  })

  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSongs, setSelectedSongs] = useState([])

  // Fetch playlist data if editing
  const { data: playlist, isLoading: playlistLoading } = useGetQuery({
    key: ["playlist", id],
    url: `/api/playlists/${id}`,
    options: {
      enabled: !isNewPlaylist,
      initialData: isNewPlaylist
        ? null
        : {
            id: Number.parseInt(id),
            name: "Top Sudanese Hits",
            description: "The most popular Sudanese songs",
            createdBy: "Admin",
            createdAt: "2023-01-15",
            isPublic: true,
            coverImageUrl: "/placeholder.svg?height=200&width=200",
            songs: [
              { id: 1, title: "Salam Ya Sudan", artist: "Ali Media", duration: "3:45" },
              { id: 2, title: "Khartoum Nights", artist: "Sudanese Stars", duration: "4:12" },
              { id: 3, title: "Blue Nile", artist: "River Band", duration: "3:28" },
            ],
          },
    },
  })

  // Fetch all songs for selection
  const { data: allSongs } = useGetQuery({
    key: ["songs-list"],
    url: "/api/songs/list",
    options: {
      enabled: false,
      initialData: [
        { id: 1, title: "Salam Ya Sudan", artist: "Ali Media", duration: "3:45" },
        { id: 2, title: "Khartoum Nights", artist: "Sudanese Stars", duration: "4:12" },
        { id: 3, title: "Blue Nile", artist: "River Band", duration: "3:28" },
        { id: 4, title: "Desert Rose", artist: "Oasis Group", duration: "5:02" },
        { id: 5, title: "Nubian Dreams", artist: "Ancient Sounds", duration: "4:35" },
        { id: 6, title: "City Lights", artist: "Urban Beats", duration: "3:55" },
        { id: 7, title: "Sahara Wind", artist: "Desert Nomads", duration: "4:48" },
        { id: 8, title: "Moonlight Serenade", artist: "Night Owls", duration: "6:10" },
        { id: 9, title: "River Dance", artist: "Water Spirits", duration: "3:22" },
        { id: 10, title: "Urban Tales", artist: "City Dwellers", duration: "3:15" },
      ],
    },
  })

  // Set form data when playlist data is loaded
  useEffect(() => {
    if (playlist && !isNewPlaylist) {
      setFormData({
        name: playlist.name || "",
        description: playlist.description || "",
        isPublic: playlist.isPublic !== undefined ? playlist.isPublic : true,
        coverImage: null,
      })

      if (playlist.coverImageUrl) {
        setImagePreview(playlist.coverImageUrl)
      }

      if (playlist.songs) {
        setSelectedSongs(playlist.songs)
      }
    }
  }, [playlist, isNewPlaylist])

  // Create/Update mutations
  const createMutation = useMutationAction({
    method: "post",
    url: "/api/playlists",
    key: ["playlists"],
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      navigate("/playlists")
    },
  })

  const updateMutation = useMutationAction({
    method: "put",
    url: `/api/playlists/${id}`,
    key: ["playlists"],
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      navigate("/playlists")
    },
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target

    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))

      // Create preview for image
      setImagePreview(URL.createObjectURL(files[0]))

      // Clear error
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }))
      }
    }
  }

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      coverImage: null,
    }))
    setImagePreview(null)
  }

  const handleAddSong = (song) => {
    if (!selectedSongs.some((s) => s.id === song.id)) {
      setSelectedSongs((prev) => [...prev, song])
    }
  }

  const handleRemoveSong = (songId) => {
    setSelectedSongs((prev) => prev.filter((song) => song.id !== songId))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = "Playlist name is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (selectedSongs.length === 0) {
      newErrors.songs = "Please add at least one song to the playlist"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    const formDataToSend = new FormData()

    // Append text fields
    formDataToSend.append("name", formData.name)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("isPublic", formData.isPublic)

    // Append song IDs
    selectedSongs.forEach((song, index) => {
      formDataToSend.append(`songs[${index}]`, song.id)
    })

    // Append cover image if it exists
    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage)
    }

    if (isNewPlaylist) {
      createMutation.mutate(formDataToSend)
    } else {
      updateMutation.mutate(formDataToSend)
    }
  }

  // Filter songs based on search term
  const filteredSongs = allSongs?.filter(
    (song) =>
      !selectedSongs.some((s) => s.id === song.id) &&
      (song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const isLoading = playlistLoading || createMutation.isPending || updateMutation.isPending

  if (playlistLoading && !isNewPlaylist) {
    return <div className="p-6 text-center">Loading playlist data...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-gray-600">{isNewPlaylist ? "Create a new playlist" : "Update playlist information"}</p>
        </div>
        <Link to="/playlists" className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
          Cancel
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Playlist Details */}
            <div className="space-y-6 md:col-span-1">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Playlist Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent`}
                  placeholder="Enter playlist name"
                  disabled={isLoading}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border ${errors.description ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent`}
                  placeholder="Enter playlist description"
                  disabled={isLoading}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                  Make this playlist public
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Cover preview"
                          className="mx-auto h-32 w-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          disabled={isLoading}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="coverImage"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#FF1742] hover:text-[#e0142d] focus-within:outline-none"
                          >
                            <span>Upload cover image</span>
                            <input
                              id="coverImage"
                              name="coverImage"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleFileChange}
                              disabled={isLoading}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Song Selection */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selected Songs</h3>
                {errors.songs && <p className="mb-2 text-sm text-red-600">{errors.songs}</p>}

                {selectedSongs.length === 0 ? (
                  <div className="bg-[#EEF4F7] p-4 rounded-lg text-center text-gray-500">
                    No songs selected. Add songs from the list below.
                  </div>
                ) : (
                  <div className="bg-[#EEF4F7] rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      {selectedSongs.map((song, index) => (
                        <li key={song.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-3">{index + 1}</span>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{song.title}</h4>
                              <p className="text-xs text-gray-500">
                                {song.artist} • {song.duration}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSong(song.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={isLoading}
                          >
                            <TrashIcon className="w-5 h-5" />
                            <span className="sr-only">Remove</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Add Songs</h3>
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search songs..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                  {filteredSongs?.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm ? "No songs match your search." : "No songs available."}
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {filteredSongs?.map((song) => (
                        <li key={song.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center">
                            <MusicIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{song.title}</h4>
                              <p className="text-xs text-gray-500">
                                {song.artist} • {song.duration}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddSong(song)}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                            disabled={isLoading}
                          >
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Add
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/playlists"
              className="mr-3 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e0142d] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Saving..." : isNewPlaylist ? "Create Playlist" : "Update Playlist"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaylistEdit

