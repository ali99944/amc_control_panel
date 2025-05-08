import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ 
  label, 
  error, 
  className = '', 
  rows = 4,
  ...props 
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-base font-medium mb-1 text-right">
          {label}
        </label>
      )}
      
      <textarea
        rows={rows}
        className={`w-full border-2 border-[#D3EBE8] outline-none rounded-sm py-2 px-4 text-base focus:outline-none focus:ring-1 focus:ring-[#00998F] focus:border-[#00998F] transition-colors resize-vertical
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500 text-right">{error}</p>
      )}
    </div>
  )
}
