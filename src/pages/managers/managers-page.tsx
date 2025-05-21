import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetQuery, useMutationAction } from "../../hooks/queries-actions";
import { EditIcon, SearchIcon, TrashIcon, UserPlusIcon } from "lucide-react";
import Manager from "../../types/manager";
import AddManagerModal from "./add-manager-modal";

const Managers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch managers data
  const { data: managers, isLoading, refetch } = useGetQuery<Manager[]>({
    key: ["managers"],
    url: "managers",
    options: {
      initialData: []
    }
  });

  // Delete user mutation
  const deleteMutation = useMutationAction({
    method: "delete",
    url: "", // Use a placeholder; we'll dynamically set the URL in mutate
    key: ["managers"],
    onSuccessCallback: () => {
      refetch();
    }
  });

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      // Call the mutation with the specific URL for the manager
      deleteMutation.mutate({ url: `/managers/${id}` });
    }
  };

  // Filter and sort managers
  const filteredUsers = managers?.filter(manager => {
    const matchesSearch = 
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (manager.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    // Since status isn't in the Manager type, we'll skip status filtering
    const matchesStatus = filterStatus === "all";
    
    return matchesSearch && matchesStatus;
  });

  const sortedUsers = [...(filteredUsers || [])].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "email":
        return (a.email || "").localeCompare(b.email || "");
      case "newest":
      default:
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
  });

  // Get manager role badge color
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "super_admin":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manager Management
          </h1>
          <p className="text-gray-600">Manage all managers in the system</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e0142d] transition-colors"
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Add New Manager
        </button>
      </div>
      {/* Add Manager Modal */}
      <AddManagerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => refetch()}
      />
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search managers..."
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
              <option value="email">Email (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Managers Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">Loading managers...</div>
        ) : sortedUsers?.length === 0 ? (
          <div className="p-6 text-center">
            {searchTerm || filterStatus !== "all"
              ? "No managers match your search criteria."
              : "No managers found."}
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Joined
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Login
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
                {sortedUsers?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-sm font-medium text-gray-900">
                        {user.email || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(
                          user.role
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_login
                        ? new Date(user.last_login).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/managers/${user.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <EditIcon className="w-5 h-5" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={user.role === "super_admin"}
                        title={
                          user.role === "super_admin"
                            ? "Cannot delete admin users"
                            : "Delete user"
                        }
                      >
                        <TrashIcon
                          className={`w-5 h-5 ${
                            user.role === "super_admin"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        />
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
  );
};

export default Managers;
