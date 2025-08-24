"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Music, ChevronDown, ChevronLeft, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { closeSidebar } from "../../redux/reducers/sidebar_reducer"
import useMediaQuery from "../../hooks/use-media"
import { MenuItem, useMenuItems } from "./use-menu-items"


export default function Sidebar() {
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<string[]>(["music", "management"])
  const { isOpen } = useAppSelector(state => state.sidebar)
  const dispatch = useAppDispatch()
  const menuItems = useMenuItems()

  const onClose = () => {
    dispatch(closeSidebar())
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const isActive = (path?: string) => {
    if (!path) return false
    return location.pathname === path || (path === "/dashboard" && location.pathname === "/")
  }

  const isParentActive = (children?: MenuItem[]) => {
    if (!children) return false
    return children.some((child) => isActive(child.path))
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const itemIsActive = isActive(item.path)
    const parentIsActive = isParentActive(item.children)

    return (
      <div key={item.id} className="mb-1">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full flex cursor-pointer text-md items-center justify-between px-2 py-1.5 text-right rounded-lg transition-all duration-200 group ${
              parentIsActive 
                ? "bg-primary/10 shadow-sm text-primary" 
                : "text-gray-700 hover:text-primary hover:bg-gray-50"
            } ${level > 0 ? "mr-4 text-sm" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${parentIsActive ? "bg-primary/20 text-primary" : "bg-gray-100 group-hover:bg-primary/10 text-gray-600 group-hover:text-primary"}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {item.badge > 999 ? `${Math.floor(item.badge / 1000)}k` : item.badge}
                </span>
              )}
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 transition-transform" />
              ) : (
                <ChevronLeft className="w-4 h-4 transition-transform" />
              )}
            </div>
          </button>
        ) : (
          <Link
            to={item.path || "#"}
            className={`flex items-center justify-between px-2 py-1.5 rounded-lg transition-all duration-200 group ${
              itemIsActive
                ? "bg-primary text-white shadow-sm"
                : "text-gray-700 hover:text-primary hover:bg-gray-50"
            } ${level > 0 ? "mr-4 text-sm" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${itemIsActive ? "bg-white/20 text-white" : "bg-gray-100 group-hover:bg-primary/10 text-gray-600 group-hover:text-primary"}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            {item.badge && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                itemIsActive ? " text-white" : "bg-primary text-white"
              }`}>
                {item.badge > 999 ? `${Math.floor(item.badge / 1000)}k` : item.badge}
              </span>
            )}
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const isBelowLg = useMediaQuery("(max-width: 1023px)")

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`max-h-screen overflow-auto custom-scroll bottom-0 z-[70] w-70 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-white border-l border-gray-200 ${
          isOpen ? "translate-x-0" : "translate-x-full !w-0"
        } ${isBelowLg ? 'fixed top-0 right-0' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/80 to-primary rounded-lg flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">لوحة التحكم</h1>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-primary/15 rounded-lg p-4 ">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-gray-900 font-medium text-sm">نظام إدارة amc</p>
                <p className="text-gray-500 text-xs">الإصدار 2.1.0</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              آخر تحديث: ديسمبر 2024
            </div>
          </div>
        </div>
      </div>
    </>
  )
}