"use client"

import { useState, useEffect } from "react"
import { StreamingActivityData, TopTrackData, SubscriptionData, KPIData } from "../types/dashboard"

// Dummy data generators
const generateStreamingActivity = (): StreamingActivityData[] => {
  const data: StreamingActivityData[] = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      streams: Math.floor(Math.random() * 50000) + 20000
    })
  }
  return data
}

const generateTopTracks = (): TopTrackData[] => [
  { id: 1, title: "أغنية رائعة", artist: "محمد عبده", streams: 125000 },
  { id: 2, title: "ليلة حب", artist: "فيروز", streams: 98000 },
  { id: 3, title: "يا مسافر", artist: "عمرو دياب", streams: 87000 },
  { id: 4, title: "حبيبي", artist: "نانسي عجرم", streams: 76000 },
  { id: 5, title: "قلبي معاك", artist: "تامر حسني", streams: 65000 },
]

const generateSubscriptionData = (): SubscriptionData[] => [
  { label: "المجاني", value: 65, color: "#8884d8" },
  // { label: "الأساسي", value: 25, color: "#82ca9d" },
  { label: "المميز", value: 10, color: "#ffc658" },
]

// Custom hooks
export function useDashboardKPIs() {
  const [data, setData] = useState<KPIData>({
    totalActiveUsers: 0,
    newSignups: 0,
    dailyStreams: 0,
    mostStreamedTrack: {
      id: 0,
      title: "",
      artist: "",
      streams: 0,
    }
  })

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setData({
        totalActiveUsers: Math.floor(Math.random() * 10000) + 50000,
        newSignups: Math.floor(Math.random() * 500) + 200,
        dailyStreams: Math.floor(Math.random() * 100000) + 150000,
        mostStreamedTrack: {
          id: 1,
          title: "أغنية اليوم",
          artist: "الفنان المميز",
          streams: Math.floor(Math.random() * 10000) + 5000,
        }
      })
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Auto-refresh every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { data, isLoading: false }
}

export function useStreamingActivity(dateRange: string = "30d") {
  const [data, setData] = useState<StreamingActivityData[]>([])

  useEffect(() => {
    setData(generateStreamingActivity())
  }, [dateRange])

  return { data, isLoading: false }
}

export function useTopTracks(period: string = "week") {
  const [data, setData] = useState<TopTrackData[]>([])

  useEffect(() => {
    setData(generateTopTracks())
  }, [period])

  return { data, isLoading: false }
}

export function useSubscriptionBreakdown() {
  const [data, setData] = useState<SubscriptionData[]>([])

  useEffect(() => {
    setData(generateSubscriptionData())
  }, [])

  return { data, isLoading: false }
}
