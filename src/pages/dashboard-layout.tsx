import { ChartBarIcon, CogIcon, HomeIcon, LogOutIcon, MenuIcon, MusicIcon, PlayIcon, UsersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";


const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { path: "/users", label: "Users", icon: <UsersIcon className="w-5 h-5" /> },
    { path: "/songs", label: "Songs", icon: <MusicIcon className="w-5 h-5" /> },
    { path: "/playlists", label: "Playlists", icon: <PlayIcon className="w-5 h-5" /> },
    { path: "/settings", label: "Settings", icon: <CogIcon className="w-5 h-5" /> },
    { path: "/analytics", label: "Analytics", icon: <ChartBarIcon className="w-5 h-5" /> },
    { path: "/managers", label: "Managers", icon: <UsersIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-[#EEF4F7]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-[#FF1742]">Ali Media Center</h1>
            <button 
              className="absolute right-4 top-4 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-sm rounded-lg ${
                        isActive 
                          ? "bg-[#FF1742] text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    end={item.path === "/"}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#FF1742] flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || "A"}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-auto p-1 text-gray-500 hover:text-[#FF1742]"
                title="Logout"
              >
                <LogOutIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <button
            className="p-1 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="ml-4 lg:ml-0">
            <h2 className="text-lg font-medium text-gray-900">Admin Dashboard</h2>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
