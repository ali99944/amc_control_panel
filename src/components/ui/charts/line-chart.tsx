"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/utils"

interface DataPoint {
  label: string
  value: number
}

interface LineChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
  showDots?: boolean
  showGrid?: boolean
  className?: string
  animate?: boolean
}

export function LineChart({
  data,
  width = 400,
  height = 200,
  color = "#4f46e5",
  strokeWidth = 2,
  showDots = true,
  showGrid = true,
  className,
  animate = true,
}: LineChartProps) {
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
        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {/* Horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <line
                key={ratio}
                x1={padding}
                y1={padding + ratio * chartHeight}
                x2={width - padding}
                y2={padding + ratio * chartHeight}
                stroke="#94a3b8"
                strokeWidth={1}
              />
            ))}
            {/* Vertical grid lines */}
            {points.map((point, index) => (
              <line
                key={index}
                x1={point.x}
                y1={padding}
                x2={point.x}
                y2={height - padding}
                stroke="#94a3b8"
                strokeWidth={1}
              />
            ))}
          </g>
        )}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#gradient-${color.replace("#", "")})`}
          initial={animate ? { opacity: 0 } : {}}
          animate={animate ? { opacity: 0.1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Line path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : {}}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Data points */}
        {showDots &&
          points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={color}
              stroke="white"
              strokeWidth={2}
              className="cursor-pointer hover:r-6 transition-all"
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
          <text
            key={index}
            x={point.x}
            y={height - padding + 20}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  )
}
