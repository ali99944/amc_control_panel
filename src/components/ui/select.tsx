"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export default function Select({ options, value, onChange, placeholder = "اختر...", className = "", size = "sm", disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  }

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={disabled ? undefined : () => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full border border-gray-200 bg-white rounded focus:outline-none focus:ring focus:ring-primary focus:border-primary transition-all duration-200 flex items-center justify-between text-right ${sizes[size]} ${className} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute border border-gray-300 top-full mt-2 w-full bg-white rounded-lg z-50 max-h-60 overflow-y-auto custom-scroll">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              disabled={disabled}
              className="w-full px-4 py-2 text-right hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {option.value === value && <Check className="w-4 h-4 text-accent" />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

