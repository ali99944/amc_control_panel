/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type { ReactNode } from "react"

import { useState } from "react"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import React from "react"

export interface Column<T> {
  key: keyof T | string
  title: string
  sortable?: boolean
  width?: string
  render?: (value: any, row: T, index: number) => ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  className?: string
  onRowClick?: (row: T, index: number) => void
  loading?: boolean
  emptyState?: ReactNode
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  className = "",
  onRowClick,
  loading = false,
  emptyState,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc"
  } | null>(null)

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = sortedData.slice(startIndex, endIndex)

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === "asc") {
          return { key, direction: "desc" }
        } else {
          return null // Remove sorting
        }
      }
      return { key, direction: "asc" }
    })
  }

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) {
      return <div className="w-4 h-4" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} className="text-[#003a78]" />
    ) : (
      <ChevronDown size={16} className="text-[#003a78]" />
    )
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003a78] mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (data.length === 0 && emptyState) {
    return <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>{emptyState}</div>
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100 transition-colors" : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key as string)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.title}</span>
                    {column.sortable && getSortIcon(column.key as string)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`transition-colors ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
                onClick={() => onRowClick?.(row, startIndex + rowIndex)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-gray-900">
                    {column.render
                      ? column.render(row[column.key as keyof T], row, startIndex + rowIndex)
                      : (row[column.key as keyof T] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-[#f1f0ec]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border bg-white border-gray-300 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#003a78] text-white"
                      : "border border-gray-300 bg-white hover:bg-white/60 cursor-pointer text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
