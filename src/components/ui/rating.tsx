"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "../../lib/utils"

interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  max?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  allowHalf?: boolean
  className?: string
}

export function Rating({
  value = 0,
  onChange,
  max = 5,
  size = "md",
  readonly = false,
  allowHalf = false,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating)
    }
  }

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverValue(rating)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null)
    }
  }

  const getStarValue = (index: number) => {
    const starValue = index + 1
    const currentValue = hoverValue ?? value

    if (allowHalf) {
      if (currentValue >= starValue) return "full"
      if (currentValue >= starValue - 0.5) return "half"
      return "empty"
    } else {
      return currentValue >= starValue ? "full" : "empty"
    }
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const starType = getStarValue(index)

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={cn(
              "transition-colors",
              !readonly && "hover:scale-110 transform transition-transform",
              readonly && "cursor-default",
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                starType === "full" && "fill-primary text-primary",
                starType === "half" && "fill-primary text-primary", // Simplified for now
                starType === "empty" && "text-gray-300",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
