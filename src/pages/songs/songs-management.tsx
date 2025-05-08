"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetQuery } from "../../hooks/queries-actions"
import { EditIcon, PlayIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react"


const Songs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  // Fetch songs data
  const { data: songs, isLoading } = useGetQuery({
    key: ["songs"],
    url: "/api/songs",
    options: {
      enabled: false,
      initialData: [
        {
          id: 1,
          title: "Salam Ya Sudan",
          artist: "Ali Media",
          genre: "Traditional",
          releaseDate: "2023-01-15",
          duration: "3:45",
          plays: 45678,
        },
        {
          id: 2,
          title: "Khartoum Nights",
          artist: "Sudanese Stars",
          genre: "Modern",
          releaseDate: "2023-02-20",
          duration: "4:12",
          plays: 34567,
        },
        {
          id: 3,
          title: "Blue Nile",
          artist: "River Band",
          genre: "Folk",
          releaseDate: "2023-03-10",
          duration: "3:28",
          plays: 23456,
        },
        {
          id: 4,
          title: "Desert Rose",
          artist: "Oasis Group",
          genre: "Fusion",
          releaseDate: "2023-04-05",
          duration: "5:02",
          plays: 12345,
        },
        {
          id: 5,
          title: "Nubian Dreams",
          artist: "Ancient Sounds",
          genre: "Nubian",
          releaseDate: "2023-05-12",
          duration: "4:35",
          plays: 9876,
        },
        {
          id: 6,
          title: "City Lights",
          artist: "Urban Beats",
          genre: "Modern",
          releaseDate: "2023-06-18",
          duration: "3:55",
          plays: 8765,
        },
        {
          id: 7,
          title: "Sahara Wind",
          artist: "Desert Nomads",
          genre: "Traditional",
          releaseDate: "2023-07-22",
          duration: "4:48",
          plays: 7654,
        },
        {
          id: 8,
          title: "Moonlight Serenade",
          artist: "Night Owls",
          genre: "Classical",
          releaseDate: "2023-08-30",
          duration: "6:10",
          plays: 6543,
        },
        {
          id: 9,
          title: "River Dance",
          artist: "Water Spirits",
          genre: "Folk",
          releaseDate: "2023-09-14",
          duration: "3:22",
          plays: 5432,
        },
        {
          id: 10,
          title: "Urban Tales",
          artist: "City Dwellers",
          genre: "Pop",
          releaseDate: "2023-10-05",
          duration: "3:15",
          plays: 4321,
        },
      ],
    },
  })

  // Fetch genres for filter
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

  // Filter and sort songs
  const filteredSongs = songs?.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGenre = selectedGenre ? song.genre === selectedGenre : true

    return matchesSearch && matchesGenre
  })

  const sortedSongs = [...(filteredSongs || [])].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "artist":
        return a.artist.localeCompare(b.artist)
      case "plays":
        return b.plays - a.plays
      case "newest":
      default:
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    }
  })

  const handleDeleteSong = (id: number) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      // In a real app, this would call the delete mutation
      console.log("Deleting song with ID:", id)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Songs Management</h1>
          <p className="text-gray-600">Manage all songs in the system</p>
        </div>
        <Link
          to="/songs/new"
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e0142d] transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Song
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search songs or artists..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
            >
              <option value="">All Genres</option>
              {genres?.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="artist">Artist (A-Z)</option>
              <option value="plays">Most Played</option>
            </select>
          </div>
        </div>
      </div>

      {/* Songs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading songs...</div>
        ) : sortedSongs?.length === 0 ? (
          <div className="p-6 text-center">
            {searchTerm || selectedGenre ? "No songs match your search criteria." : "No songs found."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#EEF4F7]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Artist
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Plays
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSongs?.map((song) => (
                  <tr key={song.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                          <PlayIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{song.title}</div>
                          <div className="text-xs text-gray-500">{new Date(song.releaseDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{song.artist}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#EEF4F7] text-gray-800">
                        {song.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.plays.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/songs/${song.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        <EditIcon className="w-5 h-5" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <button onClick={() => handleDeleteSong(song.id)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-5 h-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Songs