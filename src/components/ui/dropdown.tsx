"use client"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal } from 'lucide-react'

interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  disabled?: boolean
  destructive?: boolean
}

interface DropdownProps {
  items: DropdownItem[]
  trigger?: React.ReactNode
  className?: string
  align?: "left" | "right"
}

export default function Dropdown({
  items,
  trigger,
  className = "",
  align = "right",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return
    item.onClick()
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {trigger || <MoreHorizontal size={16} />}
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full mt-1 bg-white border border-gray-200 rounded-lg z-50 min-w-48
            ${align === "right" ? "right-0" : "left-0"}
          `}
        >
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`
                w-full px-4 py-2 text-right transition-colors
                flex items-center gap-3
                ${item.disabled ? "text-gray-400 cursor-not-allowed" : ""}
                ${item.destructive ? "text-red-600 hover:bg-red-50" : "text-gray-900 hover:bg-gray-50"}
                ${index === 0 ? "rounded-t-lg" : ""}
                ${index === items.length - 1 ? "rounded-b-lg" : ""}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
