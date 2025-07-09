"use client"

import type { TextareaHTMLAttributes, ReactNode } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "sm" | "md" | "lg"
  error?: string
  label?: ReactNode
}

export default function Textarea({ size = "md", error, label, className = "", ...props }: TextareaProps) {
  const baseClasses =
    "border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary focus:border-primary transition-all duration-200 resize-none"

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  }

  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea
        className={`${baseClasses} ${sizes[size]} ${errorClasses} ${className} w-full text-right`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 text-right">{error}</p>
      )}
    </div>
  )
}

