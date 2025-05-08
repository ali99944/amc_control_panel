"use client"

import { useState, useEffect } from "react"
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  MusicalNoteIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/24/solid"

// Mock API functions
const fetchAlbums = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Sudanese Classics",
          artist: "Ali Media",
          releaseDate: "2023-01-15",
          genre: "Traditional",
          coverImage: "/placeholder.svg?height=80&width=80",
          songCount: 12,
          totalDuration: "48:32",
          featured: true,
          songs: [
            { id: 1, title: "Aghani Sudan", duration: "3:45" },
            { id: 2, title: "Khartoum Nights", duration: "4:12" },
            { id: 3, title: "Nile River", duration: "3:28" },
          ],
        },
        {
          id: 2,
          title: "City Lights",
          artist: "Mohammed Ahmed",
          releaseDate: "2023-02-20",
          genre: "Modern",
          coverImage: "/placeholder.svg?height=80&width=80",
          songCount: 10,
          totalDuration: "42:15",
          featured: false,
          songs: [
            { id: 4, title: "Desert Rose", duration: "3:56" },
            { id: 5, title: "Sudanese Pride", duration: "4:32" },
          ],
        },
        {
          id: 3,
          title: "Natural Beauty",
          artist: "Fatima Ali",
          releaseDate: "2023-03-05",
          genre: "Folk",
          coverImage: "/placeholder.svg?height=80&width=80",
          songCount: 8,
          totalDuration: "36:48",
          featured: true,
          songs: [
            { id: 6, title: "Blue Nile", duration: "5:10" },
            { id: 7, title: "Omdurman Beats", duration: "3:22" },
          ],
        },
        {
          id: 4,
          title: "Sahara",
          artist: "Ibrahim Hassan",
          releaseDate: "2023-04-10",
          genre: "Pop",
          coverImage: "/placeholder.svg?height=80&width=80",
          songCount: 9,
          totalDuration: "38:24",
          featured: false,
          songs: [
            { id: 8, title: "Nubian Dreams", duration: "4:05" },
            { id: 9, title: "Peaceful Morning", duration: "4:18" },
          ],
        },
        {
          id: 5,
          title: "Heritage",
          artist: "Amina Mohammed",
          releaseDate: "2023-05-15",
          genre: "Traditional",
          coverImage: "/placeholder.svg?height=80&width=80",
          songCount: 11,
          totalDuration: "45:10",
          featured: true,
          songs: [
            { id: 10, title: "Sunset Melody", duration: "3:45" },
            { id: 11, title: "City Lights", duration: "3:52" },
          ],
        },
        {
          id: 6,
          title: "Rivers",
          artist: "Omar Bashir",
          releaseDate: "2023-06-20",
          genre: "Jazz",
          coverImage: "/placeholder.svg?height=80&width=80",
          songCount: 7,
          totalDuration: "32:15",
          featured: false,
          songs: [
            { id: 12, title: "Desert Wind", duration: "4:25" },
            { id: 13, title: "River Dance", duration: "3:38" },
          ],
        },
      ])
    }, 500)
  })
}

const fetchAllSongs = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Aghani Sudan", artist: "Ali Media", duration: "3:45" },
        { id: 2, title: "Khartoum Nights", artist: "Mohammed Ahmed", duration: "4:12" },
        { id: 3, title: "Nile River", artist: "Fatima Ali", duration: "3:28" },
        { id: 4, title: "Desert Rose", artist: "Ibrahim Hassan", duration: "3:56" },
        { id: 5, title: "Sudanese Pride", artist: "Amina Mohammed", duration: "4:32" },
        { id: 6, title: "Blue Nile", artist: "Omar Bashir", duration: "5:10" },
        { id: 7, title: "Omdurman Beats", artist: "Layla Ahmed", duration: "3:22" },
        { id: 8, title: "Nubian Dreams", artist: "Khalid Ibrahim", duration: "4:05" },
        { id: 9, title: "Peaceful Morning", artist: "Sara Hassan", duration: "4:18" },
        { id: 10, title: "Sunset Melody", artist: "Ahmed Ali", duration: "3:45" },
        { id: 11, title: "City Lights", artist: "Fatima Ibrahim", duration: "3:52" },
        { id: 12, title: "Desert Wind", artist: "Mohammed Hassan", duration: "4:25" },
        { id: 13, title: "River Dance", artist: "Amina Ali", duration: "3:38" },
        { id: 14, title: "Mountain Echo", artist: "Ibrahim Ahmed", duration: "4:10" },
        { id: 15, title: "Ocean Waves", artist: "Layla Mohammed", duration: "5:05" },
      ])
    }, 500)
  })
}

const fetchArtists = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Ali Media" },
        { id: 2, name: "Mohammed Ahmed" },
        { id: 3, name: "Fatima Ali" },
        { id: 4, name: "Ibrahim Hassan" },
        { id: 5, name: "Amina Mohammed" },
        { id: 6, name: "Omar Bashir" },
        { id: 7, name: "Layla Ahmed" },
        { id: 8, name: "Khalid Ibrahim" },
      ])
    }, 500)
  })
}

const createAlbum = (albumData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        ...albumData,
        songCount: albumData.songs.length,
        totalDuration: calculateTotalDuration(albumData.songs),
      })
    }, 500)
  })
}

const updateAlbum = (albumId, albumData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: albumId,
        ...albumData,
        songCount: albumData.songs.length,
        totalDuration: calculateTotalDuration(albumData.songs),
      })
    }, 500)
  })
}

const deleteAlbum = (albumId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

// Helper function to calculate total duration
const calculateTotalDuration = (songs) => {
  if (!songs || songs.length === 0) return "0:00"

  let totalSeconds = 0
  songs.forEach((song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number)
    totalSeconds += minutes * 60 + seconds
  })

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
}

export default function AlbumsManagement() {
  const [albums, setAlbums] = useState([])
  const [allSongs, setAllSongs] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [artistFilter, setArtistFilter] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSongsModal, setShowSongsModal] = useState(false)
  const [currentAlbum, setCurrentAlbum] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    releaseDate: "",
    genre: "Traditional",
    coverImage: null,
    featured: false,
    songs: [],
  })
  const [formErrors, setFormErrors] = useState({})
  const [songSearchTerm, setSongSearchTerm] = useState("")
  const [selectedSongs, setSelectedSongs] = useState([])

  useEffect(() => {
    loadAlbums()
    loadAllSongs()
    loadArtists()
  }, [])

  const loadAlbums = async () => {
    setLoading(true)
    try {
      const data = await fetchAlbums()
      setAlbums(data)
    } catch (error) {
      console.error("Error loading albums:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadAllSongs = async () => {
    try {
      const data = await fetchAllSongs()
      setAllSongs(data)
    } catch (error) {
      console.error("Error loading songs:", error)
    }
  }

  const loadArtists = async () => {
    try {
      const data = await fetchArtists()
      setArtists(data)
    } catch (error) {
      console.error("Error loading artists:", error)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleGenreFilter = (e) => {
    setGenreFilter(e.target.value)
  }

  const handleArtistFilter = (e) => {
    setArtistFilter(e.target.value)
  }

  const filteredAlbums = albums.filter(
    (album) =>
      (album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (genreFilter === "" || album.genre === genreFilter) &&
      (artistFilter === "" || album.artist === artistFilter),
  )

  const genres = ["Traditional", "Modern", "Folk", "Pop", "Jazz", "Classical"]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      })

      // Clear error for this field when user selects a file
      if (formErrors[name]) {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      }
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) errors.title = "Album title is required"
    if (!formData.artist) errors.artist = "Artist is required"
    if (!formData.releaseDate) errors.releaseDate = "Release date is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddAlbum = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const newAlbum = await createAlbum({
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        coverImage: formData.coverImage ? "/placeholder.svg?height=80&width=80" : "/placeholder.svg?height=80&width=80",
      })

      setAlbums([...albums, newAlbum])
      setShowAddModal(false)
      resetForm()
    } catch (error) {
      console.error("Error adding album:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditAlbum = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const updatedAlbum = await updateAlbum(currentAlbum.id, {
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        coverImage: formData.coverImage ? "/placeholder.svg?height=80&width=80" : currentAlbum.coverImage,
      })

      setAlbums(albums.map((album) => (album.id === currentAlbum.id ? updatedAlbum : album)))
      setShowEditModal(false)
    } catch (error) {
      console.error("Error updating album:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAlbum = async () => {
    setLoading(true)
    try {
      await deleteAlbum(currentAlbum.id)
      setAlbums(albums.filter((album) => album.id !== currentAlbum.id))
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Error deleting album:", error)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  const openEditModal = (album) => {
    setCurrentAlbum(album)
    setFormData({
      title: album.title,
      artist: album.artist,
      releaseDate: album.releaseDate,
      genre: album.genre,
      coverImage: album.coverImage,
      featured: album.featured,
      songs: [...album.songs],
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (album) => {
    setCurrentAlbum(album)
    setShowDeleteModal(true)
  }

  const openSongsModal = (album) => {
    setCurrentAlbum(album)
    setSelectedSongs([...album.songs])
    setShowSongsModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      artist: "",
      releaseDate: "",
      genre: "Traditional",
      coverImage: null,
      featured: false,
      songs: [],
    })
    setFormErrors({})
    setSelectedSongs([])
  }

  const handleSongSearch = (e) => {
    setSongSearchTerm(e.target.value)
  }

  const filteredSongs = allSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(songSearchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(songSearchTerm.toLowerCase()),
  )

  const isSelectedSong = (songId) => {
    return selectedSongs.some((song) => song.id === songId)
  }

  const toggleSongSelection = (song) => {
    if (isSelectedSong(song.id)) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id))
    } else {
      setSelectedSongs([...selectedSongs, song])
    }
  }

  const saveSongsToAlbum = async () => {
    setLoading(true)
    try {
      const updatedAlbum = await updateAlbum(currentAlbum.id, {
        ...currentAlbum,
        songs: selectedSongs,
      })

      setAlbums(albums.map((album) => (album.id === currentAlbum.id ? updatedAlbum : album)))
      setShowSongsModal(false)
    } catch (error) {
      console.error("Error updating album songs:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Album Management</h1>
        <button onClick={openAddModal} className="flex items-center px-4 py-2 bg-[#FF1742] text-white rounded">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Album
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white border border-gray-200 rounded p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search albums by title or artist..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
              onChange={handleGenreFilter}
              value={genreFilter}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
              onChange={handleArtistFilter}
              value={artistFilter}
            >
              <option value="">All Artists</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.name}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Albums grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && !albums.length ? (
          <div className="col-span-full p-8 text-center text-gray-500">Loading albums...</div>
        ) : filteredAlbums.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500">No albums found</div>
        ) : (
          filteredAlbums.map((album) => (
            <div key={album.id} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="p-4 flex items-start space-x-4">
                <img
                  src={album.coverImage || "/placeholder.svg?height=80&width=80"}
                  alt={album.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black truncate">{album.title}</h3>
                    {album.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Artist: {album.artist}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">{album.genre}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{album.releaseDate}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-3">{album.songCount} songs</span>
                    <span>{album.totalDuration} total</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 p-3 flex justify-between">
                <button onClick={() => openSongsModal(album)} className="text-sm text-[#FF1742]">
                  Manage Songs
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(album)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Edit Album"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(album)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete Album"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Album Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-black">Add New Album</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleAddAlbum}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-black">
                      Album Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.title ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                      placeholder="Enter album title"
                    />
                    {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="artist" className="block mb-2 text-sm font-medium text-black">
                      Artist
                    </label>
                    <select
                      id="artist"
                      name="artist"
                      value={formData.artist}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.artist ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    >
                      <option value="">Select Artist</option>
                      {artists.map((artist) => (
                        <option key={artist.id} value={artist.name}>
                          {artist.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.artist && <p className="mt-1 text-sm text-red-500">{formErrors.artist}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="releaseDate" className="block mb-2 text-sm font-medium text-black">
                      Release Date
                    </label>
                    <input
                      type="date"
                      id="releaseDate"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.releaseDate ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    />
                    {formErrors.releaseDate && <p className="mt-1 text-sm text-red-500">{formErrors.releaseDate}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="genre" className="block mb-2 text-sm font-medium text-black">
                      Genre
                    </label>
                    <select
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
                    >
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 block text-sm text-black">
                        Featured Album
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-black">
                      Cover Image
                    </label>
                    <div className="border border-gray-200 rounded p-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="coverImage"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                          </div>
                          <input
                            id="coverImage"
                            name="coverImage"
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {formData.coverImage && (
                        <div className="mt-2 flex items-center">
                          <ArrowUpTrayIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {typeof formData.coverImage === "string" ? formData.coverImage : formData.coverImage.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 border border-gray-200 rounded text-black"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-[#FF1742] text-white rounded" disabled={loading}>
                      {loading ? "Adding..." : "Add Album"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Album Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-black">Edit Album</h3>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleEditAlbum}>
                  <div className="mb-4">
                    <label htmlFor="edit-title" className="block mb-2 text-sm font-medium text-black">
                      Album Title
                    </label>
                    <input
                      type="text"
                      id="edit-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.title ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    />
                    {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-artist" className="block mb-2 text-sm font-medium text-black">
                      Artist
                    </label>
                    <select
                      id="edit-artist"
                      name="artist"
                      value={formData.artist}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.artist ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    >
                      <option value="">Select Artist</option>
                      {artists.map((artist) => (
                        <option key={artist.id} value={artist.name}>
                          {artist.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.artist && <p className="mt-1 text-sm text-red-500">{formErrors.artist}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-releaseDate" className="block mb-2 text-sm font-medium text-black">
                      Release Date
                    </label>
                    <input
                      type="date"
                      id="edit-releaseDate"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.releaseDate ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    />
                    {formErrors.releaseDate && <p className="mt-1 text-sm text-red-500">{formErrors.releaseDate}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-genre" className="block mb-2 text-sm font-medium text-black">
                      Genre
                    </label>
                    <select
                      id="edit-genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
                    >
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="edit-featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                      />
                      <label htmlFor="edit-featured" className="ml-2 block text-sm text-black">
                        Featured Album
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-coverImage" className="block mb-2 text-sm font-medium text-black">
                      Cover Image (Leave empty to keep current)
                    </label>
                    <div className="border border-gray-200 rounded p-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="edit-coverImage"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                          </div>
                          <input
                            id="edit-coverImage"
                            name="coverImage"
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {formData.coverImage && (
                        <div className="mt-2 flex items-center">
                          <ArrowUpTrayIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {typeof formData.coverImage === "string" ? formData.coverImage : formData.coverImage.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-200 rounded text-black"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-[#FF1742] text-white rounded" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Album Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-black">Delete Album</h3>
                  <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-black">Confirm Deletion</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the album "{currentAlbum?.title}"? This action cannot be undone
                        and will remove all associated songs from this album.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeleteAlbum}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Songs Modal */}
      {showSongsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-black">Manage Songs in "{currentAlbum?.title}"</h3>
                  <button onClick={() => setShowSongsModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left side: Available songs */}
                  <div>
                    <h4 className="text-md font-medium text-black mb-3">Available Songs</h4>
                    <div className="relative mb-3">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search songs..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
                        value={songSearchTerm}
                        onChange={handleSongSearch}
                      />
                    </div>
                    <div className="border border-gray-200 rounded h-96 overflow-y-auto">
                      <ul className="divide-y divide-gray-200">
                        {filteredSongs.map((song) => (
                          <li
                            key={song.id}
                            className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                              isSelectedSong(song.id) ? "bg-gray-100" : ""
                            }`}
                            onClick={() => toggleSongSelection(song)}
                          >
                            <div className="flex items-center">
                              <MusicalNoteIcon className="h-5 w-5 text-gray-400 mr-3" />
                              <div>
                                <p className="text-sm font-medium text-black">{song.title}</p>
                                <p className="text-xs text-gray-500">{song.artist}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-2">{song.duration}</span>
                              {isSelectedSong(song.id) ? (
                                <CheckIcon className="h-5 w-5 text-green-500" />
                              ) : (
                                <PlusIcon className="h-5 w-5 text-[#FF1742]" />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right side: Selected songs */}
                  <div>
                    <h4 className="text-md font-medium text-black mb-3">Album Songs</h4>
                    <div className="border border-gray-200 rounded h-96 overflow-y-auto">
                      {selectedSongs.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No songs added to this album yet</div>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {selectedSongs.map((song, index) => (
                            <li key={song.id} className="p-3 hover:bg-gray-50 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded mr-3 text-xs text-gray-500">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-black">{song.title}</p>
                                  <p className="text-xs text-gray-500">{song.artist}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2">{song.duration}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleSongSelection(song)
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowSongsModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#FF1742] text-white rounded"
                    disabled={loading}
                    onClick={saveSongsToAlbum}
                  >
                    {loading ? "Saving..." : "Save Songs"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

