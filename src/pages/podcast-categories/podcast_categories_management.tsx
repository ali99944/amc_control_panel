"use client"

import { useState, useEffect } from "react"
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  TagIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline"

// Mock API functions
const fetchPodcastCategories = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "News & Politics",
          description: "Latest news and political discussions from Sudan and around the world",
          image: "/placeholder.svg?height=80&width=80",
          podcastCount: 12,
          featured: true,
          createdAt: "2023-01-15",
        },
        {
          id: 2,
          name: "Culture & Heritage",
          description: "Exploring Sudanese culture, traditions, and heritage",
          image: "/placeholder.svg?height=80&width=80",
          podcastCount: 8,
          featured: true,
          createdAt: "2023-02-20",
        },
        {
          id: 3,
          name: "Music & Entertainment",
          description: "Discussions about Sudanese music, artists, and entertainment",
          image: "/placeholder.svg?height=80&width=80",
          podcastCount: 15,
          featured: false,
          createdAt: "2023-03-05",
        },
        {
          id: 4,
          name: "Education",
          description: "Educational content for students and lifelong learners",
          image: "/placeholder.svg?height=80&width=80",
          podcastCount: 10,
          featured: false,
          createdAt: "2023-04-10",
        },
        {
          id: 5,
          name: "Business & Economy",
          description: "Business news, economic analysis, and entrepreneurship",
          image: "/placeholder.svg?height=80&width=80",
          podcastCount: 7,
          featured: true,
          createdAt: "2023-05-15",
        },
        {
          id: 6,
          name: "Health & Wellness",
          description: "Health tips, medical information, and wellness practices",
          image: "/placeholder.svg?height=80&width=80",
          podcastCount: 9,
          featured: false,
          createdAt: "2023-06-20",
        },
      ])
    }, 500)
  })
}

const createPodcastCategory = (categoryData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        ...categoryData,
        podcastCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      })
    }, 500)
  })
}

const updatePodcastCategory = (categoryId, categoryData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: categoryId, ...categoryData })
    }, 500)
  })
}

const deletePodcastCategory = (categoryId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

export default function PodcastCategoriesManagement() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: false,
    image: null,
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      const data = await fetchPodcastCategories()
      setCategories(data)
    } catch (error) {
      console.error("Error loading podcast categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (!formData.name.trim()) errors.name = "Category name is required"
    if (!formData.description.trim()) errors.description = "Description is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const newCategory = await createPodcastCategory({
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        image: formData.image ? "/placeholder.svg?height=80&width=80" : "/placeholder.svg?height=80&width=80",
      })

      setCategories([...categories, newCategory])
      setShowAddModal(false)
      resetForm()
    } catch (error) {
      console.error("Error adding podcast category:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditCategory = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const updatedCategory = await updatePodcastCategory(currentCategory.id, {
        ...formData,
        // In a real app, we'd use the uploaded file URL here
        image: formData.image ? "/placeholder.svg?height=80&width=80" : currentCategory.image,
        podcastCount: currentCategory.podcastCount,
        createdAt: currentCategory.createdAt,
      })

      setCategories(categories.map((category) => (category.id === currentCategory.id ? updatedCategory : category)))
      setShowEditModal(false)
    } catch (error) {
      console.error("Error updating podcast category:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async () => {
    setLoading(true)
    try {
      await deletePodcastCategory(currentCategory.id)
      setCategories(categories.filter((category) => category.id !== currentCategory.id))
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Error deleting podcast category:", error)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  const openEditModal = (category) => {
    setCurrentCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      featured: category.featured,
      image: category.image,
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (category) => {
    setCurrentCategory(category)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      featured: false,
      image: null,
    })
    setFormErrors({})
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Podcast Category Management</h1>
        <button onClick={openAddModal} className="flex items-center px-4 py-2 bg-[#FF1742] text-white rounded">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories by name or description..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#FF1742]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && !categories.length ? (
          <div className="col-span-full p-8 text-center text-gray-500">Loading categories...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500">No categories found</div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="p-4 flex items-start space-x-4">
                <img
                  src={category.image || "/placeholder.svg?height=80&width=80"}
                  alt={category.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black truncate">{category.name}</h3>
                    {category.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">{category.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-3">Podcasts: {category.podcastCount}</span>
                    <span>Created: {category.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 p-3 flex justify-end">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Edit Category"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(category)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete Category"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Category Modal */}
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
                  <h3 className="text-lg font-medium text-black">Add New Category</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleAddCategory}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">
                      Category Name
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
                      placeholder="Enter category name"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
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
                      placeholder="Enter category description"
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
                        Featured Category
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-black">
                      Category Image
                    </label>
                    <div className="border border-gray-200 rounded p-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <TagIcon className="w-10 h-10 mb-3 text-gray-400" />
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
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 border border-gray-200 rounded text-black"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-[#FF1742] text-white rounded" disabled={loading}>
                      {loading ? "Adding..." : "Add Category"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
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
                  <h3 className="text-lg font-medium text-black">Edit Category</h3>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleEditCategory}>
                  <div className="mb-4">
                    <label htmlFor="edit-name" className="block mb-2 text-sm font-medium text-black">
                      Category Name
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
                        Featured Category
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="edit-image" className="block mb-2 text-sm font-medium text-black">
                      Category Image (Leave empty to keep current)
                    </label>
                    <div className="border border-gray-200 rounded p-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="edit-image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <TagIcon className="w-10 h-10 mb-3 text-gray-400" />
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

      {/* Delete Category Modal */}
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
                  <h3 className="text-lg font-medium text-black">Delete Category</h3>
                  <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-black">Confirm Deletion</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the category "{currentCategory?.name}"? This action cannot be
                        undone and will remove all associated podcasts from this category.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeleteCategory}
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
