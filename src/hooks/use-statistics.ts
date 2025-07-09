"use client"

import { useGetQuery } from "./queries-actions"
import type { PlatformStats, ChartData, TopItem, TimeSeriesData } from "../types/statistics"

const dummyPlatformStats: PlatformStats = {
  users: {
    total: 1000,
    active: 750,
    new_this_month: 125,
    growth_rate: 15.5
  },
  content: {
    total_songs: 5000,
    total_artists: 800,
    total_playlists: 1200,
    total_genres: 25
  },
  engagement: {
    total_plays: 50000,
    total_listening_hours: 8500,
    average_session_duration: 45,
    daily_active_users: 500
  },
  revenue: {
    total_revenue: 25000,
    monthly_revenue: 5000,
    revenue_growth: 12.5,
    average_revenue_per_user: 25
  }
}

const dummyChartData: ChartData = {
  labels: [],
  datasets: [],
}

const dummyTopItems: TopItem[] = []

const dummyTimeSeriesData: TimeSeriesData[] = []

// Hook for fetching platform statistics
export function usePlatformStats(dateRange?: { start: string; end: string }) {
  return useGetQuery<PlatformStats>({
    url: `statistics/overview${dateRange ? `?start=${dateRange.start}&end=${dateRange.end}` : ''}`,
    key: ["platform-stats", dateRange?.start || "", dateRange?.end || ""],
    options: {
        initialData: dummyPlatformStats
    }
  })
}

// Hook for fetching chart data
export function useChartData(type: string, period: string = '30d') {
  return useGetQuery<ChartData>({
    url: `statistics/charts/${type}?period=${period}`,
    key: ["chart-data", type, period],
    options: {
        initialData: dummyChartData
    }
  })
}

// Hook for fetching top items
export function useTopItems(type: 'songs' | 'artists' | 'playlists' | 'genres', limit: number = 10) {
  return useGetQuery<TopItem[]>({
    url: `statistics/top/${type}?limit=${limit}`,
    key: ["top-items", type, limit.toString()],
    options: {
        initialData: dummyTopItems
    }
  })
}

// Hook for fetching time series data
export function useTimeSeriesData(metric: string, period: string = '30d') {
  return useGetQuery<TimeSeriesData[]>({
    url: `statistics/timeseries/${metric}?period=${period}`,
    key: ["timeseries", metric, period],
    options: {
        initialData: dummyTimeSeriesData
    }
  })
}

