"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from 'lucide-react'

interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: Option[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  error?: boolean
}

export default function Select({
  options,
  value,
  placeholder = "اختر خيار...",
  onChange,
  disabled = false,
  className = "",
  error = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((opt) => opt.value === value) || null
  )
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option: Option) => {
    if (option.disabled) return
    setSelectedOption(option)
    onChange?.(option.value)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={selectRef} dir="rtl">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-2 py-2 text-right bg-white border rounded-lg gap-2 transition-colors
          flex items-center justify-between
          ${error ? "border-red-300" : "border-gray-200"}
          ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "hover:border-gray-300"}
          ${isOpen ? "border-primary" : ""}
          focus:outline-none focus:ring-2 focus:ring-primary/20
        `}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              disabled={option.disabled}
              className={`
                w-full px-4 py-2 text-right transition-colors
                flex items-center justify-between
                ${option.disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-50"}
                ${selectedOption?.value === option.value ? "bg-primary/10 text-primary" : ""}
              `}
            >
              <span>{option.label}</span>
              {selectedOption?.value === option.value && (
                <Check size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
