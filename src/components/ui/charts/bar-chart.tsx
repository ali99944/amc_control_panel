"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/utils"

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  barColor?: string
  showValues?: boolean
  className?: string
  animate?: boolean
  horizontal?: boolean
}

export function BarChart({
  data,
  width = 400,
  height = 200,
  barColor = "#4f46e5",
  showValues = true,
  className,
  animate = true,
  horizontal = false,
}: BarChartProps) {
  if (!data.length) return null

  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...data.map((d) => d.value))
  const barSpacing = horizontal ? chartHeight / data.length : chartWidth / data.length
  const barThickness = barSpacing * 0.6

  return (
    <div className={cn("relative", className)}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Bars */}
        {data.map((item, index) => {
          const barLength = horizontal ? (item.value / maxValue) * chartWidth : (item.value / maxValue) * chartHeight

          const x = horizontal ? padding : padding + index * barSpacing + (barSpacing - barThickness) / 2
          const y = horizontal
            ? padding + index * barSpacing + (barSpacing - barThickness) / 2
            : height - padding - barLength

          const barWidth = horizontal ? barLength : barThickness
          const barHeight = horizontal ? barThickness : barLength

          return (
            <g key={index}>
              <motion.rect
                x={x}
                y={0}
                width={horizontal ? 0 : barWidth}
                height={horizontal ? barHeight : 0}
                fill={item.color || barColor}
                rx={2}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                initial={animate ? {} : { width: barWidth, height: barHeight, y }}
                animate={
                  animate
                    ? {
                        width: barWidth,
                        height: barHeight,
                        y,
                      }
                    : {}
                }
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <title>{`${item.label}: ${item.value}`}</title>
              </motion.rect>

              {/* Value labels */}
              {showValues && (
                <motion.text
                  x={horizontal ? x + barLength + 5 : x + barWidth / 2}
                  y={horizontal ? y + barHeight / 2 + 4 : y - 5}
                  textAnchor={horizontal ? "start" : "middle"}
                  className="text-xs fill-gray-700 font-medium"
                  initial={animate ? { opacity: 0 } : {}}
                  animate={animate ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                >
                  {item.value}
                </motion.text>
              )}

              {/* Category labels */}
              <motion.text
                x={horizontal ? padding - 10 : x + barWidth / 2}
                y={horizontal ? y + barHeight / 2 + 4 : height - padding + 15}
                textAnchor={horizontal ? "end" : "middle"}
                className="text-xs fill-gray-500"
                initial={animate ? { opacity: 0 } : {}}
                animate={animate ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                {item.label}
              </motion.text>
            </g>
          )
        })}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={horizontal ? width - padding : padding}
          y2={horizontal ? height - padding : padding}
          stroke="#94a3b8"
          strokeWidth={1}
        />
      </svg>
    </div>
  )
}
