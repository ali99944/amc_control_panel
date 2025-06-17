import React, { useState, useRef } from 'react'
import { cn } from "../../lib/utils"
// import { Tooltip } from './tooltip'

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  min?: number
  max?: number
  step?: number
  value?: number
  onValueChange?: (value: number) => void
  showValue?: boolean
  formatValue?: (value: number) => string
  error?: string
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    className, 
    label, 
    min = 0, 
    max = 100, 
    step = 1, 
    value = 50, 
    onValueChange,
    showValue = true,
    formatValue = (val) => val.toString(),
    error,
    ...props 
  }) => {
    const [isDragging, setIsDragging] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)
    const sliderRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setCurrentValue(newValue)
      onValueChange?.(newValue)
    }

    const percentage = ((currentValue - min) / (max - min)) * 100

    return (
      <div className="space-y-3">
        {label && (
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            {showValue && (
              <span className="text-sm text-gray-600 font-medium">
                {formatValue(currentValue)}
              </span>
            )}
          </div>
        )}
        
        <div className="relative">
          <input
            ref={sliderRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className={cn(
              'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-custom',
              error && 'ring-2 ring-red-500',
              className
            )}
            style={{
              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
            }}
            {...props}
          />
          
          {isDragging && (
            <div 
              className="absolute -top-6 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap transform -translate-x-1/2 z-10"
              style={{ left: `${percentage}%` }}
            >
              {formatValue(currentValue)}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
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

Slider.displayName = 'Slider'
