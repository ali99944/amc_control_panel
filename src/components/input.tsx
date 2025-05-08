import { LucideIcon } from 'lucide-react'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
}

export function Input({ 
  label, 
  error, 
  icon: Icon, 
  iconPosition = 'right', 
  className = '', 
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-base font-medium mb-1 text-right">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          className={`w-full bg-white border border-gray-200 rounded py-1.5 px-4 text-base focus:outline-none focus:ring placeholder:text-sm focus:ring-[#00998F] focus:border-[#00998F] transition-colors
            ${error ? 'border-red-500' : ''}
            ${iconPosition === 'left' ? 'pl-10' : ''}
            ${iconPosition === 'right' ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        
        {Icon && (
          <div className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${iconPosition === 'left' ? 'left-3' : 'right-3'}`}>
            <Icon className='w-4 h-4' />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 text-right">{error}</p>
      )}
    </div>
  )
}
