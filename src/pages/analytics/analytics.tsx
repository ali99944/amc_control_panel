"use client"

import { useState, useEffect } from "react"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  MusicalNoteIcon,
  QueueListIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

// Mock API functions
const fetchAnalyticsData = () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userStats: {
          total: 124853,
          active: 98217,
          new: 2547,
          growth: 12.5,
          trend: "up",
          usersByCountry: [
            { name: "Sudan", value: 78542 },
            { name: "Egypt", value: 15632 },
            { name: "Saudi Arabia", value: 12453 },
            { name: "UAE", value: 8965 },
            { name: "Other", value: 9261 },
          ],
          userActivity: [
            { date: "Jan", users: 85000, newUsers: 2100 },
            { date: "Feb", users: 87500, newUsers: 2500 },
            { date: "Mar", users: 90000, newUsers: 2500 },
            { date: "Apr", users: 93000, newUsers: 3000 },
            { date: "May", users: 97000, newUsers: 4000 },
            { date: "Jun", users: 102000, newUsers: 5000 },
            { date: "Jul", users: 108000, newUsers: 6000 },
            { date: "Aug", users: 115000, newUsers: 7000 },
            { date: "Sep", users: 119000, newUsers: 4000 },
            { date: "Oct", users: 122000, newUsers: 3000 },
            { date: "Nov", users: 124000, newUsers: 2000 },
            { date: "Dec", users: 124853, newUsers: 853 },
          ],
        },
        contentStats: {
          totalSongs: 8642,
          totalPlaylists: 3721,
          totalArtists: 1254,
          totalGenres: 24,
          songsByGenre: [
            { name: "Traditional", value: 3245 },
            { name: "Modern", value: 2187 },
            { name: "Folk", value: 1532 },
            { name: "Pop", value: 876 },
            { name: "Jazz", value: 432 },
            { name: "Classical", value: 370 },
          ],
          topSongs: [
            { name: "Aghani Sudan", plays: 1200000, artist: "Ali Media" },
            { name: "Khartoum Nights", plays: 985000, artist: "Mohammed Ahmed" },
            { name: "Nile River", plays: 876000, artist: "Fatima Ali" },
            { name: "Desert Rose", plays: 754000, artist: "Ibrahim Hassan" },
            { name: "Sudanese Pride", plays: 698000, artist: "Amina Mohammed" },
          ],
        },
        engagementStats: {
          totalPlays: 42195000,
          averageDailyPlays: 1245000,
          averageSessionDuration: 27, // minutes
          mostActiveTime: "18:00-21:00",
          playbackGrowth: -2.3,
          trend: "down",
          playsByTime: [
            { time: "00:00", plays: 520000 },
            { time: "03:00", plays: 320000 },
            { time: "06:00", plays: 480000 },
            { time: "09:00", plays: 780000 },
            { time: "12:00", plays: 1050000 },
            { time: "15:00", plays: 1320000 },
            { time: "18:00", plays: 1450000 },
            { time: "21:00", plays: 1250000 },
          ],
          monthlyPlays: [
            { month: "Jan", plays: 38000000 },
            { month: "Feb", plays: 38500000 },
            { month: "Mar", plays: 39200000 },
            { month: "Apr", plays: 40100000 },
            { month: "May", plays: 41300000 },
            { month: "Jun", plays: 42800000 },
            { month: "Jul", plays: 43500000 },
            { month: "Aug", plays: 44200000 },
            { month: "Sep", plays: 43800000 },
            { month: "Oct", plays: 43100000 },
            { month: "Nov", plays: 42600000 },
            { month: "Dec", plays: 42195000 },
          ],
        },
      })
    }, 800)
  })
}

// Colors for charts
const COLORS = ["#FF1742", "#FF6B8B", "#FFB3C0", "#FFC7D1", "#FFD9E0", "#FFEBF0"]
const CHART_LINE_COLOR = "#FF1742"
const CHART_AREA_COLOR = "#FF1742"
const CHART_BAR_COLOR = "#FF1742"

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("year")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      const data = await fetchAnalyticsData()
      setAnalyticsData(data)
    } catch (error) {
      console.error("Error loading analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-[#FF1742] border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    )
  }

  const { userStats, contentStats, engagementStats } = analyticsData

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-black">Analytics & Statistics</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 text-sm rounded ${
              timeRange === "week" ? "bg-[#FF1742] text-white" : "bg-white border border-gray-200 text-black"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 text-sm rounded ${
              timeRange === "month" ? "bg-[#FF1742] text-white" : "bg-white border border-gray-200 text-black"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-3 py-1 text-sm rounded ${
              timeRange === "year" ? "bg-[#FF1742] text-white" : "bg-white border border-gray-200 text-black"
            }`}
          >
            Year
          </button>
          <button
            onClick={() => setTimeRange("all")}
            className={`px-3 py-1 text-sm rounded ${
              timeRange === "all" ? "bg-[#FF1742] text-white" : "bg-white border border-gray-200 text-black"
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "overview" ? "text-[#FF1742] border-b-2 border-[#FF1742]" : "text-gray-500 hover:text-black"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "users" ? "text-[#FF1742] border-b-2 border-[#FF1742]" : "text-gray-500 hover:text-black"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "content" ? "text-[#FF1742] border-b-2 border-[#FF1742]" : "text-gray-500 hover:text-black"
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab("engagement")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "engagement"
                ? "text-[#FF1742] border-b-2 border-[#FF1742]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Engagement
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-[#EEF4F7] rounded">
                  <UsersIcon className="h-6 w-6 text-[#FF1742]" />
                </div>
                <div className={`flex items-center ${userStats.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  <span className="text-sm font-medium">{userStats.growth}%</span>
                  {userStats.trend === "up" ? (
                    <ArrowUpIcon className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 ml-1" />
                  )}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-2xl font-bold text-black mt-1">{formatNumber(userStats.total)}</p>
              <p className="text-xs text-gray-500 mt-2">Active: {formatNumber(userStats.active)}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-[#EEF4F7] rounded">
                  <MusicalNoteIcon className="h-6 w-6 text-[#FF1742]" />
                </div>
                <div className="flex items-center text-green-500">
                  <span className="text-sm font-medium">+8.2%</span>
                  <ArrowUpIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Songs</h3>
              <p className="text-2xl font-bold text-black mt-1">{formatNumber(contentStats.totalSongs)}</p>
              <p className="text-xs text-gray-500 mt-2">Artists: {formatNumber(contentStats.totalArtists)}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-[#EEF4F7] rounded">
                  <QueueListIcon className="h-6 w-6 text-[#FF1742]" />
                </div>
                <div className="flex items-center text-green-500">
                  <span className="text-sm font-medium">+5.1%</span>
                  <ArrowUpIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Playlists</h3>
              <p className="text-2xl font-bold text-black mt-1">{formatNumber(contentStats.totalPlaylists)}</p>
              <p className="text-xs text-gray-500 mt-2">Genres: {contentStats.totalGenres}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-[#EEF4F7] rounded">
                  <ClockIcon className="h-6 w-6 text-[#FF1742]" />
                </div>
                <div
                  className={`flex items-center ${engagementStats.trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  <span className="text-sm font-medium">{engagementStats.playbackGrowth}%</span>
                  {engagementStats.trend === "up" ? (
                    <ArrowUpIcon className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 ml-1" />
                  )}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Daily Plays</h3>
              <p className="text-2xl font-bold text-black mt-1">{formatNumber(engagementStats.averageDailyPlays)}</p>
              <p className="text-xs text-gray-500 mt-2">Avg. Session: {engagementStats.averageSessionDuration} min</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">User Growth</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userStats.userActivity} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="users"
                      name="Total Users"
                      stroke={CHART_LINE_COLOR}
                      fill={CHART_AREA_COLOR}
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="newUsers"
                      name="New Users"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Monthly Plays</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementStats.monthlyPlays} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatNumber(value)} />
                    <Legend />
                    <Bar dataKey="plays" name="Plays" fill={CHART_BAR_COLOR} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Top Songs</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#EEF4F7]">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Song
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Artist
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plays
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contentStats.topSongs.map((song, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-black">{song.name}</td>
                        <td className="px-4 py-3 text-sm text-black">{song.artist}</td>
                        <td className="px-4 py-3 text-sm text-black">{formatNumber(song.plays)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Songs by Genre</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentStats.songsByGenre}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentStats.songsByGenre.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">User Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">Total Users</span>
                    <span className="text-sm font-medium text-black">{formatNumber(userStats.total)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#FF1742] h-2.5 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">Active Users</span>
                    <span className="text-sm font-medium text-black">{formatNumber(userStats.active)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#FF1742] h-2.5 rounded-full"
                      style={{ width: `${(userStats.active / userStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">New Users (This Month)</span>
                    <span className="text-sm font-medium text-black">{formatNumber(userStats.new)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#FF1742] h-2.5 rounded-full"
                      style={{ width: `${(userStats.new / userStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Growth Rate</span>
                  <span
                    className={`text-sm font-medium ${userStats.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {userStats.growth}%
                    {userStats.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 ml-1 inline" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 ml-1 inline" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Users by Country</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userStats.usersByCountry}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userStats.usersByCountry.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">User Growth Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userStats.userActivity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatNumber(value)} />
                    <Line
                      type="monotone"
                      dataKey="users"
                      name="Total Users"
                      stroke={CHART_LINE_COLOR}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="text-lg font-semibold text-black mb-4">New User Acquisition</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userStats.userActivity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                  <Bar dataKey="newUsers" name="New Users" fill={CHART_BAR_COLOR} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Content Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Songs</span>
                  <span className="text-sm font-medium text-black">{formatNumber(contentStats.totalSongs)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Playlists</span>
                  <span className="text-sm font-medium text-black">{formatNumber(contentStats.totalPlaylists)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Artists</span>
                  <span className="text-sm font-medium text-black">{formatNumber(contentStats.totalArtists)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Genres</span>
                  <span className="text-sm font-medium text-black">{contentStats.totalGenres}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Songs by Genre</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentStats.songsByGenre}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentStats.songsByGenre.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Top Songs by Plays</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contentStats.topSongs}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                  <Bar dataKey="plays" name="Plays" fill={CHART_BAR_COLOR} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Top Songs</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#EEF4F7]">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Song
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artist
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plays
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contentStats.topSongs.map((song, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-black">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-black">{song.name}</td>
                      <td className="px-4 py-3 text-sm text-black">{song.artist}</td>
                      <td className="px-4 py-3 text-sm text-black">{formatNumber(song.plays)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Engagement Tab */}
      {activeTab === "engagement" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Engagement Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Plays</span>
                  <span className="text-sm font-medium text-black">{formatNumber(engagementStats.totalPlays)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Daily Average</span>
                  <span className="text-sm font-medium text-black">
                    {formatNumber(engagementStats.averageDailyPlays)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Avg. Session Duration</span>
                  <span className="text-sm font-medium text-black">{engagementStats.averageSessionDuration} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Most Active Time</span>
                  <span className="text-sm font-medium text-black">{engagementStats.mostActiveTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Playback Growth</span>
                  <span
                    className={`text-sm font-medium ${engagementStats.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {engagementStats.playbackGrowth}%
                    {engagementStats.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 ml-1 inline" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 ml-1 inline" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Plays by Time of Day</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementStats.playsByTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatNumber(value)} />
                    <Bar dataKey="plays" name="Plays" fill={CHART_BAR_COLOR} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Monthly Engagement Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementStats.monthlyPlays} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="plays"
                    name="Total Plays"
                    stroke={CHART_LINE_COLOR}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Engagement Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">Plays per User</span>
                    <span className="text-sm font-medium text-black">
                      {(engagementStats.totalPlays / userStats.total).toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#FF1742] h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">Plays per Active User</span>
                    <span className="text-sm font-medium text-black">
                      {(engagementStats.totalPlays / userStats.active).toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#FF1742] h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">Avg. Songs per Session</span>
                    <span className="text-sm font-medium text-black">8.3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#FF1742] h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">Playlist Engagement</span>
                    <span className="text-sm font-medium text-black">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#FF1742] h-2.5 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-semibold text-black mb-4">User Retention</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { month: "Jan", retention: 92 },
                      { month: "Feb", retention: 89 },
                      { month: "Mar", retention: 91 },
                      { month: "Apr", retention: 87 },
                      { month: "May", retention: 85 },
                      { month: "Jun", retention: 88 },
                      { month: "Jul", retention: 90 },
                      { month: "Aug", retention: 93 },
                      { month: "Sep", retention: 91 },
                      { month: "Oct", retention: 89 },
                      { month: "Nov", retention: 87 },
                      { month: "Dec", retention: 90 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Area
                      type="monotone"
                      dataKey="retention"
                      name="User Retention"
                      stroke={CHART_LINE_COLOR}
                      fill={CHART_AREA_COLOR}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

