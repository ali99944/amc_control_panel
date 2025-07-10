"use client"

import { AlarmClock, ChartLine, LucideActivity, Play } from "lucide-react"
import { formatDateTime } from "../../lib/date"

interface EngagementReportData {
  total_plays: {
    value: number
    change?: number
    change_positive?: boolean
  }
  listening_hours: {
    value: number
    average_per_user?: number
  }
  session_duration: {
    value: number
  }
  user_engagement: {
    value: number
  }
  popular_times: {
    hourly: Array<{
      hour: number
      activity_level: string
      is_peak: boolean
    }>
  }
  most_played_songs: Array<{
    title: string
    artist: string
    plays: number
    total_listening_time: number
    completion_rate: number
  }>
  engagement_patterns: Array<{
    activity_type: string
    count: number
    percentage: number
  }>
  device_usage: Array<{
    device_type: string
    sessions: number
    avg_session_duration: number
    percentage: number
  }>
  weekly_activity: Array<{
    day: string
    sessions: number
    listening_hours: number
    active_users: number
    activity_percentage: number
  }>
}

interface EngagementReportMetrics {
  total_plays?: boolean
  listening_hours?: boolean
  session_duration?: boolean
  user_engagement?: boolean
  popular_times?: boolean
}

interface EngagementReportProps {
  title: string
  description?: string
  date_range: {
    start_date: string
    end_date: string
  }
  generated_at: string
  data: EngagementReportData
  metrics?: EngagementReportMetrics
  include_charts?: boolean
}

export default function EngagementReport({
  title,
  description,
  date_range,
  generated_at,
  data,
  metrics = {
    total_plays: true,
    listening_hours: true,
    session_duration: true,
    user_engagement: true,
    popular_times: true,
  },
  include_charts = true,
}: EngagementReportProps) {
  return (
    <div className="mx-auto p-4 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-xl mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">{title}</h1>
        {description && <p className="text-lg opacity-90 mb-6">{description}</p>}
        
        <div className="bg-white/10 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm opacity-80 mb-1">الفترة الزمنية</div>
            <div className="text-base font-semibold">{date_range.start_date} - {date_range.end_date}</div>
          </div>
          <div className="text-center">
            <div className="text-sm opacity-80 mb-1">تاريخ الإنشاء</div>
            <div className="text-base font-semibold">{formatDateTime(generated_at)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm opacity-80 mb-1">نوع التقرير</div>
            <div className="text-base font-semibold">تقرير التفاعل</div>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.total_plays && (
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <Play />
              </div>
              <div className="text-lg font-semibold text-gray-900">إجمالي التشغيلات</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.total_plays.value.toLocaleString()}</div>
            {data.total_plays.change && (
              <div className={`text-sm ${data.total_plays.change_positive ? 'text-accent' : 'text-destructive'}`}>
                {data.total_plays.change > 0 ? '+' : ''}{data.total_plays.change}% من الشهر الماضي
              </div>
            )}
          </div>
        )}

        {metrics.listening_hours && (
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
              <AlarmClock />
              </div>
              <div className="text-lg font-semibold text-gray-900">ساعات الاستماع</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.listening_hours.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              إجمالي ساعات الاستماع خلال الفترة
              {data.listening_hours.average_per_user && (
                <span> (معدل {data.listening_hours.average_per_user} ساعة/مستخدم)</span>
              )}
            </div>
          </div>
        )}

        {metrics.session_duration && (
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
              <ChartLine />
              </div>
              <div className="text-lg font-semibold text-gray-900">متوسط مدة الجلسة</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.session_duration.value} دقيقة</div>
            <div className="text-sm text-gray-600">متوسط الوقت المقضي في كل جلسة</div>
          </div>
        )}

        {metrics.user_engagement && (
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
              <LucideActivity />
              </div>
              <div className="text-lg font-semibold text-gray-900">معدل التفاعل</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.user_engagement.value}%</div>
            <div className="text-sm text-gray-600">نسبة المستخدمين النشطين يومياً</div>
          </div>
        )}
      </div>

      {/* Engagement Trends Chart */}
      {include_charts && (
        <div className="bg-white p-8 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">اتجاهات التفاعل خلال الفترة</h3>
          <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
            [مخطط اتجاهات التفاعل - يتم إدراجه برمجياً]
          </div>
        </div>
      )}

      {/* Peak Hours */}
      {metrics.popular_times && data.popular_times && (
        <div className="bg-white p-8 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">أوقات الذروة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.popular_times.hourly.map((hour, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg text-center ${
                  hour.is_peak ? 'bg-primary/10 border-2 border-primary' : 'bg-gray-50'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">{hour.hour}:00</div>
                <div className="text-sm text-gray-600">{hour.activity_level}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Most Played Songs */}
      {data.most_played_songs && (
        <div className="bg-white rounded-xl mb-8 overflow-hidden">
          <div className="bg-primary text-white p-4">
            <h3 className="text-xl font-semibold">الأغاني الأكثر تشغيلاً</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">الترتيب</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">الأغنية</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">الفنان</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">عدد التشغيلات</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">مدة الاستماع الإجمالية</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">معدل الإكمال</th>
                </tr>
              </thead>
              <tbody>
                {data.most_played_songs.map((song, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{song.title}</td>
                    <td className="px-6 py-4">{song.artist}</td>
                    <td className="px-6 py-4">{song.plays.toLocaleString()}</td>
                    <td className="px-6 py-4">{song.total_listening_time} ساعة</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        song.completion_rate > 80 
                          ? 'bg-green-100 text-green-800' 
                          : song.completion_rate > 60 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {song.completion_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-white p-8 rounded-xl text-center text-gray-600">
        <p>تم إنشاء هذا التقرير تلقائياً في {formatDateTime(generated_at)}</p>
        <p>جميع البيانات محدثة حتى {date_range.end_date}</p>
      </div>
    </div>
  )
}
