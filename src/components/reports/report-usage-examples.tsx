"use client"
import UsersReport from "./user_report"
import ContentReport from "./content_report"
import EngagementReport from "./engagement_report"

// Example usage of Users Report
export function UsersReportExample() {
  const usersData = {
    total_users: {
      value: 15420,
      change: 12.5,
      change_positive: true
    },
    active_users: {
      value: 8750,
      percentage: 56.7
    },
    new_users: {
      value: 1250,
      daily_average: 42
    },
    user_retention: {
      value: 78.5
    },
    user_demographics: {
      age_groups: [
        { range: "18-24", count: 4500, percentage: 29.2 },
        { range: "25-34", count: 6200, percentage: 40.2 },
        { range: "35-44", count: 3100, percentage: 20.1 },
        { range: "45+", count: 1620, percentage: 10.5 }
      ]
    },
    top_users: [
      { name: "أحمد محمد", sessions: 145, listening_hours: 89 },
      { name: "فاطمة علي", sessions: 132, listening_hours: 76 },
      { name: "محمد حسن", sessions: 128, listening_hours: 82 }
    ],
    activity_by_time: [
      { time_period: "الصباح (6-12)", active_users: 2500, percentage: 28.6 },
      { time_period: "بعد الظهر (12-18)", active_users: 3200, percentage: 36.6 },
      { time_period: "المساء (18-24)", active_users: 2800, percentage: 32.0 },
      { time_period: "الليل (24-6)", active_users: 250, percentage: 2.8 }
    ]
  }

  return (
    <UsersReport
      title="تقرير المستخدمين الشهري"
      description="تحليل شامل لبيانات المستخدمين ونشاطهم خلال شهر يناير 2024"
      date_range={{
        start_date: "2024-01-01",
        end_date: "2024-01-31"
      }}
      generated_at="2024-02-01T10:30:00Z"
      data={usersData}
      metrics={{
        total_users: true,
        active_users: true,
        new_users: true,
        user_retention: true,
        user_demographics: true
      }}
      include_charts={true}
    />
  )
}

// Example usage of Content Report
export function ContentReportExample() {
  const contentData = {
    total_songs: {
      value: 25680,
      change: 8.3,
      change_positive: true
    },
    total_artists: {
      value: 3420
    },
    total_playlists: {
      value: 12500,
      public: 8200,
      private: 4300
    },
    content_growth: {
      value: 15.2
    },
    popular_content: {
      songs: [
        {
          title: "أغنية شعبية",
          artist: "فنان مشهور",
          plays: 125000,
          rating: 4.8,
          genres: ["بوب", "عربي"]
        },
        {
          title: "أغنية رائجة",
          artist: "مطرب معروف",
          plays: 98000,
          rating: 4.6,
          genres: ["روك", "حديث"]
        }
      ]
    },
    top_artists: [
      { name: "محمد عبده", songs_count: 45, total_plays: 890000, followers: 125000 },
      { name: "أم كلثوم", songs_count: 38, total_plays: 750000, followers: 98000 }
    ],
    content_by_genre: [
      { genre: "عربي", count: 8500, percentage: 33.1 },
      { genre: "بوب", count: 6200, percentage: 24.1 },
      { genre: "روك", count: 4800, percentage: 18.7 },
      { genre: "كلاسيكي", count: 3200, percentage: 12.5 },
      { genre: "أخرى", count: 2980, percentage: 11.6 }
    ],
    recent_additions: [
      {
        title: "أغنية جديدة",
        artist: "فنان صاعد",
        added_date: "2024-01-28",
        duration: "3:45",
        genres: ["بوب", "حديث"],
        plays: 1250
      }
    ]
  }

  return (
    <ContentReport
      title="تقرير المحتوى الشهري"
      description="إحصائيات شاملة عن المحتوى الموسيقي والفنانين"
      date_range={{
        start_date: "2024-01-01",
        end_date: "2024-01-31"
      }}
      generated_at="2024-02-01T10:30:00Z"
      data={contentData}
      include_charts={true}
    />
  )
}

// Example usage of Engagement Report
export function EngagementReportExample() {
  const engagementData = {
    total_plays: {
      value: 2450000,
      change: 18.7,
      change_positive: true
    },
    listening_hours: {
      value: 125000,
      average_per_user: 14.3
    },
    session_duration: {
      value: 28.5
    },
    user_engagement: {
      value: 67.8
    },
    popular_times: {
      hourly: [
        { hour: 6, activity_level: "منخفض", is_peak: false },
        { hour: 7, activity_level: "متوسط", is_peak: false },
        { hour: 8, activity_level: "عالي", is_peak: true },
        { hour: 9, activity_level: "عالي", is_peak: true },
        { hour: 10, activity_level: "متوسط", is_peak: false },
        { hour: 11, activity_level: "متوسط", is_peak: false },
        { hour: 12, activity_level: "عالي", is_peak: true },
        { hour: 13, activity_level: "عالي", is_peak: true },
        { hour: 14, activity_level: "متوسط", is_peak: false },
        { hour: 15, activity_level: "متوسط", is_peak: false },
        { hour: 16, activity_level: "عالي", is_peak: true },
        { hour: 17, activity_level: "عالي", is_peak: true },
        { hour: 18, activity_level: "عالي جداً", is_peak: true },
        { hour: 19, activity_level: "عالي جداً", is_peak: true },
        { hour: 20, activity_level: "عالي", is_peak: true },
        { hour: 21, activity_level: "متوسط", is_peak: false },
        { hour: 22, activity_level: "منخفض", is_peak: false },
        { hour: 23, activity_level: "منخفض", is_peak: false }
      ]
    },
    most_played_songs: [
      {
        title: "الأغنية الأولى",
        artist: "الفنان الأول",
        plays: 45000,
        total_listening_time: 2250,
        completion_rate: 85
      },
      {
        title: "الأغنية الثانية",
        artist: "الفنان الثاني",
        plays: 38000,
        total_listening_time: 1900,
        completion_rate: 78
      }
    ],
    engagement_patterns: [
      { activity_type: "تشغيل أغنية", count: 2450000, percentage: 65.2 },
      { activity_type: "إنشاء قائمة تشغيل", count: 125000, percentage: 3.3 },
      { activity_type: "مشاركة أغنية", count: 89000, percentage: 2.4 },
      { activity_type: "إعجاب", count: 1100000, percentage: 29.1 }
    ],
    device_usage: [
      { device_type: "الهاتف المحمول", sessions: 185000, avg_session_duration: 25, percentage: 68.5 },
      { device_type: "الحاسوب", sessions: 65000, avg_session_duration: 45, percentage: 24.1 },
      { device_type: "الجهاز اللوحي", sessions: 20000, avg_session_duration: 35, percentage: 7.4 }
    ],
    weekly_activity: [
      { day: "الأحد", sessions: 35000, listening_hours: 15000, active_users: 12000, activity_percentage: 85 },
      { day: "الاثنين", sessions: 42000, listening_hours: 18000, active_users: 14500, activity_percentage: 100 },
      { day: "الثلاثاء", sessions: 38000, listening_hours: 16500, active_users: 13200, activity_percentage: 90 },
      { day: "الأربعاء", sessions: 40000, listening_hours: 17200, active_users: 13800, activity_percentage: 95 },
      { day: "الخميس", sessions: 45000, listening_hours: 19500, active_users: 15200, activity_percentage: 100 },
      { day: "الجمعة", sessions: 48000, listening_hours: 21000, active_users: 16000, activity_percentage: 100 },
      { day: "السبت", sessions: 32000, listening_hours: 14000, active_users: 11500, activity_percentage: 75 }
    ]
  }

  return (
    <EngagementReport
      title="تقرير التفاعل الشهري"
      description="تحليل مفصل لتفاعل المستخدمين مع المنصة"
      date_range={{
        start_date: "2024-01-01",
        end_date: "2024-01-31"
      }}
      generated_at="2024-02-01T10:30:00Z"
      data={engagementData}
      metrics={{
        total_plays: true,
        listening_hours: true,
        session_duration: true,
        user_engagement: true,
        popular_times: true
      }}
      include_charts={true}
    />
  )
}
