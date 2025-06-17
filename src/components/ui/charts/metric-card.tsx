"use client"

import type React from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "../../../lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  color?: string
  className?: string
  animate?: boolean
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon,
  color = "#4f46e5",
  className,
  animate = true,
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) return <Minus className="h-4 w-4" />
    return change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
  }

  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-gray-500"
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  const getTrendBg = () => {
    if (change === undefined || change === 0) return "bg-gray-100"
    return change > 0 ? "bg-green-100" : "bg-red-100"
  }

  return (
    <motion.div
      className={cn("bg-gray-50 rounded-lg p-4 border border-gray-200", className)}
      initial={animate ? { opacity: 0, y: 20 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    //   whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20`, color }}>
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <motion.div
          className="text-3xl font-bold text-gray-900"
          initial={animate ? { opacity: 0, scale: 0.5 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {value}
        </motion.div>

        {change !== undefined && (
          <motion.div
            className="flex items-center space-x-1"
            initial={animate ? { opacity: 0, x: -10 } : {}}
            animate={animate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div
              className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                getTrendBg(),
                getTrendColor(),
              )}
            >
              {getTrendIcon()}
              <span>{Math.abs(change)}%</span>
            </div>
            <span className="text-xs text-gray-500">{changeLabel}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
