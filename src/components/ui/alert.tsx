"use client"

import type React from "react"

import { cn } from "../../lib/utils"
import { CheckCircle, AlertTriangle, Info, AlertCircle, X } from "lucide-react"

interface AlertProps {
  variant?: "info" | "success" | "warning" | "error"
  title?: string
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

export function Alert({ variant = "info", title, children, onClose, className }: AlertProps) {
  const variants = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <Info className="h-5 w-5 text-blue-600" />,
      title: "text-blue-900",
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: "text-green-900",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      title: "text-yellow-900",
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      title: "text-red-900",
    },
  }

  const config = variants[variant]

  return (
    <div className={cn("border rounded-lg p-4", config.container, className)}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
        <div className="flex-1 min-w-0">
          {title && <h3 className={cn("text-sm font-medium mb-1", config.title)}>{title}</h3>}
          <div className="text-sm">{children}</div>
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
