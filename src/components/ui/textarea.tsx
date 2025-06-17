import React from "react"
import { cn } from "../../lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, icon, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "p-2 text-sm min-h-[80px]",
      md: "p-3 min-h-[100px]",
      lg: "p-4 text-lg min-h-[120px]",
    }

    const iconSizeClasses = {
      sm: "pt-8",
      md: "pt-10",
      lg: "pt-12",
    }

    const iconPositionClasses = {
      sm: "top-2 left-2",
      md: "top-3 left-3",
      lg: "top-4 left-4",
    }

    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {icon && <div className={cn("absolute text-gray-400 z-10", iconPositionClasses[size])}>{icon}</div>}
          <textarea
            className={cn(
              "w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical",
              sizeClasses[size],
              icon && iconSizeClasses[size],
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = "Textarea"
