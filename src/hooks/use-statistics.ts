
import { useGetQuery } from "./queries-actions"
import type { StatisticsOverview, UsersGrowthObject, TopSongRecord } from "../types/statistics"

interface Period {
  start: Date | string
  end: Date | string
}

const default_period: Period = {
  start: '2025-04-09T00:00:00.000Z',
  end: '2025-08-09T00:00:00.000Z',
}


// Hook for fetching platform statistics
export function useStatisticsOverview(period: Period = default_period) {
  return useGetQuery<StatisticsOverview>({
    url: `statistics/overview${`?start_date=${period.start}&end_date=${period.end}`}`,
    key: ["statistics-overview", period?.start || "", period?.end || ""],
  })
}

// Hook for fetching users growth data
export function useUsersGrowthData(period: Period = default_period) {
  return useGetQuery<UsersGrowthObject[]>({
    url: `analytics/users-growth?start_date=${period.start}&end_date=${period.end}`,
    key: ["users-growth", period]
  })
}

// Hook for fetching top songs data
export function useGetTopSongsData(limit: number = 6) {
  return useGetQuery<TopSongRecord[]>({
    url: `analytics/top-songs?limit=${limit}`,
    key: ["top-songs", limit.toString()]
  })
}

// Hook for fetching top songs data
export function useGetSongsPlaysAnalytics() {
  return useGetQuery<{ date: string, plays_count: number}[]>({
    url: `analytics/songs-plays?start_date=2025-04-09T00:00:00.000Z&end_date=2025-08-09T00:00:00.000Z`,
    key: ["songs-plays"]
  })
}

// Hook for fetching top songs data
export function useGetSubscriptionsPartitions() {
  return useGetQuery<{ name: string, value: number}[]>({
    url: `analytics/subscriptions-distribution`,
    key: ["subscriptions-distribution"]
  })
}