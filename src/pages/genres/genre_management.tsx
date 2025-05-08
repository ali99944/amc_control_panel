import { useState } from "react";
import { useGetQuery, useMutationAction } from "../../hooks/queries-actions";
import { EditIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import GenreModal from "./genre_modal";

const Genres = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);

  // Fetch genres data
  const { data: genres, isLoading, refetch } = useGetQuery({
    key: ["genres"],
    url: "/api/genres",
    options: {
      enabled: false,
      initialData: [
        { id: 1, name: "Pop", description: "Popular music", songCount: 245 },
        { id: 2, name: "Traditional", description: "Sudanese traditional music", songCount: 187 },
        { id: 3, name: "Folk", description: "Folk music from Sudan", songCount: 156 },
        { id: 4, name: "Modern", description: "Modern Sudanese music", songCount: 132 },
        { id: 5, name: "Classical", description: "Classical Arabic music", songCount: 98 },
        { id: 6, name: "Nubian", description: "Nubian traditional music", songCount: 76 },
        { id: 7, name: "Fusion", description: "Mix of traditional and modern", songCount: 64 },
      ]
    }
  });

  // Delete genre mutation
  const deleteMutation = useMutationAction({
    method: "delete",
    url: "/api/genres",
    key: ["genres"],
    onSuccessCallback: () => {
      refetch();
    }
  });

  const handleAddGenre = () => {
    setCurrentGenre(null);
    setIsModalOpen(true);
  };

  const handleEditGenre = (genre) => {
    setCurrentGenre(genre);
    setIsModalOpen(true);
  };

  const handleDeleteGenre = (id) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentGenre(null);
  };

  const filteredGenres = genres?.filter(genre => 
    genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    genre.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Genre Management</h1>
          <p className="text-gray-600">Manage music genres in the system</p>
        </div>
        <button
          onClick={handleAddGenre}
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e0142d] transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Genre
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search genres..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Genres Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading genres...</div>
        ) : filteredGenres?.length === 0 ? (
          <div className="p-6 text-center">
            {searchTerm ? "No genres match your search." : "No genres found."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#EEF4F7]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Songs
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGenres?.map((genre) => (
                  <tr key={genre.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{genre.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{genre.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{genre.songCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditGenre(genre)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <EditIcon className="w-5 h-5" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteGenre(genre.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={genre.songCount > 0}
                        title={genre.songCount > 0 ? "Cannot delete genre with songs" : "Delete genre"}
                      >
                        <TrashIcon className={`w-5 h-5 ${genre.songCount > 0 ? 'opacity-50 cursor-not-allowed' : ''}`} />
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

      {/* Genre Modal */}
      {isModalOpen && (
        <GenreModal
          genre={currentGenre}
          onClose={handleCloseModal}
          onRefresh={refetch}
        />
      )}
    </div>
  );
};

export default Genres;
