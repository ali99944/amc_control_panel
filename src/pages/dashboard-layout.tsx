"use client"

import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { LayoutDashboard, Users, Music, ListMusic, Settings, BarChart3, Menu, X, Bell, User, LogOut, Palette, Mic } from 'lucide-react'
import { Suspense } from 'react'

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { name: "إدارة المستخدمين", href: "/dashboard/users", icon: Users },
  { name: "إدارة الأغاني", href: "/dashboard/music", icon: Music },
  { name: "إدارة الفنانين", href: "/dashboard/artists", icon: Mic },
  { name: "إدارة الأنواع", href: "/dashboard/genres", icon: Palette },
  { name: "قوائم التشغيل", href: "/dashboard/playlists", icon: ListMusic },
  { name: "الإحصائيات", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "الإعدادات", href: "/dashboard/settings", icon: Settings },
]

export default function ControlPanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-[#f1f0ec]" dir="rtl">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/40 bg-opacity-50 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 max-h-screen overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ml-3">
                <span className="text-white font-bold text-sm">AMC</span>
              </div>
              <span className="text-gray-900 font-bold text-lg">مركز علي الإعلامي</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden text-gray-500 hover:text-primary cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-8 px-4 pb-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? "bg-primary text-white" 
                          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon size={20} className="ml-3" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center ml-3">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium text-sm">علي طارق</p>
                  <p className="text-gray-500 text-xs">مدير النظام</p>
                </div>
              </div>
              <button className="flex items-center mt-3 text-gray-500 hover:text-gray-700 text-sm">
                <LogOut size={16} className="ml-2" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pr-64">
          {/* Top navigation - Sticky */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <button 
                  onClick={() => setSidebarOpen(true)} 
                  className="lg:hidden text-gray-600 hover:text-primary"
                >
                  <Menu size={24} />
                </button>
              </div>

              <div className="flex items-center gap-x-4 ">
                <button className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </button>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="mr-2 text-sm font-medium text-gray-700">علي طارق</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </Suspense>
  )
}
