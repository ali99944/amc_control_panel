"use client"

import { useState } from "react"
import {
  Music,
  Users,
  PlayCircle,
  TrendingUp,
  BarChart2,
  Headphones,
  UserPlus,
} from "lucide-react"
import { LineChart, BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"

import {
  useDashboardKPIs,
  useStreamingActivity,
  useSubscriptionBreakdown,
} from "../../hooks/use-dashboard"
import { useUsersGrowthData, useGetTopSongsData, useGetSongsPlaysAnalytics, useGetSubscriptionsPartitions } from "../../hooks/use-statistics"
import StatisticCard from "../../components/ui-components/statistic-card"

export default function Dashboard() {
  const [dateRange] = useState("30d")

  // Fetch dashboard data
  const { data: kpiData } = useDashboardKPIs()
  const { data: streamingActivity } = useStreamingActivity(dateRange)
  const { data: subscriptionData } = useSubscriptionBreakdown()
  const { data: songs_plays = [] } = useGetSongsPlaysAnalytics()

  console.log(songs_plays);
  

  // Format numbers
  const formatNumber = (num: number) => {
    if (!num) return "0"
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }


  const { data: userGrowthChart } = useUsersGrowthData()
  const { data: topSongs } = useGetTopSongsData()
  const { data: subscriptions_distribution = [] } = useGetSubscriptionsPartitions()

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="لوحة التحكم الرئيسية">
        <div className="flex items-center gap-2">

        </div>
      </Toolbar>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <StatisticCard 
          stat={{
            icon: Users,
            name: "المستخدمين النشطين",
            value: kpiData.totalActiveUsers
          }}
        />

        <StatisticCard 
          stat={{
            icon: UserPlus,
            name: "تسجيلات جديدة",
            value: formatNumber(kpiData.newSignups),
          }}
        />

        <StatisticCard 
          stat={{
            icon: PlayCircle,
            name: "تشغيلات اليوم",
            value: formatNumber(kpiData.dailyStreams),
          }}
        />

        <StatisticCard 
          stat={{
            icon: Music,
            name: "الأكثر تشغيلاً اليوم",
            value: formatNumber(kpiData.mostStreamedTrack.streams),
          }}
        />
      </div>

      {/* Charts Section - Streaming Activity and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Streaming Activity Chart */}
        <Card>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-primary">نشاط التشغيل خلال الفترة</h3>
            <p className="text-sm text-gray-600">التشغيلات اليومية</p>
          </div>
          {streamingActivity.length > 0 && (
            <div className="h-[300px]">
              <LineChart
                direction={"ltr"}
                height={280}
                grid={{ vertical: true, horizontal: true }}
                series={[
                  {
                    data: songs_plays?.map(sp => sp.plays_count),
                    color: "var(--primary)",
                    showMark: false
                  },
                ]}
                xAxis={[
                  {
                    data: streamingActivity.map((d) => new Date(d.date)),
                    scaleType: "time",
                  },
                ]}
              />
            </div>
          )}
        </Card>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      
      <Card>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-primary">توزيع الاشتراكات</h3>
            <p className="text-sm text-gray-600">نسب أنواع الاشتراكات</p>
          </div>
          {subscriptionData.length > 0 && (
            <div className="h-[350px]">
              <PieChart
                width={500}
                height={320}
                hideLegend
                direction={'ltr'}
                
                
                series={[
                  {
                    data: subscriptions_distribution.map((item, index) => ({
                      id: index,
                      value: item.value,
                      label: item.name,
                    })),
                    
                    innerRadius: 60,
                    outerRadius: 110,
                    paddingAngle: 2,
                    arcLabel: "label",
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                    fontWeight: 'bold'
                  },
                }}
                colors={["var(--primary)", "var(--accent)"]}
              />
            </div>
          )}
        </Card>
            </div>

      





      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Engagement Stats */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary">مؤشرات التفاعل</h3>
            <BarChart2 className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">معدل النمو</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">+15.3%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">متوسط وقت الاستماع</span>
              <span className="font-bold">42 دقيقة</span>
            </div>
          </div>
        </Card>

        {/* Content Stats */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary">إحصائيات المحتوى</h3>
            <Headphones className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">أغاني جديدة اليوم</span>
              <span className="font-bold text-primary">+12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">فنانين جدد</span>
              <span className="font-bold text-primary">+3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">قوائم تشغيل جديدة</span>
              <span className="font-bold text-primary">+8</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
