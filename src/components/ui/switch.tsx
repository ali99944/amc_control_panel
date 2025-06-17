import React from 'react'
import { cn } from "../../lib/utils"

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, error, checked, onChange, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {label && (
              <label className={cn(
                'text-sm font-medium text-gray-900',
                props.disabled && 'opacity-50'
              )}>
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              ref={ref}
              checked={checked}
              onChange={onChange}
              {...props}
            />
            <div
              className={cn(
                'w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer relative',
                checked ? 'bg-primary' : 'bg-gray-300',
                props.disabled && 'opacity-50 cursor-not-allowed',
                error && 'ring-2 ring-red-500',
                className
              )}
              onClick={() => !props.disabled && onChange?.({ target: { checked: !checked } } as any)}
            >
              <div className={cn(
                'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 shadow-sm',
                checked ? 'translate-x-[25px]' : 'translate-x-0.5'
              )} />
            </div>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
