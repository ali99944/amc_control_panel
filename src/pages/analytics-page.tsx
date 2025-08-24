"use client"

import { useState } from "react"
import Card from "../components/ui/card"
import Toolbar from "../components/ui/toolbar"
import { BarChart, LineChart } from '@mui/x-charts'
import {
  useGetTopSongsData,
  useStatisticsOverview,
  useUsersGrowthData,
} from "../hooks/use-statistics"
import DatePicker from "../components/ui/date-picker"
import { Hash, List, Music, Music2, User } from "lucide-react"
import StatisticCard from "../components/ui-components/statistic-card"

export default function StatisticsPage() {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  
  const { data: userGrowthChart } = useUsersGrowthData(dateRange)
  const { data: topSongs } = useGetTopSongsData()
  const { data: overview_statistics } = useStatisticsOverview()


    const formatNumber = (num: number) => {
      if (!num) return "0"
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`
      }
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`
      }
      return num.toString()
    }


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Toolbar title="الإحصائيات والتحليلات">
        <div className="flex items-center gap-4">
          
        </div>
      </Toolbar>

      {/* Period Selector */}
      <div className="flex items-center justify-end gap-2">
            <DatePicker
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.toLocaleDateString() ?? 'no-date' }))}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            <span className="text-black">إلى</span>
            <DatePicker
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.toLocaleDateString() ?? 'no-date' }))}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
          </div>

      {/* Main Stats Cards */}
      

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        {userGrowthChart && (
          <Card >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">نمو المستخدمين</h3>
              <p className="text-sm text-gray-600">عدد المستخدمين الجدد خلال الفترة المحددة</p>
            </div>
            <LineChart 
              height={300}
              series={[
                {
                  data: userGrowthChart.map(ug => ug.users_count),
                  color: 'var(--primary)',
                  curve: 'catmullRom',
                  showMark: false
                  // area: true,
                }
              ]}
              // xAxis={[{ scaleType: 'linear' }]}
              // yAxis={[{ scaleType: 'linear' }]}
              grid={{ vertical: true, horizontal: true }}
              direction={'ltr'}
              showToolbar
              
            />
          </Card>
        )}

        {/* Top Songs Chart */}
        {topSongs && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">أشهر الأغاني</h3>
              <p className="text-sm text-gray-600">أشهر الأغاني خلال الفترة المحددة</p>
            </div>
            <BarChart
              // data={topSongs}
              grid={{ vertical: true, horizontal: true }}
              series={[
                {
                  data: topSongs.map(ts => ts.play_count)
                }
              ]}
              direction={'ltr'}
              height={300}
              margin={{top: 20, bottom: 20, left: 20, right: 20}}
              colors={['var(--primary)']}
              xAxis={[
                {
                  dataKey: 'song_title',
                  data: topSongs.map(ts => ts.song_title),
                }
              ]}
            />
          </Card>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatisticCard 
            stat={{
              icon: User,
              name: 'اجمالي المستخدمين',
              value: formatNumber(overview_statistics?.users_count || 0)
            }}
          />

          <StatisticCard 
            stat={{
              icon: Music,
              name: 'إجمالي الأغاني',
              value: formatNumber(overview_statistics?.available_songs_count || 0)
            }}
          />

          <StatisticCard 
            stat={{
              icon: Hash,
              name: 'اجمالي الانواع',
              value: formatNumber(overview_statistics?.genres_count || 0)
            }}
          />

          <StatisticCard 
            stat={{
              icon: List,
              name: 'قوائم التشغيل',
              value: formatNumber(overview_statistics?.playlists_count || 0)
            }}
          />

          <StatisticCard 
            stat={{
              icon: Music2,
              name: 'إجمالي الفنانين',
              value: formatNumber(overview_statistics?.artists_count || 0)
            }}
          />
      </div>
    </div>
  )
}
