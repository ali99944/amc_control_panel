"use client"

import { useState } from "react"
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { LayoutDashboard, Users, Music, ListMusic, Settings, BarChart3, Menu, X, User, LogOut, Palette, Mic, Shield, TagsIcon, ShieldAlertIcon } from 'lucide-react'
import { Suspense } from 'react'
import Dropdown from "../ui/dropdown"
import Avatar from "../ui/avatar"
import { useAppDispatch } from "../../redux/hook"
import { logout } from "../../redux/reducers/auth_reducer"

const navigation = [
  { name: "لوحة التحكم", href: "", icon: LayoutDashboard },
  { name: "إدارة المستخدمين", href: "/users", icon: Users },
  { name: "إدارة المديرين", href: "/managers", icon: Shield },
  { name: "إدارة الأغاني", href: "/songs", icon: Music },
  { name: "إدارة الفنانين", href: "/artists", icon: Mic },
  { name: "إدارة الأنواع", href: "/genres", icon: Palette },
  { name: "ادارة الكلمات المفتاحية", href: "tags", icon: TagsIcon },
  { name: "قوائم التشغيل", href: "/playlists", icon: ListMusic },
  // { name: "الإشعارات", href: "/notifications", icon: BellRing },
  { name: "الإحصائيات", href: "/analytics", icon: BarChart3 },
  { name: "التقارير", href: "/reports", icon: BarChart3 },
  { name: "الإعدادات", href: "/settings", icon: Settings },
  { name: "سياسة الخصوصية", href: "/privacy-policy", icon: ShieldAlertIcon },
  { name: "الشروط و الحقوق", href: "/terms-conditions", icon: ShieldAlertIcon },
]

export default function ControlPanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleDashboardHomeNavigation = () => {
    navigate('/')
  }

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-[100vh] max-h-[100vh] bg-background flex" dir="rtl">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/40 bg-opacity-50 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-50 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 max-h-screen overflow-y-auto custom-scroll ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 sticky top-0">
            <div className="flex items-center gap-2">
              <Avatar alt="amc" size="sm" onClick={handleDashboardHomeNavigation} />
              <span className="text-gray-900 font-bold text-lg">AMC PROJECT</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden text-gray-500 hover:text-primary cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-4 px-4 pb-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
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

          {/* تم نقل زر تسجيل الخروج إلى القائمة المنسدلة للمستخدم */}
        </div>

        {/* Main content */}
        <div className="">
          {/* Top navigation - Sticky */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <button 
                  onClick={() => setSidebarOpen(true)} 
                  className="lg:hidden text-gray-600 hover:text-primary cursor-pointer"
                >
                  <Menu size={24} />
                </button>
              </div>

              <div className="flex items-center gap-x-4 ">
                {/* <Dropdown
                  trigger={
                    <button className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg">
                      <Bell size={20} />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 ring-2 ring-white rounded-full"></span>
                    </button>
                  }
                  content={
                    <div className="w-72 max-h-80 overflow-y-auto custom-scroll py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900">الإشعارات</h3>
                      </div>
                      
                      <div className="divide-y divide-gray-100">
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 ml-3 mt-1">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Music size={14} className="text-primary" />
                              </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-medium text-gray-900">تمت إضافة أغنية جديدة</p>
                              <p className="text-xs text-gray-500 truncate">تمت إضافة أغنية "اسم الأغنية" بواسطة الفنان "اسم الفنان"</p>
                              <p className="text-xs text-gray-400 mt-1">منذ 5 دقائق</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 ml-3 mt-1">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Users size={14} className="text-green-600" />
                              </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-medium text-gray-900">مستخدم جديد</p>
                              <p className="text-xs text-gray-500 truncate">قام "اسم المستخدم" بالتسجيل في التطبيق</p>
                              <p className="text-xs text-gray-400 mt-1">منذ ساعة</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 ml-3 mt-1">
                              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <BarChart3 size={14} className="text-yellow-600" />
                              </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-medium text-gray-900">تقرير جديد</p>
                              <p className="text-xs text-gray-500 truncate">تم إنشاء تقرير الإحصائيات الشهري</p>
                              <p className="text-xs text-gray-400 mt-1">منذ يومين</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 py-2 border-t border-gray-100 mt-1">
                        <Link to="/notifications" className="block w-full text-center text-sm text-primary hover:text-primary-dark py-1">
                          عرض كل الإشعارات
                        </Link>
                      </div>
                    </div>
                  }
                  position='bottom-left'
                  closeOnClick={false}
                  contentClassName="p-0"
                /> */}
                
                <Dropdown
                  trigger={
                    <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <span className="mr-2 text-sm font-medium text-gray-700">علي السوداني</span>
                    </div>
                  }
                  content={
                    <div className="w-56">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">علي السوداني</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                      </div>
                      
                      {/* <div className="py-2">
                        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User size={16} className="ml-2 text-gray-500" />
                          الملف الشخصي
                        </button>
                        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Settings size={16} className="ml-2 text-gray-500" />
                          الإعدادات
                        </button>
                      </div> */}
                      
                      <div className="py-2 border-t border-gray-100">
                        <button 
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-300">
                          <LogOut size={16} className="ml-2" />
                          تسجيل الخروج
                        </button>
                      </div>
                    </div>
                  }
                  position='bottom-left'
                  contentClassName="p-0"
                />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-4 w-[calc(100vw-250px)] max-lg:w-[100vw] h-[90vh] max-h-[100vh] overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </Suspense>
  )
}
