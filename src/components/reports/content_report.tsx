"use client"

import { AreaChart, List, Mic, Music } from "lucide-react"
import { formatDate, formatDateTime } from "../../lib/date"

interface ContentReportData {
  total_songs: {
    value: number
    change?: number
    change_positive?: boolean
  }
  total_artists: {
    value: number
  }
  total_playlists: {
    value: number
    public: number
    private: number
  }
  content_growth: {
    value: number
  }
  popular_content: {
    songs: Array<{
      title: string
      artist: string
      plays: number
      rating?: number
      genres: string[]
    }>
  }
  top_artists: Array<{
    name: string
    songs_count: number
    total_plays: number
    followers: number
  }>
  content_by_genre: Array<{
    genre: string
    count: number
    percentage: number
  }>
  recent_additions: Array<{
    title: string
    artist: string
    added_date: string
    duration: string
    genres: string[]
    plays: number
  }>
}

interface ContentReportMetrics {
  total_songs?: boolean
  total_artists?: boolean
  total_playlists?: boolean
  content_growth?: boolean
  popular_content?: boolean
}

interface ContentReportProps {
  title: string
  description?: string
  date_range: {
    start_date: string
    end_date: string
  }
  generated_at: string
  data: ContentReportData
  metrics?: ContentReportMetrics
  include_charts?: boolean
}

export default function ContentReport({
  title,
  description,
  date_range,
  generated_at,
  data,
  metrics = {
    total_songs: true,
    total_artists: true,
    total_playlists: true,
    content_growth: true,
    popular_content: true,
  },
  include_charts = true,
}: ContentReportProps) {
  return (
    <div className="mx-auto p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-xl mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">{title}</h1>
        {description && <p className="text-lg opacity-90 mb-6">{description}</p>}
        
        <div className="bg-white/10 p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="text-base font-semibold">تقرير المحتوى</div>
          </div>
        </div>
      </div>

      {/* Content Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.total_songs && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <Music />
              </div>
              <div className="text-lg font-semibold text-gray-900">إجمالي الأغاني</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.total_songs.value.toLocaleString()}</div>
            {data.total_songs.change && (
              <div className={`text-sm ${data.total_songs.change_positive ? 'text-accent' : 'text-destructive'}`}>
                {data.total_songs.change > 0 ? '+' : ''}{data.total_songs.change}% من الشهر الماضي
              </div>
            )}
          </div>
        )}

        {metrics.total_artists && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <Mic />
              </div>
              <div className="text-lg font-semibold text-gray-900">إجمالي الفنانين</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.total_artists.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600">فنانين مختلفين في المنصة</div>
          </div>
        )}

        {metrics.total_playlists && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <List />
              </div>
              <div className="text-lg font-semibold text-gray-900">قوائم التشغيل</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.total_playlists.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              {data.total_playlists.public} عامة، {data.total_playlists.private} خاصة
            </div>
          </div>
        )}

        {metrics.content_growth && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <AreaChart />
              </div>
              <div className="text-lg font-semibold text-gray-900">نمو المحتوى</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.content_growth.value}%</div>
            <div className="text-sm text-gray-600">معدل نمو المحتوى الشهري</div>
          </div>
        )}
      </div>

      {/* Content Growth Chart */}
      {include_charts && (
        <div className="bg-white p-8 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">نمو المحتوى خلال الفترة</h3>
          <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
            [مخطط نمو المحتوى - يتم إدراجه برمجياً]
          </div>
        </div>
      )}

      {/* Popular Content */}
      {metrics.popular_content && data.popular_content && (
        <div className="bg-white rounded-xl mb-8 overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h3 className="text-xl font-semibold">المحتوى الأكثر شعبية</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">الأغنية</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">الفنان</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">عدد التشغيلات</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">التقييم</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">النوع</th>
                </tr>
              </thead>
              <tbody>
                {data.popular_content.songs.map((song, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-4">{song.title}</td>
                    <td className="px-6 py-4">{song.artist}</td>
                    <td className="px-6 py-4">{song.plays.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {song.rating ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {song.rating}/5
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          غير مقيم
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {song.genres.map((genre, genreIndex) => (
                          <span key={genreIndex} className="bg-primary text-white px-2 py-1 rounded text-xs">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Additions */}
      {data.recent_additions && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {data.recent_additions.map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-gray-600">{item.artist}</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2"><strong>تاريخ الإضافة:</strong> {formatDate(item.added_date)}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>المدة:</strong> {item.duration}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>النوع:</strong></p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.genres.map((genre, genreIndex) => (
                    <span key={genreIndex} className="bg-primary text-white px-2 py-1 rounded text-xs">
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600"><strong>التشغيلات:</strong> {item.plays.toLocaleString()}</p>
              </div>
            </div>
          ))}
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
