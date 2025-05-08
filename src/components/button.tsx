import React from 'react'
import { Loader2, type LucideIcon } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-[#00998F] text-white hover:bg-[#00998F]/90',
    secondary: 'bg-[#D2EAE8] text-[#00998F] hover:bg-[#D2EAE8]/80',
    outline: 'bg-transparent text-[#00998F] border border-[#00998F] hover:bg-[#D2EAE8]/30',
    ghost: 'bg-transparent text-[#00998F] hover:bg-[#D2EAE8]/30',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }
  
  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2 px-6'
  }

  const spinnerSizes = {
    sm: 14,
    md: 16,
    lg: 20
  }
  
  return (
    <button
      className={`rounded-sm max-w-fit font-medium transition-colors focus:outline-none  ${
        variantClasses[variant]
      } ${
        sizeClasses[size]
      } ${
        fullWidth ? 'w-full' : ''
      } ${
        Icon || loading ? 'flex items-center justify-center gap-2' : ''
      } ${
        loading || disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={spinnerSizes[size]} />
      ) : (
        Icon && iconPosition === 'left' && <Icon className='w-4 h-4' />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className='w-4 h-4' />}
    </button>
  )
}

interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: LucideIcon
  label?: string
}

export function IconButton({ 
  icon: Icon, 
  label,
  variant = 'primary', 
  size = 'md', 
  loading = false,
  className = '',
  disabled,
  ...props 
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  }

  const spinnerSizes = {
    sm: 14,
    md: 16,
    lg: 20
  }
  
  return (
    <button
      className={`rounded flex max-w-fit items-center justify-center transition-colors focus:outline-none ${
        variantClasses[variant]
      } ${
        sizeClasses[size]
      } ${
        loading || disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      aria-label={label}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={spinnerSizes[size]} />
      ) : (
        <Icon className='w-4 h-4' />
      )}
    </button>
  )
}

const variantClasses = {
  primary: 'bg-[#00998F] text-white hover:bg-[#00998F]/90',
  secondary: 'bg-[#D2EAE8] text-[#00998F] hover:bg-[#D2EAE8]/80',
  outline: 'bg-transparent text-[#00998F] border border-[#00998F] hover:bg-[#D2EAE8]/30',
  ghost: 'bg-transparent text-[#00998F] hover:bg-[#D2EAE8]/30',
  danger: 'bg-red-500 text-white hover:bg-red-600'
}