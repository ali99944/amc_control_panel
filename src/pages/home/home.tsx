"use client"

import { LayoutDashboard, Users, Music, ListMusic, Play, Heart, Download, Calendar, Clock, TrendingUp, Headphones, UserPlus, Volume2 } from 'lucide-react'

const stats = [
  {
    name: "إجمالي المستخدمين",
    value: "12,543",
    change: "+18%",
    changeType: "increase",
    icon: Users,
  },
  {
    name: "الأغاني المتاحة",
    value: "45,678",
    change: "+234",
    changeType: "increase",
    icon: Music,
  },
  {
    name: "قوائم التشغيل",
    value: "8,921",
    change: "+12%",
    changeType: "increase",
    icon: ListMusic,
  },
  {
    name: "ساعات الاستماع",
    value: "156,789",
    change: "+25%",
    changeType: "increase",
    icon: Headphones,
  },
]

const topSongs = [
  {
    title: "أغنية رائعة",
    artist: "محمد منير",
    plays: 15420,
    likes: 892,
    duration: "3:45",
    trending: true,
  },
  {
    title: "لحن جميل",
    artist: "أم كلثوم",
    plays: 12350,
    likes: 756,
    duration: "4:12",
    trending: true,
  },
  {
    title: "موسيقى هادئة",
    artist: "فيروز",
    plays: 9876,
    likes: 543,
    duration: "3:28",
    trending: false,
  },
]

const recentPlaylists = [
  {
    name: "أفضل الأغاني العربية",
    creator: "علي طارق",
    songs: 45,
    followers: 1250,
    lastUpdated: "2024-01-15",
    isPublic: true,
  },
  {
    name: "موسيقى للعمل",
    creator: "سارة أحمد",
    songs: 32,
    followers: 890,
    lastUpdated: "2024-01-12",
    isPublic: true,
  },
  {
    name: "أغاني الذكريات",
    creator: "محمد علي",
    songs: 28,
    followers: 567,
    lastUpdated: "2024-01-10",
    isPublic: false,
  },
]

export default function ControlPanelHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-[#1DB954] to-[#1ed760] rounded-xl p-4 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">مرحباً بك، علي!</h1>
            <p className="text-black/80">إليك نظرة عامة على مركز علي الإعلامي اليوم.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center">
              <LayoutDashboard size={32} className="text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-4  ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">{stat.name}</p>
                <p className="text-3xl font-bold text-black/80 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.changeType === "increase" ? "text-[#1DB954]" : "text-red-400"}`}>
                  {stat.change} من الشهر الماضي
                </p>
              </div>
              <div className="w-12 h-12 bg-[#1DB954] rounded-lg flex items-center justify-center">
                <stat.icon size={24} className="text-black/80" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Songs */}
        <div className="bg-white rounded-xl  ">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black/80">الأغاني الأكثر استماعاً</h2>
              <button className="text-[#1DB954] hover:text-[#1ed760] text-sm font-medium">عرض الكل</button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {topSongs.map((song, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-black/5 rounded-lg hover:bg-black/10 transition-colors">
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-[#1DB954] rounded-lg flex items-center justify-center ml-4">
                      <Music size={20} className="text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-black/80 mb-1">{song.title}</h3>
                        {song.trending && (
                          <TrendingUp size={16} className="text-[#1DB954] mr-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400 mt-1">
                        <div className="flex items-center">
                          <Play size={16} className="ml-1" />
                          {song.plays.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Heart size={16} className="ml-1" />
                          {song.likes}
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="ml-1" />
                          {song.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-[#1DB954] transition-colors">
                    <Volume2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Playlists */}
        <div className="bg-white rounded-xl  ">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black/80">قوائم التشغيل الحديثة</h2>
              <button className="text-[#1DB954] hover:text-[#1ed760] text-sm font-medium">عرض الكل</button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {recentPlaylists.map((playlist, index) => (
                <div key={index} className="p-4 bg-black/5 rounded-lg hover:bg-black/10 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#1DB954] rounded-lg flex items-center justify-center ml-3">
                        <ListMusic size={20} className="text-black" />
                      </div>
                      <div>
                        <h3 className="font-medium text-black/80">{playlist.name}</h3>
                        <p className="text-sm text-gray-400">بواسطة {playlist.creator}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        playlist.isPublic ? "bg-[#1DB954]/20 text-[#1DB954]" : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {playlist.isPublic ? "عامة" : "خاصة"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <span>{playlist.songs} أغنية</span>
                      <div className="flex items-center">
                        <UserPlus size={16} className="ml-1" />
                        {playlist.followers} متابع
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="ml-1" />
                      {playlist.lastUpdated}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl   p-4">
        <h2 className="text-xl font-bold text-black/80 mb-4">الإجراءات السريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-[#1DB954] text-black rounded-lg hover:bg-[#1ed760] transition-colors">
            <Music size={20} className="ml-2" />
            إضافة أغنية جديدة
          </button>
          <button className="flex items-center justify-center p-4 bg-black/5 text-black/80 rounded-lg hover:bg-black/10 transition-colors">
            <ListMusic size={20} className="ml-2" />
            إنشاء قائمة تشغيل
          </button>
          <button className="flex items-center justify-center p-4 bg-black/5 text-black/80 rounded-lg hover:bg-black/10 transition-colors">
            <Users size={20} className="ml-2" />
            إدارة المستخدمين
          </button>
          <button className="flex items-center justify-center p-4 bg-black/5 text-black/80 rounded-lg hover:bg-black/10 transition-colors">
            <Download size={20} className="ml-2" />
            تصدير التقارير
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl   p-4">
        <h2 className="text-xl font-bold text-black/80 mb-4">النشاط الأخير</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-black/5 rounded-lg">
            <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center ml-3">
              <UserPlus size={16} className="text-black" />
            </div>
            <div className="flex-1">
              <p className="text-black/80 text-sm">انضم مستخدم جديد: أحمد محمد</p>
              <p className="text-gray-400 text-xs">منذ 5 دقائق</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-black/5 rounded-lg">
            <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center ml-3">
              <Music size={16} className="text-black" />
            </div>
            <div className="flex-1">
              <p className="text-black/80 text-sm">تم إضافة أغنية جديدة: "لحن الحياة"</p>
              <p className="text-gray-400 text-xs">منذ 15 دقيقة</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-black/5 rounded-lg">
            <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center ml-3">
              <ListMusic size={16} className="text-black" />
            </div>
            <div className="flex-1">
              <p className="text-black/80 text-sm">تم إنشاء قائمة تشغيل جديدة: "أغاني الصباح"</p>
              <p className="text-gray-400 text-xs">منذ 30 دقيقة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
