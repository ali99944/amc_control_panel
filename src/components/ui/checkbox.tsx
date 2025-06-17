import React from 'react'
import { Check } from 'lucide-react'
import { cn } from "../../lib/utils"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              ref={ref}
              checked={checked}
              {...props}
            />
            <div className={cn(
              'w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 cursor-pointer',
              checked 
                ? 'bg-primary border-primary' 
                : 'border-gray-300 hover:border-gray-400',
              error && 'border-red-500',
              props.disabled && 'opacity-50 cursor-not-allowed',
              className
            )}>
              {checked && (
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              )}
            </div>
          </div>
          {(label || description) && (
            <div className="flex-1">
              {label && (
                <label className={cn(
                  'text-sm font-medium text-gray-900 cursor-pointer',
                  props.disabled && 'opacity-50 cursor-not-allowed'
                )}>
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
