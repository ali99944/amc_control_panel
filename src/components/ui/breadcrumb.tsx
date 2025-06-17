import type React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
}

export function Breadcrumb({ items, separator, className }: BreadcrumbProps) {
  const defaultSeparator = <ChevronRight className="h-4 w-4 text-gray-400" />

  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && (separator || defaultSeparator)}

          <div className="flex items-center space-x-1 group">
            {item.icon && (
              <span className={cn("text-gray-500 group-hover:text-primary", index === items.length - 1 && "text-gray-900 group-hover:text-gray-900")}>{item.icon}</span>
            )}

            {item.href ? (
              <a href={item.href} className="text-gray-600 group-hover:text-primary transition-colors">
                {item.label}
              </a>
            ) : (
              <span className={cn(index === items.length - 1 ? "text-gray-900 font-medium" : "text-gray-600")}>
                {item.label}
              </span>
            )}
          </div>
        </div>
      ))}
    </nav>
  )
}
