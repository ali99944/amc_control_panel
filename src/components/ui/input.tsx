import React from "react"
import { cn } from "../../lib/utils"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  icon?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-4 text-lg"
    }

    const iconSizeClasses = {
      sm: "pl-8",
      md: "pl-10", 
      lg: "pl-12"
    }

    const iconPositionClasses = {
      sm: "left-2.5",
      md: "left-3",
      lg: "left-4"
    }

    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {icon && (
            <div className={cn("absolute top-1/2 transform -translate-y-1/2 text-gray-400", iconPositionClasses[size])}>
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors",
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

Input.displayName = "Input"
