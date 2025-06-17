"use client"

import type React from "react"
import { useState, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface NotificationItem {
  id: string
  title: string
  message?: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: NotificationItem[]
  addNotification: (notification: Omit<NotificationItem, "id">) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const addNotification = (notification: Omit<NotificationItem, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification: NotificationItem = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  }

  const styles = {
    success: {
      container: "bg-green-50 border-green-200",
      icon: "text-green-600",
      title: "text-green-900",
      message: "text-green-700",
    },
    error: {
      container: "bg-red-50 border-red-200",
      icon: "text-red-600",
      title: "text-red-900",
      message: "text-red-700",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200",
      icon: "text-yellow-600",
      title: "text-yellow-900",
      message: "text-yellow-700",
    },
    info: {
      container: "bg-blue-50 border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-900",
      message: "text-blue-700",
    },
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}

      <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn("border rounded-lg p-4 shadow-sm backdrop-blur-sm", styles[notification.type].container)}
            >
              <div className="flex items-start space-x-3">
                <div className={cn("flex-shrink-0 mt-0.5", styles[notification.type].icon)}>
                  {icons[notification.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn("text-sm font-medium", styles[notification.type].title)}>{notification.title}</h4>
                  {notification.message && (
                    <p className={cn("text-sm mt-1", styles[notification.type].message)}>{notification.message}</p>
                  )}
                  {notification.action && (
                    <button
                      onClick={notification.action.onClick}
                      className={cn("text-sm font-medium mt-2 hover:underline", styles[notification.type].title)}
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>
                <button onClick={() => removeNotification(notification.id)} className="flex-shrink-0 ml-auto pl-3">
                  <X className="h-4 w-4 opacity-60 hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}

// Simple notification component for inline use
interface NotificationProps {
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  onClose?: () => void
  className?: string
}

export function Notification({ type, title, message, onClose, className }: NotificationProps) {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
  }

  const styles = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  }

  const textStyles = {
    success: { title: "text-green-900", message: "text-green-700" },
    error: { title: "text-red-900", message: "text-red-700" },
    warning: { title: "text-yellow-900", message: "text-yellow-700" },
    info: { title: "text-blue-900", message: "text-blue-700" },
  }

  return (
    <div className={cn("border rounded-lg p-4", styles[type], className)}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1 min-w-0">
          <h4 className={cn("text-sm font-medium", textStyles[type].title)}>{title}</h4>
          {message && <p className={cn("text-sm mt-1", textStyles[type].message)}>{message}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="flex-shrink-0 ml-auto pl-3">
            <X className="h-4 w-4 opacity-60 hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>
    </div>
  )
}
