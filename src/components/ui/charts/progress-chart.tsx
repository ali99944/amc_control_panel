"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/utils"

interface ProgressChartProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showValue?: boolean
  label?: string
  className?: string
  animate?: boolean
}

export function ProgressChart({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = "#4f46e5",
  backgroundColor = "#e5e7eb",
  showValue = true,
  label,
  className,
  animate = true,
}: ProgressChartProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min((value / max) * 100, 100)
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={animate ? { strokeDashoffset: circumference } : { strokeDashoffset }}
          animate={animate ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <motion.span
            className="text-2xl font-bold text-gray-900"
            initial={animate ? { opacity: 0, scale: 0 } : {}}
            animate={animate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
        )}
        {label && (
          <motion.span
            className="text-xs text-gray-500 mt-1"
            initial={animate ? { opacity: 0 } : {}}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  )
}
