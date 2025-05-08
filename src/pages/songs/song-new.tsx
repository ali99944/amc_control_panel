"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useGetQuery, useMutationAction } from "../../hooks/queries-actions"
import { TrashIcon, UploadIcon } from "lucide-react"

const SongNew = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseDate: "",
    duration: "",
    lyrics: "",
    audioFile: null,
    coverImage: null,
  })

  const [errors, setErrors] = useState({})
  const [audioPreview, setAudioPreview] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Fetch genres for dropdown
  const { data: genres } = useGetQuery({
    key: ["genres-list"],
    url: "/api/genres/list",
    options: {
      enabled: false,
      initialData: [
        { id: 1, name: "Pop" },
        { id: 2, name: "Traditional" },
        { id: 3, name: "Folk" },
        { id: 4, name: "Modern" },
        { id: 5, name: "Classical" },
        { id: 6, name: "Nubian" },
        { id: 7, name: "Fusion" },
      ],
    },
  })

  // Create mutation
  const createMutation = useMutationAction({
    method: "post",
    url: "/api/songs",
    key: ["songs"],
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      navigate("/songs")
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

      // Create preview for audio or image
      if (name === "audioFile") {
        setAudioPreview(URL.createObjectURL(files[0]))
      } else if (name === "coverImage") {
        setImagePreview(URL.createObjectURL(files[0]))
      }

      // Clear error
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }))
      }
    }
  }

  const handleRemoveFile = (fileType) => {
    if (fileType === "audio") {
      setFormData((prev) => ({
        ...prev,
        audioFile: null,
      }))
      setAudioPreview(null)
    } else if (fileType === "image") {
      setFormData((prev) => ({
        ...prev,
        coverImage: null,
      }))
      setImagePreview(null)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = "Song title is required"
    }
    if (!formData.artist.trim()) {
      newErrors.artist = "Artist name is required"
    }
    if (!formData.genre) {
      newErrors.genre = "Genre is required"
    }
    if (!formData.releaseDate) {
      newErrors.releaseDate = "Release date is required"
    }
    if (!formData.audioFile) {
      newErrors.audioFile = "Audio file is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    const formDataToSend = new FormData()

    // Append text fields
    formDataToSend.append("title", formData.title)
    formDataToSend.append("artist", formData.artist)
    formDataToSend.append("genre", formData.genre)
    formDataToSend.append("releaseDate", formData.releaseDate)
    formDataToSend.append("duration", formData.duration)
    formDataToSend.append("lyrics", formData.lyrics)

    // Append files if they exist
    if (formData.audioFile) {
      formDataToSend.append("audioFile", formData.audioFile)
    }

    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage)
    }

    createMutation.mutate(formDataToSend)
  }

  const isLoading = createMutation.isPending

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Song</h1>
          <p className="text-gray-600">Add a new song to the system</p>
        </div>
        <Link to="/songs" className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
          Cancel
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Song Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.title ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent`}
                  placeholder="Enter song title"
                  disabled={isLoading}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">
                  Artist*
                </label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.artist ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent`}
                  placeholder="Enter artist name"
                  disabled={isLoading}
                />
                {errors.artist && <p className="mt-1 text-sm text-red-600">{errors.artist}</p>}
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                  Genre*
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.genre ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent`}
                  disabled={isLoading}
                >
                  <option value="">Select a genre</option>
                  {genres?.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Release Date*
                  </label>
                  <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.releaseDate ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {errors.releaseDate && <p className="mt-1 text-sm text-red-600">{errors.releaseDate}</p>}
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
                    placeholder="e.g. 3:45"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lyrics" className="block text-sm font-medium text-gray-700 mb-1">
                  Lyrics
                </label>
                <textarea
                  id="lyrics"
                  name="lyrics"
                  value={formData.lyrics}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
                  placeholder="Enter song lyrics"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audio File*</label>
                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${errors.audioFile ? "border-red-500" : "border-gray-300"}`}
                >
                  <div className="space-y-1 text-center">
                    {audioPreview ? (
                      <div className="space-y-2">
                        <audio controls className="w-full">
                          <source src={audioPreview} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile("audio")}
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
                            htmlFor="audioFile"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#FF1742] hover:text-[#e0142d] focus-within:outline-none"
                          >
                            <span>Upload audio file</span>
                            <input
                              id="audioFile"
                              name="audioFile"
                              type="file"
                              accept="audio/*"
                              className="sr-only"
                              onChange={handleFileChange}
                              disabled={isLoading}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">MP3, WAV up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
                {errors.audioFile && <p className="mt-1 text-sm text-red-600">{errors.audioFile}</p>}
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
                          onClick={() => handleRemoveFile("image")}
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
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/songs"
              className="mr-3 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e0142d] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Saving..." : "Add Song"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SongNew

