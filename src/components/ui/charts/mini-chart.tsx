"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/utils"

interface DataPoint {
  value: number
}

interface MiniChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
  type?: "line" | "bar" | "area"
  className?: string
  animate?: boolean
}

export function MiniChart({
  data,
  width = 100,
  height = 40,
  color = "#4f46e5",
  type = "line",
  className,
  animate = true,
}: MiniChartProps) {
  if (!data.length) return null

  const padding = 2
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const valueRange = maxValue - minValue || 1

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth
    const y = padding + ((maxValue - point.value) / valueRange) * chartHeight
    return { x, y, value: point.value }
  })

  if (type === "line" || type === "area") {
    const pathData = points.reduce((path, point, index) => {
      const command = index === 0 ? "M" : "L"
      return `${path} ${command} ${point.x} ${point.y}`
    }, "")

    const areaPath =
      type === "area"
        ? `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`
        : ""

    return (
      <div className={cn("inline-block", className)}>
        <svg width={width} height={height}>
          {type === "area" && (
            <motion.path
              d={areaPath}
              fill={color}
              fillOpacity={0.3}
              initial={animate ? { opacity: 0 } : {}}
              animate={animate ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            />
          )}
          <motion.path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animate ? { pathLength: 0 } : {}}
            animate={animate ? { pathLength: 1 } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>
    )
  }

  if (type === "bar") {
    const barWidth = (chartWidth / data.length) * 0.8
    const barSpacing = chartWidth / data.length

    return (
      <div className={cn("inline-block", className)}>
        <svg width={width} height={height}>
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight
            const x = padding + index * barSpacing + (barSpacing - barWidth) / 2
            const y = height - padding - barHeight

            return (
              <motion.rect
                key={index}
                x={x}
                y={height - padding}
                width={barWidth}
                height={0}
                fill={color}
                rx={1}
                initial={animate ? {} : { height: barHeight, y }}
                animate={animate ? { height: barHeight, y } : {}}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
              />
            )
          })}
        </svg>
      </div>
    )
  }

  return null
}
