"use client"

import { useState, useEffect } from "react"
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  RadioIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline"

// Mock API functions
const fetchPodcasts = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Sudan Today",
          host: "Ahmed Mohammed",
          category: "News & Politics",
          description: "Daily news and analysis about Sudan's current events",
          coverImage: "/placeholder.svg?height=80&width=80",
          episodeCount: 45,
          totalDuration: "32:15:20",
          featured: true,
          publishDate: "2023-01-15",
          episodes: [
            { id: 1, title: "Latest Political Developments", duration: "45:12", publishDate: "2023-05-10" },
            { id: 2, title: "Economic Reforms Discussion", duration: "38:45", publishDate: "2023-05-03" },
            { id: 3, title: "International Relations Update", duration: "42:30", publishDate: "2023-04-26" },
          ],
        },
        {
          id: 2,
          title: "Sudanese Heritage",
          host: "Fatima Ibrahim",
          category: "Culture & Heritage",
          description: "Exploring the rich cultural heritage of Sudan",
          coverImage: "/placeholder.svg?height=80&width=80",
          episodeCount: 32,
          totalDuration: "28:40:15",
          featured: true,
          publishDate: "2023-02-20",
          episodes: [
            { id: 1, title: "Traditional Music of Sudan", duration: "52:18", publishDate: "2023-05-12" },
            { id: 2, title: "Nubian Cultural Practices", duration: "48:35", publishDate: "2023-05-05" },
            { id: 3, title: "Wedding Traditions Across Sudan", duration: "55:10", publishDate: "2023-04-28" },
          ],
        },
        {
          id: 3,
          title: "Sudanese Rhythms",
          host: "Mohammed Ali",
          category: "Music & Entertainment",
          description: "Showcasing Sudanese music and interviewing local artists",
          coverImage: "/placeholder.svg?height=80&width=80",
          episodeCount: 28,
          totalDuration: "24:30:45",
          featured: false,
          publishDate: "2023-03-05",
          episodes: [
            { id: 1, title: "Interview with Ali Media", duration: "58:22", publishDate: "2023-05-15" },
            { id: 2, title: "Evolution of Sudanese Music", duration: "45:30", publishDate: "2023-05-08" },
            { id: 3, title: "Traditional Instruments", duration: "42:15", publishDate: "2023-05-01" },
          ],
        },
        {
          id: 4,
          title: "Learn with Sudan",
          host: "Sara Hassan",
          category: "Education",
          description: "Educational podcast for students of all ages",
          coverImage: "/placeholder.svg?height=80&width=80",
          episodeCount: 40,
          totalDuration: "30:20:10",
          featured: false,
          publishDate: "2023-04-10",
          episodes: [
            { id: 1, title: "History of Sudan Part 1", duration: "42:18", publishDate: "2023-05-14" },
            { id: 2, title: "Mathematics Made Easy", duration: "38:45", publishDate: "2023-05-07" },
            { id: 3, title: "Science and Technology", duration: "45:30", publishDate: "2023-04-30" },
          ],
        },
        {
          id: 5,
          title: "Business Insights",
          host: "Ibrahim Osman",
          category: "Business & Economy",
          description: "Business news and entrepreneurship in Sudan",
          coverImage: "/placeholder.svg?height=80&width=80",
          episodeCount: 35,
          totalDuration: "28:15:40",
          featured: true,
          publishDate: "2023-05-15",
          episodes: [
            { id: 1, title: "Startup Ecosystem in Sudan", duration: "48:22", publishDate: "2023-05-16" },
            { id: 2, title: "Investment Opportunities", duration: "52:15", publishDate: "2023-05-09" },
            { id: 3, title: "Economic Challenges and Solutions", duration: "55:30", publishDate: "2023-05-02" },
          ],
        },
        {
          id: 6,
          title: "Healthy Sudan",
          host: "Amina Khalid",
          category: "Health & Wellness",
          description: "Health tips and medical information for Sudanese people",
          coverImage: "/placeholder.svg?height=80&width=80",
          episodeCount: 30,
          totalDuration: "25:45:30",
          featured: false,
          publishDate: "2023-06-20",
          episodes: [
            { id: 1, title: "Nutrition and Diet", duration: "42:18", publishDate: "2023-05-17" },
            { id: 2, title: "Mental Health Awareness", duration: "48:45", publishDate: "2023-05-10" },
            { id: 3, title: "Exercise and Fitness", duration: "38:30", publishDate: "2023-05-03" },
          ],
        },
      ])
    }, 500)
  })
}

const fetchPodcastCategories = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "News & Politics" },
        { id: 2, name: "Culture & Heritage" },
        { id: 3, name: "Music & Entertainment" },
        { id: 4, name: "Education" },
        { id: 5, name: "Business & Economy" },
        { id: 6, name: "Health & Wellness" },
      ])
    }, 500)
  })
}

const createPodcast = (podcastData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        ...podcastData,
        episodeCount: podcastData.episodes.length,
        totalDuration: calculateTotalDuration(podcastData.episodes),
        publishDate: new Date().toISOString().split("T")[0],
      })
    }, 500)
  })
}

const updatePodcast = (podcastId, podcastData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: podcastId,
        ...podcastData,
        episodeCount: podcastData.episodes.length,
        totalDuration: calculateTotalDuration(podcastData.episodes),
      })
    }, 500)
  })
}

const deletePodcast = (podcastId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

// Helper function to calculate total duration
const calculateTotalDuration = (episodes) => {
  if (!episodes || episodes.length === 0) return "0:00:00"

  let totalSeconds = 0
  episodes.forEach((episode) => {
    const [minutes, seconds] = episode.duration.split(":").map(Number)
    totalSeconds += minutes * 60 + seconds
  })

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export default function PodcastsManagement() {
  const [podcasts, setPodcasts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEpisodesModal, setShowEpisodesModal] = useState(false)
  const [currentPodcast, setCurrentPodcast] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    host: "",
    category: "",
    description: "",
    coverImage: null,
    featured: false,
    episodes: [],
  })
  const [episodeFormData, setEpisodeFormData] = useState({
    title: "",
    duration: "",
    publishDate: "",
    audioFile: null,
  })
  const [formErrors, setFormErrors] = useState({})
  const [episodeFormErrors, setEpisodeFormErrors] = useState({})
  const [isAddingEpisode, setIsAddingEpisode] = useState(false)
  const [editingEpisodeIndex, setEditingEpisodeIndex] = useState(-1)
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

  useEffect(() => {
    loadPodcasts()
    loadCategories()
  }, [])

  const loadPodcasts = async () => {
    setLoading(true)
    try {
      const data = await fetchPodcasts()
      setPodcasts(data)
    } catch (error) {
      console.error("Error loading podcasts:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await fetchPodcastCategories()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value)
  }

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      (podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "" || podcast.category === categoryFilter),
  )

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

  const handleEpisodeInputChange = (e) => {
    const { name, value } = e.target
    setEpisodeFormData({
      ...episodeFormData,
      [name]: value,
    })

    // Clear error for this field when user types
    if (episodeFormErrors[name]) {
      setEpisodeFormErrors({
        ...episodeFormErrors,
        [name]: "",
      })
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      if (name === "audioFile") {
        setEpisodeFormData({
          ...episodeFormData,
          [name]: files[0],
        })

        // Clear error for this field when user selects a file
        if (episodeFormErrors[name]) {
          setEpisodeFormErrors({
            ...episodeFormErrors,
            [name]: "",
          })
        }
      } else {
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
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) errors.title = "Podcast title is required"
    if (!formData.host.trim()) errors.host = "Host name is required"
    if (!formData.category) errors.category = "Category is required"
    if (!formData.description.trim()) errors.description = "Description is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateEpisodeForm = () => {
    const errors = {}
    if (!episodeFormData.title.trim()) errors.title = "Episode title is required"
    if (!episodeFormData.duration.trim()) errors.duration = "Duration is required"
    if (!episodeFormData.publishDate) errors.publishDate = "Publish date is required"
    if (isAddingEpisode && !episodeFormData.audioFile) errors.audioFile = "Audio file is required"

    setEpisodeFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddPodcast = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const newPodcast = await createPodcast({
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        coverImage: formData.coverImage ? "/placeholder.svg?height=80&width=80" : "/placeholder.svg?height=80&width=80",
      })

      setPodcasts([...podcasts, newPodcast])
      setShowAddModal(false)
      resetForm()
    } catch (error) {
      console.error("Error adding podcast:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditPodcast = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const updatedPodcast = await updatePodcast(currentPodcast.id, {
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        coverImage: formData.coverImage ? "/placeholder.svg?height=80&width=80" : currentPodcast.coverImage,
        publishDate: currentPodcast.publishDate,
      })

      setPodcasts(podcasts.map((podcast) => (podcast.id === currentPodcast.id ? updatedPodcast : podcast)))
      setShowEditModal(false)
    } catch (error) {
      console.error("Error updating podcast:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePodcast = async () => {
    setLoading(true)
    try {
      await deletePodcast(currentPodcast.id)
      setPodcasts(podcasts.filter((podcast) => podcast.id !== currentPodcast.id))
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Error deleting podcast:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEpisode = (e) => {
    e.preventDefault()

    if (!validateEpisodeForm()) return

    const newEpisode = {
      id: Math.floor(Math.random() * 1000),
      title: episodeFormData.title,
      duration: episodeFormData.duration,
      publishDate: episodeFormData.publishDate,
      audioFile: episodeFormData.audioFile ? episodeFormData.audioFile.name : null,
    }

    const updatedEpisodes = [...formData.episodes, newEpisode]
    setFormData({
      ...formData,
      episodes: updatedEpisodes,
    })

    resetEpisodeForm()
    setIsAddingEpisode(false)
  }

  const handleUpdateEpisode = (e) => {
    e.preventDefault()

    if (!validateEpisodeForm()) return

    const updatedEpisodes = [...formData.episodes]
    updatedEpisodes[editingEpisodeIndex] = {
      ...updatedEpisodes[editingEpisodeIndex],
      title: episodeFormData.title,
      duration: episodeFormData.duration,
      publishDate: episodeFormData.publishDate,
      audioFile: episodeFormData.audioFile
        ? episodeFormData.audioFile.name
        : updatedEpisodes[editingEpisodeIndex].audioFile,
    }

    setFormData({
      ...formData,
      episodes: updatedEpisodes,
    })

    resetEpisodeForm()
    setEditingEpisodeIndex(-1)
  }

  const handleDeleteEpisode = (index) => {
    const updatedEpisodes = [...formData.episodes]
    updatedEpisodes.splice(index, 1)
    setFormData({
      ...formData,
      episodes: updatedEpisodes,
    })
  }

  const startEditEpisode = (index) => {
    const episode = formData.episodes[index]
    setEpisodeFormData({
      title: episode.title,
      duration: episode.duration,
      publishDate: episode.publishDate,
      audioFile: episode.audioFile,
    })
    setEditingEpisodeIndex(index)
  }

  const togglePlayEpisode = (episodeId) => {
    if (currentlyPlaying === episodeId) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(episodeId)
    }
  }

  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  const openEditModal = (podcast) => {
    setCurrentPodcast(podcast)
    setFormData({
      title: podcast.title,
      host: podcast.host,
      category: podcast.category,
      description: podcast.description,
      coverImage: podcast.coverImage,
      featured: podcast.featured,
      episodes: [...podcast.episodes],
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (podcast) => {
    setCurrentPodcast(podcast)
    setShowDeleteModal(true)
  }

  const openEpisodesModal = (podcast) => {
    setCurrentPodcast(podcast)
    setFormData({
      ...formData,
      episodes: [...podcast.episodes],
    })
    setShowEpisodesModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      host: "",
      category: "",
      description: "",
      coverImage: null,
      featured: false,
      episodes: [],
    })
    setFormErrors({})
    resetEpisodeForm()
  }

  const resetEpisodeForm = () => {
    setEpisodeFormData({
      title: "",
      duration: "",
      publishDate: "",
      audioFile: null,
    })
    setEpisodeFormErrors({})
    setIsAddingEpisode(false)
    setEditingEpisodeIndex(-1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Podcast Management</h1>
        <button onClick={openAddModal} className="flex items-center px-4 py-2 bg-[#FF1742] text-white rounded">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Podcast
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
              placeholder="Search podcasts by title, host or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
              onChange={handleCategoryFilter}
              value={categoryFilter}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Podcasts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && !podcasts.length ? (
          <div className="col-span-full p-8 text-center text-gray-500">Loading podcasts...</div>
        ) : filteredPodcasts.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500">No podcasts found</div>
        ) : (
          filteredPodcasts.map((podcast) => (
            <div key={podcast.id} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="p-4 flex items-start space-x-4">
                <img
                  src={podcast.coverImage || "/placeholder.svg?height=80&width=80"}
                  alt={podcast.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black truncate">{podcast.title}</h3>
                    {podcast.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Host: {podcast.host}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">{podcast.category}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {podcast.episodeCount} episodes
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-1">{podcast.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-3">Total: {podcast.totalDuration}</span>
                    <span>Published: {podcast.publishDate}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 p-3 flex justify-between">
                <button onClick={() => openEpisodesModal(podcast)} className="text-sm text-[#FF1742]">
                  Manage Episodes
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(podcast)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Edit Podcast"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(podcast)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete Podcast"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Podcast Modal */}
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
                  <h3 className="text-lg font-medium text-black">Add New Podcast</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleAddPodcast}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-black">
                      Podcast Title
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
                      placeholder="Enter podcast title"
                    />
                    {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="host" className="block mb-2 text-sm font-medium text-black">
                      Host Name
                    </label>
                    <input
                      type="text"
                      id="host"
                      name="host"
                      value={formData.host}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.host ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                      placeholder="Enter host name"
                    />
                    {formErrors.host && <p className="mt-1 text-sm text-red-500">{formErrors.host}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-black">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.category ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.category && <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.description ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                      placeholder="Enter podcast description"
                      rows={3}
                    ></textarea>
                    {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
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
                        Featured Podcast
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
                            <RadioIcon className="w-10 h-10 mb-3 text-gray-400" />
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

                  {/* Episodes Section */}
                  <div className="mb-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-black">Episodes</h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingEpisode(true)}
                        className="flex items-center text-sm text-[#FF1742]"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Episode
                      </button>
                    </div>

                    {formData.episodes.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No episodes added yet</p>
                    ) : (
                      <ul className="divide-y divide-gray-200 mb-4">
                        {formData.episodes.map((episode, index) => (
                          <li key={episode.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => togglePlayEpisode(episode.id)}
                                className="p-1 mr-2 text-gray-600 hover:text-[#FF1742]"
                              >
                                {currentlyPlaying === episode.id ? (
                                  <PauseIcon className="h-5 w-5" />
                                ) : (
                                  <PlayIcon className="h-5 w-5" />
                                )}
                              </button>
                              <div>
                                <p className="text-sm font-medium text-black">{episode.title}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="mr-2">{episode.duration}</span>
                                  <span>{episode.publishDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => startEditEpisode(index)}
                                className="p-1 text-blue-600 hover:text-blue-800"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteEpisode(index)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(isAddingEpisode || editingEpisodeIndex !== -1) && (
                      <div className="bg-gray-50 p-4 rounded mb-4">
                        <h5 className="text-sm font-medium text-black mb-3">
                          {editingEpisodeIndex !== -1 ? "Edit Episode" : "Add Episode"}
                        </h5>
                        <form onSubmit={editingEpisodeIndex !== -1 ? handleUpdateEpisode : handleAddEpisode}>
                          <div className="mb-3">
                            <label htmlFor="episode-title" className="block mb-1 text-xs font-medium text-black">
                              Title
                            </label>
                            <input
                              type="text"
                              id="episode-title"
                              name="title"
                              value={episodeFormData.title}
                              onChange={handleEpisodeInputChange}
                              className={`w-full p-2 text-sm border ${
                                episodeFormErrors.title ? "border-red-500" : "border-gray-200"
                              } rounded focus:outline-none focus:border-[#FF1742]`}
                              placeholder="Enter episode title"
                            />
                            {episodeFormErrors.title && (
                              <p className="mt-1 text-xs text-red-500">{episodeFormErrors.title}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <label htmlFor="episode-duration" className="block mb-1 text-xs font-medium text-black">
                                Duration (MM:SS)
                              </label>
                              <input
                                type="text"
                                id="episode-duration"
                                name="duration"
                                value={episodeFormData.duration}
                                onChange={handleEpisodeInputChange}
                                className={`w-full p-2 text-sm border ${
                                  episodeFormErrors.duration ? "border-red-500" : "border-gray-200"
                                } rounded focus:outline-none focus:border-[#FF1742]`}
                                placeholder="e.g. 45:30"
                              />
                              {episodeFormErrors.duration && (
                                <p className="mt-1 text-xs text-red-500">{episodeFormErrors.duration}</p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor="episode-publishDate"
                                className="block mb-1 text-xs font-medium text-black"
                              >
                                Publish Date
                              </label>
                              <input
                                type="date"
                                id="episode-publishDate"
                                name="publishDate"
                                value={episodeFormData.publishDate}
                                onChange={handleEpisodeInputChange}
                                className={`w-full p-2 text-sm border ${
                                  episodeFormErrors.publishDate ? "border-red-500" : "border-gray-200"
                                } rounded focus:outline-none focus:border-[#FF1742]`}
                              />
                              {episodeFormErrors.publishDate && (
                                <p className="mt-1 text-xs text-red-500">{episodeFormErrors.publishDate}</p>
                              )}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="episode-audioFile" className="block mb-1 text-xs font-medium text-black">
                              Audio File
                            </label>
                            <div
                              className={`border ${
                                episodeFormErrors.audioFile ? "border-red-500" : "border-gray-200"
                              } rounded p-2`}
                            >
                              <div className="flex items-center justify-center w-full">
                                <label
                                  htmlFor="episode-audioFile"
                                  className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                    <RadioIcon className="w-6 h-6 mb-2 text-gray-400" />
                                    <p className="text-xs text-gray-500">MP3, WAV or OGG (MAX. 50MB)</p>
                                  </div>
                                  <input
                                    id="episode-audioFile"
                                    name="audioFile"
                                    type="file"
                                    className="hidden"
                                    accept=".mp3,.wav,.ogg"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                              {episodeFormData.audioFile && (
                                <div className="mt-2 flex items-center">
                                  <RadioIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-xs text-gray-500">
                                    {typeof episodeFormData.audioFile === "string"
                                      ? episodeFormData.audioFile
                                      : episodeFormData.audioFile.name}
                                  </span>
                                </div>
                              )}
                            </div>
                            {episodeFormErrors.audioFile && (
                              <p className="mt-1 text-xs text-red-500">{episodeFormErrors.audioFile}</p>
                            )}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={resetEpisodeForm}
                              className="px-3 py-1 text-xs border border-gray-200 rounded text-black"
                            >
                              Cancel
                            </button>
                            <button type="submit" className="px-3 py-1 text-xs bg-[#FF1742] text-white rounded">
                              {editingEpisodeIndex !== -1 ? "Update" : "Add"}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
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
                      {loading ? "Adding..." : "Add Podcast"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Podcast Modal */}
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
                  <h3 className="text-lg font-medium text-black">Edit Podcast</h3>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleEditPodcast}>
                  <div className="mb-4">
                    <label htmlFor="edit-title" className="block mb-2 text-sm font-medium text-black">
                      Podcast Title
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
                    <label htmlFor="edit-host" className="block mb-2 text-sm font-medium text-black">
                      Host Name
                    </label>
                    <input
                      type="text"
                      id="edit-host"
                      name="host"
                      value={formData.host}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.host ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    />
                    {formErrors.host && <p className="mt-1 text-sm text-red-500">{formErrors.host}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-category" className="block mb-2 text-sm font-medium text-black">
                      Category
                    </label>
                    <select
                      id="edit-category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.category ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.category && <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-description" className="block mb-2 text-sm font-medium text-black">
                      Description
                    </label>
                    <textarea
                      id="edit-description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${
                        formErrors.description ? "border-red-500" : "border-gray-200"
                      } rounded focus:outline-none focus:border-[#FF1742]`}
                      rows={3}
                    ></textarea>
                    {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
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
                        Featured Podcast
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
                            <RadioIcon className="w-10 h-10 mb-3 text-gray-400" />
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

                  {/* Episodes Section - Same as in Add Modal */}
                  <div className="mb-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-black">Episodes</h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingEpisode(true)}
                        className="flex items-center text-sm text-[#FF1742]"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Episode
                      </button>
                    </div>

                    {formData.episodes.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No episodes added yet</p>
                    ) : (
                      <ul className="divide-y divide-gray-200 mb-4">
                        {formData.episodes.map((episode, index) => (
                          <li key={episode.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => togglePlayEpisode(episode.id)}
                                className="p-1 mr-2 text-gray-600 hover:text-[#FF1742]"
                              >
                                {currentlyPlaying === episode.id ? (
                                  <PauseIcon className="h-5 w-5" />
                                ) : (
                                  <PlayIcon className="h-5 w-5" />
                                )}
                              </button>
                              <div>
                                <p className="text-sm font-medium text-black">{episode.title}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="mr-2">{episode.duration}</span>
                                  <span>{episode.publishDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => startEditEpisode(index)}
                                className="p-1 text-blue-600 hover:text-blue-800"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteEpisode(index)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(isAddingEpisode || editingEpisodeIndex !== -1) && (
                      <div className="bg-gray-50 p-4 rounded mb-4">
                        <h5 className="text-sm font-medium text-black mb-3">
                          {editingEpisodeIndex !== -1 ? "Edit Episode" : "Add Episode"}
                        </h5>
                        <form onSubmit={editingEpisodeIndex !== -1 ? handleUpdateEpisode : handleAddEpisode}>
                          <div className="mb-3">
                            <label htmlFor="edit-episode-title" className="block mb-1 text-xs font-medium text-black">
                              Title
                            </label>
                            <input
                              type="text"
                              id="edit-episode-title"
                              name="title"
                              value={episodeFormData.title}
                              onChange={handleEpisodeInputChange}
                              className={`w-full p-2 text-sm border ${
                                episodeFormErrors.title ? "border-red-500" : "border-gray-200"
                              } rounded focus:outline-none focus:border-[#FF1742]`}
                              placeholder="Enter episode title"
                            />
                            {episodeFormErrors.title && (
                              <p className="mt-1 text-xs text-red-500">{episodeFormErrors.title}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <label
                                htmlFor="edit-episode-duration"
                                className="block mb-1 text-xs font-medium text-black"
                              >
                                Duration (MM:SS)
                              </label>
                              <input
                                type="text"
                                id="edit-episode-duration"
                                name="duration"
                                value={episodeFormData.duration}
                                onChange={handleEpisodeInputChange}
                                className={`w-full p-2 text-sm border ${
                                  episodeFormErrors.duration ? "border-red-500" : "border-gray-200"
                                } rounded focus:outline-none focus:border-[#FF1742]`}
                                placeholder="e.g. 45:30"
                              />
                              {episodeFormErrors.duration && (
                                <p className="mt-1 text-xs text-red-500">{episodeFormErrors.duration}</p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor="edit-episode-publishDate"
                                className="block mb-1 text-xs font-medium text-black"
                              >
                                Publish Date
                              </label>
                              <input
                                type="date"
                                id="edit-episode-publishDate"
                                name="publishDate"
                                value={episodeFormData.publishDate}
                                onChange={handleEpisodeInputChange}
                                className={`w-full p-2 text-sm border ${
                                  episodeFormErrors.publishDate ? "border-red-500" : "border-gray-200"
                                } rounded focus:outline-none focus:border-[#FF1742]`}
                              />
                              {episodeFormErrors.publishDate && (
                                <p className="mt-1 text-xs text-red-500">{episodeFormErrors.publishDate}</p>
                              )}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="edit-episode-audioFile"
                              className="block mb-1 text-xs font-medium text-black"
                            >
                              Audio File
                            </label>
                            <div
                              className={`border ${
                                episodeFormErrors.audioFile ? "border-red-500" : "border-gray-200"
                              } rounded p-2`}
                            >
                              <div className="flex items-center justify-center w-full">
                                <label
                                  htmlFor="edit-episode-audioFile"
                                  className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                    <RadioIcon className="w-6 h-6 mb-2 text-gray-400" />
                                    <p className="text-xs text-gray-500">MP3, WAV or OGG (MAX. 50MB)</p>
                                  </div>
                                  <input
                                    id="edit-episode-audioFile"
                                    name="audioFile"
                                    type="file"
                                    className="hidden"
                                    accept=".mp3,.wav,.ogg"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                              {episodeFormData.audioFile && (
                                <div className="mt-2 flex items-center">
                                  <RadioIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-xs text-gray-500">
                                    {typeof episodeFormData.audioFile === "string"
                                      ? episodeFormData.audioFile
                                      : episodeFormData.audioFile.name}
                                  </span>
                                </div>
                              )}
                            </div>
                            {episodeFormErrors.audioFile && (
                              <p className="mt-1 text-xs text-red-500">{episodeFormErrors.audioFile}</p>
                            )}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={resetEpisodeForm}
                              className="px-3 py-1 text-xs border border-gray-200 rounded text-black"
                            >
                              Cancel
                            </button>
                            <button type="submit" className="px-3 py-1 text-xs bg-[#FF1742] text-white rounded">
                              {editingEpisodeIndex !== -1 ? "Update" : "Add"}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
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

      {/* Delete Podcast Modal */}
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
                  <h3 className="text-lg font-medium text-black">Delete Podcast</h3>
                  <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-black">Confirm Deletion</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the podcast "{currentPodcast?.title}"? This action cannot be
                        undone and will remove all associated episodes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeletePodcast}
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

      {/* Episodes Modal */}
      {showEpisodesModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-black">Episodes for "{currentPodcast?.title}"</h3>
                  <button onClick={() => setShowEpisodesModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-black">All Episodes</h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingEpisode(true)}
                      className="flex items-center px-3 py-1 bg-[#FF1742] text-white rounded text-sm"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Episode
                    </button>
                  </div>

                  {currentPodcast?.episodes.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No episodes available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#EEF4F7]">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duration
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Publish Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {currentPodcast?.episodes.map((episode) => (
                            <tr key={episode.id}>
                              <td className="px-4 py-3 text-sm text-black">
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={() => togglePlayEpisode(episode.id)}
                                    className="p-1 mr-2 text-gray-600 hover:text-[#FF1742]"
                                  >
                                    {currentlyPlaying === episode.id ? (
                                      <PauseIcon className="h-5 w-5" />
                                    ) : (
                                      <PlayIcon className="h-5 w-5" />
                                    )}
                                  </button>
                                  {episode.title}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-black">{episode.duration}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{episode.publishDate}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      startEditEpisode(formData.episodes.findIndex((e) => e.id === episode.id))
                                    }
                                    className="p-1 text-blue-600 hover:text-blue-800"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteEpisode(formData.episodes.findIndex((e) => e.id === episode.id))
                                    }
                                    className="p-1 text-red-600 hover:text-red-800"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {(isAddingEpisode || editingEpisodeIndex !== -1) && (
                    <div className="bg-gray-50 p-4 rounded mt-6">
                      <h5 className="text-sm font-medium text-black mb-3">
                        {editingEpisodeIndex !== -1 ? "Edit Episode" : "Add Episode"}
                      </h5>
                      <form onSubmit={editingEpisodeIndex !== -1 ? handleUpdateEpisode : handleAddEpisode}>
                        <div className="mb-3">
                          <label htmlFor="modal-episode-title" className="block mb-1 text-xs font-medium text-black">
                            Title
                          </label>
                          <input
                            type="text"
                            id="modal-episode-title"
                            name="title"
                            value={episodeFormData.title}
                            onChange={handleEpisodeInputChange}
                            className={`w-full p-2 text-sm border ${
                              episodeFormErrors.title ? "border-red-500" : "border-gray-200"
                            } rounded focus:outline-none focus:border-[#FF1742]`}
                            placeholder="Enter episode title"
                          />
                          {episodeFormErrors.title && (
                            <p className="mt-1 text-xs text-red-500">{episodeFormErrors.title}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <label
                              htmlFor="modal-episode-duration"
                              className="block mb-1 text-xs font-medium text-black"
                            >
                              Duration (MM:SS)
                            </label>
                            <input
                              type="text"
                              id="modal-episode-duration"
                              name="duration"
                              value={episodeFormData.duration}
                              onChange={handleEpisodeInputChange}
                              className={`w-full p-2 text-sm border ${
                                episodeFormErrors.duration ? "border-red-500" : "border-gray-200"
                              } rounded focus:outline-none focus:border-[#FF1742]`}
                              placeholder="e.g. 45:30"
                            />
                            {episodeFormErrors.duration && (
                              <p className="mt-1 text-xs text-red-500">{episodeFormErrors.duration}</p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="modal-episode-publishDate"
                              className="block mb-1 text-xs font-medium text-black"
                            >
                              Publish Date
                            </label>
                            <input
                              type="date"
                              id="modal-episode-publishDate"
                              name="publishDate"
                              value={episodeFormData.publishDate}
                              onChange={handleEpisodeInputChange}
                              className={`w-full p-2 text-sm border ${
                                episodeFormErrors.publishDate ? "border-red-500" : "border-gray-200"
                              } rounded focus:outline-none focus:border-[#FF1742]`}
                            />
                            {episodeFormErrors.publishDate && (
                              <p className="mt-1 text-xs text-red-500">{episodeFormErrors.publishDate}</p>
                            )}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="modal-episode-audioFile"
                            className="block mb-1 text-xs font-medium text-black"
                          >
                            Audio File
                          </label>
                          <div
                            className={`border ${
                              episodeFormErrors.audioFile ? "border-red-500" : "border-gray-200"
                            } rounded p-2`}
                          >
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="modal-episode-audioFile"
                                className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                  <RadioIcon className="w-6 h-6 mb-2 text-gray-400" />
                                  <p className="text-xs text-gray-500">MP3, WAV or OGG (MAX. 50MB)</p>
                                </div>
                                <input
                                  id="modal-episode-audioFile"
                                  name="audioFile"
                                  type="file"
                                  className="hidden"
                                  accept=".mp3,.wav,.ogg"
                                  onChange={handleFileChange}
                                />
                              </label>
                            </div>
                            {episodeFormData.audioFile && (
                              <div className="mt-2 flex items-center">
                                <RadioIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-xs text-gray-500">
                                  {typeof episodeFormData.audioFile === "string"
                                    ? episodeFormData.audioFile
                                    : episodeFormData.audioFile.name}
                                </span>
                              </div>
                            )}
                          </div>
                          {episodeFormErrors.audioFile && (
                            <p className="mt-1 text-xs text-red-500">{episodeFormErrors.audioFile}</p>
                          )}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={resetEpisodeForm}
                            className="px-3 py-1 text-xs border border-gray-200 rounded text-black"
                          >
                            Cancel
                          </button>
                          <button type="submit" className="px-3 py-1 text-xs bg-[#FF1742] text-white rounded">
                            {editingEpisodeIndex !== -1 ? "Update" : "Add"}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEpisodesModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#FF1742] text-white rounded"
                    disabled={loading}
                    onClick={() => {
                      updatePodcast(currentPodcast.id, {
                        ...currentPodcast,
                        episodes: formData.episodes,
                      }).then((updatedPodcast) => {
                        setPodcasts(
                          podcasts.map((podcast) => (podcast.id === currentPodcast.id ? updatedPodcast : podcast)),
                        )
                        setShowEpisodesModal(false)
                      })
                    }}
                  >
                    {loading ? "Saving..." : "Save Episodes"}
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

