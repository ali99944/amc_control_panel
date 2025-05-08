import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "react-feather";
import { useMutationAction } from "../../hooks/queries-actions";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAdminModal({ isOpen, onClose, onSuccess }: AddAdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin" as "admin" | "moderator",
    permissions: {
      users: true,
      songs: true,
      playlists: true,
      settings: false,
      analytics: false
    }
  });

  // Add admin mutation
  const addAdminMutation = useMutationAction<{ success: boolean }, typeof formData>({
    url: "/api/users/add-admin",
    method: "post",
    onSuccessCallback: () => {
      onSuccess();
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "admin",
        permissions: {
          users: true,
          songs: true,
          playlists: true,
          settings: false,
          analytics: false
        }
      });
    }
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle permission change
  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked
      }
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAdminMutation.mutate(formData);
  };

  // Modal animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <motion.div
            variants={modalVariants}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg w-full max-w-md"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Add Admin</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF1742]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF1742]"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF1742]"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF1742]"
                  >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="users"
                        name="users"
                        checked={formData.permissions.users}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                      />
                      <label htmlFor="users" className="ml-2 text-sm text-gray-700">
                        User Management
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="songs"
                        name="songs"
                        checked={formData.permissions.songs}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                      />
                      <label htmlFor="songs" className="ml-2 text-sm text-gray-700">
                        Song Management
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="playlists"
                        name="playlists"
                        checked={formData.permissions.playlists}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                      />
                      <label htmlFor="playlists" className="ml-2 text-sm text-gray-700">
                        Playlist Management
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="settings"
                        name="settings"
                        checked={formData.permissions.settings}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                      />
                      <label htmlFor="settings" className="ml-2 text-sm text-gray-700">
                        Settings Management
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="analytics"
                        name="analytics"
                        checked={formData.permissions.analytics}
                        onChange={handlePermissionChange}
                        className="h-4 w-4 text-[#FF1742] focus:ring-[#FF1742] border-gray-300 rounded"
                      />
                      <label htmlFor="analytics" className="ml-2 text-sm text-gray-700">
                        Analytics Access
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={addAdminMutation.isPending}
                  className="px-4 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e01539] disabled:opacity-70"
                >
                  {addAdminMutation.isPending ? "Adding..." : "Add Admin"}
                </motion.button>
              </div>

              {addAdminMutation.isError && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  An error occurred while adding the admin. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
