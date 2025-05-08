"use client"

import { useState, useEffect } from "react"
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  UserIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline"

// Mock API functions
const fetchArtists = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Ali Media",
          bio: "Renowned Sudanese artist known for traditional music with a modern twist.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Traditional",
          followers: "1.2M",
          songCount: 42,
          albumCount: 5,
          featured: true,
          socialMedia: {
            instagram: "@alimedia",
            twitter: "@alimedia",
            facebook: "alimediaofficial",
          },
        },
        {
          id: 2,
          name: "Mohammed Ahmed",
          bio: "Popular artist specializing in modern Sudanese pop music.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Modern",
          followers: "985K",
          songCount: 38,
          albumCount: 4,
          featured: true,
          socialMedia: {
            instagram: "@mohammedahmed",
            twitter: "@mohammedahmed",
            facebook: "mohammedahmedmusic",
          },
        },
        {
          id: 3,
          name: "Fatima Ali",
          bio: "Folk singer celebrating the rich cultural heritage of Sudan.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Folk",
          followers: "876K",
          songCount: 45,
          albumCount: 6,
          featured: false,
          socialMedia: {
            instagram: "@fatimaali",
            twitter: "@fatimaali",
            facebook: "fatimaalimusicofficial",
          },
        },
        {
          id: 4,
          name: "Ibrahim Hassan",
          bio: "Contemporary artist blending traditional sounds with modern pop.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Pop",
          followers: "754K",
          songCount: 29,
          albumCount: 3,
          featured: true,
          socialMedia: {
            instagram: "@ibrahimhassan",
            twitter: "@ibrahimhassan",
            facebook: "ibrahimhassanmusic",
          },
        },
        {
          id: 5,
          name: "Amina Mohammed",
          bio: "Traditional vocalist preserving classic Sudanese musical heritage.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Traditional",
          followers: "698K",
          songCount: 36,
          albumCount: 4,
          featured: false,
          socialMedia: {
            instagram: "@aminamohammed",
            twitter: "@aminamohammed",
            facebook: "aminamohammedofficial",
          },
        },
        {
          id: 6,
          name: "Omar Bashir",
          bio: "Jazz-influenced artist creating fusion music with Sudanese roots.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Jazz",
          followers: "543K",
          songCount: 27,
          albumCount: 3,
          featured: false,
          socialMedia: {
            instagram: "@omarbashir",
            twitter: "@omarbashir",
            facebook: "omarbashirmusic",
          },
        },
        {
          id: 7,
          name: "Layla Ahmed",
          bio: "Modern artist known for urban beats and contemporary lyrics.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Modern",
          followers: "432K",
          songCount: 24,
          albumCount: 2,
          featured: true,
          socialMedia: {
            instagram: "@laylaahmed",
            twitter: "@laylaahmed",
            facebook: "laylaahmedofficial",
          },
        },
        {
          id: 8,
          name: "Khalid Ibrahim",
          bio: "Folk musician specializing in traditional instruments and melodies.",
          image: "/placeholder.svg?height=80&width=80",
          genre: "Folk",
          followers: "321K",
          songCount: 31,
          albumCount: 3,
          featured: false,
          socialMedia: {
            instagram: "@khalidibrahim",
            twitter: "@khalidibrahim",
            facebook: "khalidibrahimmusic",
          },
        },
      ])
    }, 500)
  })
}

const createArtist = (artistData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Math.floor(Math.random() * 1000), ...artistData, followers: "0", songCount: 0, albumCount: 0 })
    }, 500)
  })
}

const updateArtist = (artistId, artistData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: artistId, ...artistData })
    }, 500)
  })
}

const deleteArtist = (artistId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

export default function ArtistsManagement() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentArtist, setCurrentArtist] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    genre: "Traditional",
    featured: false,
    image: null,
    socialMedia: {
      instagram: "",
      twitter: "",
      facebook: "",
    },
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    loadArtists()
  }, [])

  const loadArtists = async () => {
    setLoading(true)
    try {
      const data = await fetchArtists()
      setArtists(data)
    } catch (error) {
      console.error("Error loading artists:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleGenreFilter = (e) => {
    setGenreFilter(e.target.value)
  }

  const filteredArtists = artists.filter(
    (artist) =>
      (artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.bio.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (genreFilter === "" || artist.genre === genreFilter)
  )

  const genres = ["Traditional", "Modern", "Folk", "Pop", "Jazz", "Classical"]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes("socialMedia.")) {
      const socialMediaField = name.split(".")[1]
      setFormData({
        ...formData,
        socialMedia: {
          ...formData.socialMedia,
          [socialMediaField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      })
    }

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
    if (!formData.name.trim()) errors.name = "Artist name is required"
    if (!formData.bio.trim()) errors.bio = "Bio is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddArtist = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const newArtist = await createArtist({
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        image: formData.image ? "/placeholder.svg?height=80&width=80" : "/placeholder.svg?height=80&width=80",
      })

      setArtists([...artists, newArtist])
      setShowAddModal(false)
      resetForm()
    } catch (error) {
      console.error("Error adding artist:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditArtist = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const updatedArtist = await updateArtist(currentArtist.id, {
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        image: formData.image ? "/placeholder.svg?height=80&width=80" : currentArtist.image,
        followers: currentArtist.followers,
        songCount: currentArtist.songCount,
        albumCount: currentArtist.albumCount,
      })

      setArtists(artists.map((artist) => (artist.id === currentArtist.id ? updatedArtist : artist)))
      setShowEditModal(false)
    } catch (error) {
      console.error("Error updating artist:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteArtist = async () => {
    setLoading(true)
    try {
      await deleteArtist(currentArtist.id)
      setArtists(artists.filter((artist) => artist.id !== currentArtist.id))
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Error deleting artist:", error)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  const openEditModal = (artist) => {
    setCurrentArtist(artist)
    setFormData({
      name: artist.name,
      bio: artist.bio,
      genre: artist.genre,
      featured: artist.featured,
      image: artist.image,
      socialMedia: {
        instagram: artist.socialMedia.instagram,
        twitter: artist.socialMedia.twitter,
        facebook: artist.socialMedia.facebook,
      },
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (artist) => {
    setCurrentArtist(artist)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      bio: "",
      genre: "Traditional",
      featured: false,
      image: null,
      socialMedia: {
        instagram: "",
        twitter: "",
        facebook: "",
      },
    })
    setFormErrors({})
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Artist Management</h1>
        <button onClick={openAddModal} className="flex items-center px-4 py-2 bg-[#FF1742] text-white rounded">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Artist
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
              placeholder="Search artists by name or bio..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
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
          </div>
        </div>
      </div>

      {/* Artists grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && !artists.length ? (
          <div className="col-span-full p-8 text-center text-gray-500">Loading artists...</div>
        ) : filteredArtists.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500">No artists found</div>
        ) : (
          filteredArtists.map((artist) => (
            <div key={artist.id} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="p-4 flex items-start space-x-4">
                <img
                  src={artist.image || "/placeholder.svg?height=80&width=80"}
                  alt={artist.name}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black truncate">{artist.name}</h3>
                    {artist.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">{artist.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">{artist.genre}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {artist.followers} followers
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-3">{artist.songCount} songs</span>
                    <span>{artist.albumCount} albums</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 p-3 flex justify-between">
                <div className="flex space-x-2">
                  {artist.socialMedia.instagram && (
                    <a href="#" className="text-gray-500 hover:text-[#FF1742]" title="Instagram">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                  {artist.socialMedia.twitter && (
                    <a href="#" className="text-gray-500 hover:text-[#FF1742]" title="Twitter">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {artist.socialMedia.facebook && (
                    <a href="#" className="text-gray-500 hover:text-[#FF1742]" title="Facebook">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(artist)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Edit Artist"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(artist)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete Artist"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Artist Modal */}
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
                  <h3 className="text-lg font-medium text-black">Add New Artist</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleAddArtist}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.name ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                      placeholder="Enter artist name"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="bio" className="block mb-2 text-sm font-medium text-black">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.bio ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                      placeholder="Enter artist bio"
                      rows={3}
                    ></textarea>
                    {formErrors.bio && <p className="mt-1 text-sm text-red-500">{formErrors.bio}</p>}
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
                        Featured Artist
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-black">
                      Artist Image
                    </label>
                    <div className="border border-gray-200 rounded p-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UserIcon className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                          </div>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {formData.image && (
                        <div className="mt-2 flex items-center">
                          <ArrowUpTrayIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {typeof formData.image === "string" ? formData.image : formData.image.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-black mb-2">Social Media</h4>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="instagram" className="block mb-1 text-xs text-gray-500">
                          Instagram
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md">
                            @
                          </span>
                          <input
                            type="text"
                            id="instagram"
                            name="socialMedia.instagram"
                            value={formData.socialMedia.instagram}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-r focus:outline-none focus:border-[#FF1742]"
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="twitter" className="block mb-1 text-xs text-gray-500">
                          Twitter
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md">
                            @
                          </span>
                          <input
                            type="text"
                            id="twitter"
                            name="socialMedia.twitter"
                            value={formData.socialMedia.twitter}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-r focus:outline-none focus:border-[#FF1742]"
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="facebook" className="block mb-1 text-xs text-gray-500">
                          Facebook
                        </label>
                        <input
                          type="text"
                          id="facebook"
                          name="socialMedia.facebook"
                          value={formData.socialMedia.facebook}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
                          placeholder="username or page name"
                        />
                      </div>
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
                      {loading ? "Adding..." : "Add Artist"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Artist Modal */}
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
                  <h3 className="text-lg font-medium text-black">Edit Artist</h3>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleEditArtist}>
                  <div className="mb-4">
                    <label htmlFor="edit-name" className="block mb-2 text-sm font-medium text-black">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      id="edit-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.name ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-bio" className="block mb-2 text-sm font-medium text-black">
                      Bio
                    </label>
                    <textarea
                      id="edit-bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.bio ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                      rows={3}
                    ></textarea>
                    {formErrors.bio && <p className="mt-1 text-sm text-red-500">{formErrors.bio}</p>}
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
                        Featured Artist
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-image" className="block mb-2 text-sm font-medium text-black">
                      Artist Image (Leave empty to keep current)
                    </label>
                    <div className="border border-gray-200 rounded p-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="edit-image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UserIcon className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                          </div>
                          <input
                            id="edit-image"
                            name="image"
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {formData.image && (
                        <div className="mt-2 flex items-center">
                          <ArrowUpTrayIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {typeof formData.image === "string" ? formData.image : formData.image.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-black mb-2">Social Media</h4>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="edit-instagram" className="block mb-1 text-xs text-gray-500">
                          Instagram
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md">
                            @
                          </span>
                          <input
                            type="text"
                            id="edit-instagram"
                            name="socialMedia.instagram"
                            value={formData.socialMedia.instagram}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-r focus:outline-none focus:border-[#FF1742]"
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="edit-twitter" className="block mb-1 text-xs text-gray-500">
                          Twitter
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md">
                            @
                          </span>
                          <input
                            type="text"
                            id="edit-twitter"
                            name="socialMedia.twitter"
                            value={formData.socialMedia.twitter}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-r focus:outline-none focus:border-[#FF1742]"
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="edit-facebook" className="block mb-1 text-xs text-gray-500">
                          Facebook
                        </label>
                        <input
                          type="text"
                          id="edit-facebook"
                          name="socialMedia.facebook"
                          value={formData.socialMedia.facebook}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
                          placeholder="username or page name"
                        />
                      </div>
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

      {/* Delete Artist Modal */}
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
                  <h3 className="text-lg font-medium text-black">Delete Artist</h3>
                  <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-black">Confirm Deletion</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the artist "{currentArtist?.name}"? This action cannot be undone
                        and will remove all associated content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeleteArtist}
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
    </div>
  )
}
