"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Users, Music, PlayCircle} from 'lucide-react'
import Card from "../components/ui/card"
import Toolbar from "../components/ui/toolbar"
import Button from "../components/ui/button"
import Chart from "../components/ui/chart"
import {
  usePlatformStats,
  useChartData,
  useTopItems,
} from "../hooks/use-statistics"
import DatePicker from "../components/ui/date-picker"
import EmptyState from "../components/empty_state"

export default function StatisticsPage() {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  // Fetch data
  const { data: platformStats } = usePlatformStats(dateRange)
  console.log(platformStats);
  
  const { data: userGrowthChart } = useChartData('user-growth', selectedPeriod)
  // const { data: revenueChart } = useChartData('revenue', selectedPeriod)
  const { data: engagementChart } = useChartData('engagement', selectedPeriod)
  const { data: topSongs } = useTopItems('songs', 5)
  const { data: topArtists } = useTopItems('artists', 5)
  const { data: topPlaylists } = useTopItems('playlists', 5)

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num
  }

  // Format currency
  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat('ar-SA', {
  //     style: 'currency',
  //     currency: 'SAR'
  //   }).format(amount)
  // }

  // Format percentage
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value}%`
  }

  const periodOptions = [
    { value: '7d', label: '7 أيام' },
    { value: '30d', label: '30 يوم' },
    { value: '90d', label: '90 يوم' },
    { value: '1y', label: 'سنة' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Toolbar title="الإحصائيات والتحليلات">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DatePicker
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.toLocaleDateString() ?? 'no-date' }))}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            <span className="text-white/70">إلى</span>
            <DatePicker
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.toLocaleDateString() ?? 'no-date' }))}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
          </div>
        </div>
      </Toolbar>

      {/* Period Selector */}
      <div className="flex gap-2">
        {periodOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedPeriod === option.value ? "primary" : "secondary"}
            size="sm"
            onClick={() => setSelectedPeriod(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Main Stats Cards */}
      

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        {userGrowthChart && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">نمو المستخدمين</h3>
              <p className="text-sm text-gray-600">عدد المستخدمين الجدد خلال الفترة المحددة</p>
            </div>
            <Chart data={userGrowthChart} type="area" height={250} />
          </Card>
        )}

        {/* Revenue Chart */}
        {/* {revenueChart && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">الإيرادات</h3>
              <p className="text-sm text-gray-600">تطور الإيرادات خلال الفترة المحددة</p>
            </div>
            <Chart data={revenueChart} type="bar" height={250} />
          </Card>
        )} */}

        {/* Engagement Chart */}
        {engagementChart && (
          <Card className="">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">مؤشرات التفاعل</h3>
              <p className="text-sm text-gray-600">التشغيلات وساعات الاستماع اليومية</p>
            </div>
            <Chart data={engagementChart} type="line" height={300} />
          </Card>
        )}
      </div>

      {/* Top Items Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Songs */}
        {topSongs && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">الأغاني الأكثر تشغيلاً</h3>
            </div>
            <div className="space-y-3">
              {topSongs.map((song, index) => (
                <div key={song.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                    {song.image ? (
                      <img src={song.image || "/placeholder.svg"} alt={song.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{song.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{formatNumber(song.value)} تشغيل</span>
                      <div className="flex items-center gap-1">
                        {song.change >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs ${song.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(song.change)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {
              topSongs.length == 0 && (
                <EmptyState 
                  message="لا توجد بيانات"
                  icon={Music}
                />
              )
            }
          </Card>
        )}

        {/* Top Artists */}
        {topArtists && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">الفنانين الأكثر استماعاً</h3>
            </div>
            <div className="space-y-3">
              {topArtists.map((artist, index) => (
                <div key={artist.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                    {artist.image ? (
                      <img src={artist.image || "/placeholder.svg"} alt={artist.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{artist.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{formatNumber(artist.value)} متابع</span>
                      <div className="flex items-center gap-1">
                        {artist.change >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs ${artist.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(artist.change)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {
              topArtists.length == 0 && (
                <EmptyState 
                  message="لا توجد بيانات"
                  icon={Music}
                />
              )
            }
          </Card>
        )}

        {/* Top Playlists */}
        {topPlaylists && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">قوائم التشغيل الأكثر شعبية</h3>
            </div>
            <div className="space-y-3">
              {topPlaylists.map((playlist, index) => (
                <div key={playlist.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                    {playlist.image ? (
                      <img src={playlist.image || "/placeholder.svg"} alt={playlist.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PlayCircle className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{playlist.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{formatNumber(playlist.value)} تشغيل</span>
                      <div className="flex items-center gap-1">
                        {playlist.change >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs ${playlist.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(playlist.change)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {
              topPlaylists.length == 0 && (
                <EmptyState 
                  message="لا توجد بيانات"
                  icon={Music}
                />
              )
            }
          </Card>
        )}
      </div>
    </div>
  )
}
