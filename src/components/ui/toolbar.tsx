"use client"

import type React from "react"

interface ToolbarProps {
  title: string
  children?: React.ReactNode
  className?: string
}

export default function Toolbar({ title, children, className = "" }: ToolbarProps) {
  return (
    <div className={`bg-primary rounded-primary px-4 py-2 text-white/90 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">{title}</h1>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  )
}
