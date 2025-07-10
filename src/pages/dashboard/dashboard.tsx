"use client"

import { 
  Music, Users, PlayCircle, Home, 
  Disc,
  Headphones, BarChart2,
  User, 
} from "lucide-react"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import Chart from "../../components/ui/chart"
import { useSongs } from "../../hooks/use-songs"
import { useArtists } from "../../hooks/use-artists"
import { usePlaylists } from "../../hooks/use-playlists"
import { usePlatformStats, useChartData } from "../../hooks/use-statistics"
import { ScrollArea } from "../../components/ui/scroll-area"
import EmptyState from "../../components/empty_state"

export default function Dashboard() {
  // Fetch data
  const { data: songs } = useSongs()
  const { data: artists } = useArtists()
  
  const { data: playlists } = usePlaylists()
  const { data: platformStats } = usePlatformStats()
  const { data: engagementChart } = useChartData('engagement', '7d')
  
  // Format numbers
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
      <div className="space-y-4">
        {/* Page Header */}
        <Toolbar title="لوحة التحكم الرئيسية">
          <Home />
        </Toolbar>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الأغاني</p>
                <p className="text-2xl font-bold text-primary">
                  {formatNumber(songs?.length || 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">المستخدمين النشطين</p>
                <p className="text-2xl font-bold text-primary">
                  {formatNumber(platformStats?.users?.active || 0)}
                </p>

              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">قوائم التشغيل</p>
                <p className="text-2xl font-bold text-primary">
                  {formatNumber(playlists?.length || 890)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مرات التشغيل</p>
                <p className="text-2xl font-bold text-primary">
                  {formatNumber(platformStats?.engagement?.total_plays || 12345)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Engagement Chart */}
        {engagementChart && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">نشاط الاستماع (آخر 7 أيام)</h3>
              <p className="text-sm text-gray-600">التشغيلات وساعات الاستماع اليومية</p>
            </div>
            <Chart data={engagementChart} type="area" height={250} />
          </Card>
        )}

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-primary mb-4">الأغاني الأكثر تشغيلاً</h3>
            <ScrollArea maxHeight={320}>
            <div className="space-y-3 ">
              {(songs?.slice(0, 5) || Array(5).fill(null)).map((song, index) => (
                <div key={song?.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                    {song?.cover_image ? (
                      <img src={song.cover_image} alt={song.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{song?.title || `أغنية رقم ${index + 1}`}</p>
                    <p className="text-sm text-gray-600 truncate">{song?.artist?.name || `الفنان ${index + 1}`}</p>
                  </div>
                  <div className="text-sm text-gray-500">{formatNumber(song?.plays_count || 1234)} تشغيل</div>
                </div>
              ))}
            </div>
            </ScrollArea>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-primary mb-4">النشاط الأخير</h3>
            <ScrollArea height={320}>
            <div className="space-y-3">
              {[
                "تم إضافة أغنية جديدة",
                "انضم مستخدم جديد",
                "تم إنشاء قائمة تشغيل",
                "تم تحديث معلومات فنان",
                "تم حذف أغنية",
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity}</p>
                    <p className="text-xs text-gray-500">منذ {index + 1} دقائق</p>
                  </div>
                </div>
              ))}
            </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Featured Artists */}
        <Card>
          <h3 className="text-lg font-bold text-primary mb-4">الفنانين المميزين</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(artists?.filter(a => a.is_featured)?.slice(0, 5) || Array(5).fill(null)).map((artist, index) => (
              <div key={artist?.id || index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden mb-2">
                  {artist?.image ? (
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <p className="font-medium text-gray-900">{artist?.name || `الفنان ${index + 1}`}</p>
                <p className="text-xs text-gray-600">{formatNumber(artist?.total_followers || 1000 * (index + 1))} متابع</p>
              </div>
            ))}

          </div>

          {
              artists?.filter(artist => artist.is_featured).length == 0 && (
                <EmptyState
                  message="لا يوجد فنانين مميزين"
                  icon={User}
                />
              )
            }
        </Card>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          {/* Engagement Stats */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">التفاعل</h3>
              <BarChart2 className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ساعات الاستماع</span>
                <span className="font-bold">{formatNumber(platformStats?.engagement?.total_listening_hours || 45000)} ساعة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">متوسط مدة الجلسة</span>
                <span className="font-bold">{platformStats?.engagement?.average_session_duration || 24} دقيقة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">المستخدمين النشطين يومياً</span>
                <span className="font-bold">{formatNumber(platformStats?.engagement?.daily_active_users || 2300)}</span>
              </div>
            </div>
          </Card>

          {/* Content Stats */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">المحتوى</h3>
              <Disc className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">الفنانين</span>
                <span className="font-bold">{formatNumber(platformStats?.content?.total_artists || artists?.length || 350)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">الأغاني</span>
                <span className="font-bold">{formatNumber(platformStats?.content?.total_songs || songs?.length || 1234)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">التصنيفات</span>
                <span className="font-bold">{formatNumber(platformStats?.content?.total_genres || 24)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
  )
}
