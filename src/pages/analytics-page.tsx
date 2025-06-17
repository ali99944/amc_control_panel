"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Users, Music, Play, Clock, Download, Headphones, ListMusic } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("plays")

  const overviewStats = [
    {
      label: "إجمالي المستخدمين",
      value: "12,543",
      change: "+18%",
      changeType: "increase" as const,
      icon: Users,
      color: "text-[#1DB954]",
    },
    {
      label: "ساعات الاستماع",
      value: "156,789",
      change: "+25%",
      changeType: "increase" as const,
      icon: Headphones,
      color: "text-blue-400",
    },
    {
      label: "الأغاني المُشغلة",
      value: "2,345,678",
      change: "+12%",
      changeType: "increase" as const,
      icon: Play,
      color: "text-[#1DB954]",
    },
    {
      label: "قوائم التشغيل الجديدة",
      value: "1,234",
      change: "+8%",
      changeType: "increase" as const,
      icon: ListMusic,
      color: "text-purple-400",
    },
  ]

  const topSongs = [
    { rank: 1, title: "أغنية رائعة", artist: "محمد منير", plays: 45678, change: "+15%" },
    { rank: 2, title: "لحن الحياة", artist: "أم كلثوم", plays: 38945, change: "+8%" },
    { rank: 3, title: "موسيقى هادئة", artist: "فيروز", plays: 32156, change: "+12%" },
    { rank: 4, title: "أغنية حديثة", artist: "عمرو دياب", plays: 28734, change: "+5%" },
    { rank: 5, title: "لحن قديم", artist: "محمد عبد الوهاب", plays: 25891, change: "+3%" },
  ]

  const topArtists = [
    { rank: 1, name: "محمد منير", plays: 125678, followers: 45678 },
    { rank: 2, name: "أم كلثوم", plays: 98456, followers: 67890 },
    { rank: 3, name: "فيروز", plays: 87234, followers: 54321 },
    { rank: 4, name: "عمرو دياب", plays: 76543, followers: 43210 },
    { rank: 5, name: "محمد عبد الوهاب", plays: 65432, followers: 32109 },
  ]

  const userActivity = [
    { time: "00:00", users: 1200 },
    { time: "04:00", users: 800 },
    { time: "08:00", users: 3200 },
    { time: "12:00", users: 4500 },
    { time: "16:00", users: 5200 },
    { time: "20:00", users: 6800 },
  ]

  const genreDistribution = [
    { genre: "طرب", percentage: 35, plays: 450000 },
    { genre: "بوب", percentage: 25, plays: 320000 },
    { genre: "كلاسيكي", percentage: 20, plays: 256000 },
    { genre: "فولكلور", percentage: 12, plays: 154000 },
    { genre: "أخرى", percentage: 8, plays: 102000 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-[#1DB954] to-[#1ed760] rounded-xl p-6 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">الإحصائيات والتحليلات</h1>
            <p className="text-black/80">تحليل شامل لأداء مركز علي الإعلامي</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-black/20 text-black rounded-lg border border-black/20 focus:outline-none"
            >
              <option value="24h">آخر 24 ساعة</option>
              <option value="7d">آخر 7 أيام</option>
              <option value="30d">آخر 30 يوم</option>
              <option value="90d">آخر 3 أشهر</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-black/20 text-black rounded-lg hover:bg-black/30 transition-colors">
              <Download size={20} className="ml-2" />
              تصدير التقرير
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-[#191414] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                <p
                  className={`text-sm mt-2 flex items-center ${
                    stat.changeType === "increase" ? "text-[#1DB954]" : "text-red-400"
                  }`}
                >
                  <TrendingUp size={16} className="ml-1" />
                  {stat.change}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-[#191414] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">نشاط المستخدمين</h2>
            <div className="flex items-center text-sm text-gray-400">
              <Clock size={16} className="ml-1" />
              آخر 24 ساعة
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 space-x-reverse">
            {userActivity.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-[#1DB954] rounded-t-lg transition-all duration-300 hover:bg-[#1ed760]"
                  style={{ height: `${(data.users / 7000) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">{data.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Distribution */}
        <div className="bg-[#191414] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">توزيع الأنواع الموسيقية</h2>
            <div className="flex items-center text-sm text-gray-400">
              <BarChart3 size={16} className="ml-1" />
              حسب عدد التشغيلات
            </div>
          </div>
          <div className="space-y-4">
            {genreDistribution.map((genre, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <span className="text-white font-medium w-20">{genre.genre}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                      <div
                        className="bg-[#1DB954] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${genre.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm w-12">{genre.percentage}%</span>
                </div>
                <span className="text-gray-400 text-sm mr-4">{genre.plays.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Songs */}
        <div className="bg-[#191414] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">الأغاني الأكثر استماعاً</h2>
            <button className="text-[#1DB954] hover:text-[#1ed760] text-sm font-medium">عرض الكل</button>
          </div>
          <div className="space-y-4">
            {topSongs.map((song, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center ml-3">
                    <span className="text-black font-bold text-sm">{song.rank}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{song.title}</h3>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center">
                    <Play size={16} className="text-[#1DB954] ml-1" />
                    <span className="text-white font-medium">{song.plays.toLocaleString()}</span>
                  </div>
                  <span className="text-[#1DB954] text-sm">{song.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Artists */}
        <div className="bg-[#191414] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">الفنانون الأكثر استماعاً</h2>
            <button className="text-[#1DB954] hover:text-[#1ed760] text-sm font-medium">عرض الكل</button>
          </div>
          <div className="space-y-4">
            {topArtists.map((artist, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center ml-3">
                    <span className="text-black font-bold text-sm">{artist.rank}</span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center ml-3">
                    <Users size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{artist.name}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Users size={14} className="ml-1" />
                      {artist.followers.toLocaleString()} متابع
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center">
                    <Play size={16} className="text-[#1DB954] ml-1" />
                    <span className="text-white font-medium">{artist.plays.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-[#191414] rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">تحليلات مفصلة</h2>
          <div className="flex items-center gap-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] text-white"
            >
              <option value="plays">مرات التشغيل</option>
              <option value="users">المستخدمون النشطون</option>
              <option value="duration">مدة الاستماع</option>
              <option value="playlists">قوائم التشغيل</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">متوسط الجلسة</span>
              <Clock size={16} className="text-[#1DB954]" />
            </div>
            <span className="text-2xl font-bold text-white">24:32</span>
            <span className="text-[#1DB954] text-sm">+12% من الأسبوع الماضي</span>
          </div>

          <div className="bg-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">معدل الاحتفاظ</span>
              <TrendingUp size={16} className="text-[#1DB954]" />
            </div>
            <span className="text-2xl font-bold text-white">78.5%</span>
            <span className="text-[#1DB954] text-sm">+5% من الأسبوع الماضي</span>
          </div>

          <div className="bg-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">أغاني جديدة</span>
              <Music size={16} className="text-[#1DB954]" />
            </div>
            <span className="text-2xl font-bold text-white">156</span>
            <span className="text-[#1DB954] text-sm">+23% من الأسبوع الماضي</span>
          </div>
        </div>
      </div>
    </div>
  )
}
