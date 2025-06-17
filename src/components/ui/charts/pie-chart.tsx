"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/utils"

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface PieChartProps {
  data: DataPoint[]
  size?: number
  innerRadius?: number
  showLabels?: boolean
  showLegend?: boolean
  className?: string
  animate?: boolean
}

const defaultColors = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

export function PieChart({
  data,
  size = 200,
  innerRadius = 0,
  showLabels = true,
  showLegend = true,
  className,
  animate = true,
}: PieChartProps) {
  if (!data.length) return null

  const radius = size / 2 - 10
  const centerX = size / 2
  const centerY = size / 2

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = -90 // Start from top

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const largeArcFlag = angle > 180 ? 1 : 0

    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)

    const innerX1 = centerX + innerRadius * Math.cos(startAngleRad)
    const innerY1 = centerY + innerRadius * Math.sin(startAngleRad)
    const innerX2 = centerX + innerRadius * Math.cos(endAngleRad)
    const innerY2 = centerY + innerRadius * Math.sin(endAngleRad)

    const pathData = innerRadius
      ? `M ${innerX1} ${innerY1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${innerX2} ${innerY2} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1} Z`
      : `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

    // Label position
    const labelAngle = (startAngle + endAngle) / 2
    const labelAngleRad = (labelAngle * Math.PI) / 180
    const labelRadius = (radius + innerRadius) / 2 + (innerRadius ? 0 : radius * 0.3)
    const labelX = centerX + labelRadius * Math.cos(labelAngleRad)
    const labelY = centerY + labelRadius * Math.sin(labelAngleRad)

    currentAngle += angle

    return {
      ...item,
      pathData,
      percentage,
      color: item.color || defaultColors[index % defaultColors.length],
      labelX,
      labelY,
      angle,
    }
  })

  return (
    <div className={cn("flex items-center space-x-6", className)}>
      <div className="relative">
        <svg width={size} height={size} className="overflow-visible">
          {segments.map((segment, index) => (
            <g key={index}>
              <motion.path
                d={segment.pathData}
                fill={segment.color}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                initial={animate ? { scale: 0 } : {}}
                animate={animate ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              >
                <title>{`${segment.label}: ${segment.value} (${segment.percentage.toFixed(1)}%)`}</title>
              </motion.path>

              {/* Labels */}
              {showLabels && segment.percentage > 5 && (
                <motion.text
                  x={segment.labelX}
                  y={segment.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-white"
                  initial={animate ? { opacity: 0 } : {}}
                  animate={animate ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                >
                  {segment.percentage.toFixed(0)}%
                </motion.text>
              )}
            </g>
          ))}

          {/* Center text for donut charts */}
          {innerRadius > 0 && (
            <motion.g
              initial={animate ? { opacity: 0, scale: 0 } : {}}
              animate={animate ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <text x={centerX} y={centerY - 5} textAnchor="middle" className="text-lg font-bold fill-gray-900">
                {total}
              </text>
              <text x={centerX} y={centerY + 12} textAnchor="middle" className="text-xs fill-gray-500">
                Total
              </text>
            </motion.g>
          )}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              initial={animate ? { opacity: 0, x: 20 } : {}}
              animate={animate ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
            >
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: segment.color }} />
              <span className="text-sm text-gray-700">{segment.label}</span>
              <span className="text-sm text-gray-500">({segment.percentage.toFixed(1)}%)</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
