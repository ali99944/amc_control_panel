"use client"

import type React from "react"
import { Home, LogOut, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { logout } from "../../redux/reducers/auth_reducer"
import { closeSidebar, openSidebar } from "../../redux/reducers/sidebar_reducer"

interface ToolbarProps {
  title: string
  children?: React.ReactNode
  className?: string
}

export default function Toolbar({ title, children, className = "" }: ToolbarProps) {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
    window.location.href = "/login"
  }

  const { isOpen } = useAppSelector(state => state.sidebar)

  const handleCloseSidebar = () => {
    dispatch(closeSidebar())
  }

  const handleOpenSidebar = () => {
    dispatch(openSidebar())
  }

  return (
    <div className={`bg-container/85 z-50 sticky top-4 rounded-lg px-2 py-2 text-white/90 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <div className="flex items-center gap-2">
            {
              !isOpen ? (
                <button onClick={handleOpenSidebar} className="text-black transition-colors cursor-pointer bg-white p-1.5 rounded">
                  <Menu size={24} />
                </button>
                  ) : (
                <button onClick={handleCloseSidebar} className="text-white transition-colors cursor-pointer bg-destructive p-1.5 rounded">
                  <X size={24} />
                </button>
                  )
            }
            
            <Link to="/" className="hover:text-white/70 transition-colors bg-primary p-1.5 rounded">
              <Home size={24} />
            </Link>
            
          </div>
          <h1 className="text-md">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {children && <div>{children}</div>}
          <button 
            onClick={handleLogout}
            className="hover:bg-destructive/85 bg-destructive p-2 rounded transition-colors text-white cursor-pointer"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
