"use client"

import { LucideIcon } from "lucide-react"
import { InputHTMLAttributes, ReactNode } from "react"

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: "sm" | "md" | "lg"
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  label?: ReactNode
  error?: string
}

export function Input({ 
  inputSize = "sm", 
  icon: Icon, 
  iconPosition = "right", 
  label,
  error,
  className = "", 
  ...props 
}: InputProps) {
  const baseClasses = "border bg-white border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary focus:border-primary transition-all duration-200 w-full"
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg"
  }

  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""

  if (Icon) {
    return (
      <div className="relative">
        {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
        <input 
          className={`${baseClasses} ${sizes[inputSize]} ${iconPosition === 'right' ? 'pr-10' : 'pl-10'} ${errorClasses} ${className}`}
          {...props}
        />
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${iconPosition === 'right' ? 'right-3' : 'left-3'} text-gray-400`}>
          {<Icon className="w-4 h-4" />}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  if (label) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input 
          className={`${baseClasses} ${sizes[inputSize]} ${errorClasses} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      <input 
        className={`${baseClasses} ${sizes[inputSize]} ${errorClasses} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
