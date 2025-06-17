"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/utils"

interface DataPoint {
  label: string
  value: number
}

interface AreaChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
  showLine?: boolean
  showDots?: boolean
  className?: string
  animate?: boolean
}

export function AreaChart({
  data,
  width = 400,
  height = 200,
  color = "#4f46e5",
  showLine = true,
  showDots = false,
  className,
  animate = true,
}: AreaChartProps) {
  if (!data.length) return null

  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const valueRange = maxValue - minValue || 1

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth
    const y = padding + ((maxValue - point.value) / valueRange) * chartHeight
    return { x, y, ...point }
  })

  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? "M" : "L"
    return `${path} ${command} ${point.x} ${point.y}`
  }, "")

  const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <div className={cn("relative", className)}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`area-gradient-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#area-gradient-${color.replace("#", "")})`}
          initial={animate ? { opacity: 0, scaleY: 0 } : {}}
          animate={animate ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: `center ${height - padding}px` }}
        />

        {/* Line */}
        {showLine && (
          <motion.path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animate ? { pathLength: 0 } : {}}
            animate={animate ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}

        {/* Data points */}
        {showDots &&
          points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={3}
              fill={color}
              stroke="white"
              strokeWidth={2}
              className="cursor-pointer"
              initial={animate ? { scale: 0 } : {}}
              animate={animate ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.5 }}
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </motion.circle>
          ))}

        {/* Y-axis labels */}
        {[maxValue, (maxValue + minValue) / 2, minValue].map((value, index) => (
          <text
            key={index}
            x={padding - 10}
            y={padding + (index * chartHeight) / 2 + 5}
            textAnchor="end"
            className="text-xs fill-gray-500"
          >
            {Math.round(value)}
          </text>
        ))}

        {/* X-axis labels */}
        {points.map((point, index) => (
          <text key={index} x={point.x} y={height - padding + 20} textAnchor="middle" className="text-xs fill-gray-500">
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  )
}
