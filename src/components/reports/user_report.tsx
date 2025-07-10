"use client"

import { LucideActivity, RefreshCcw, UserPlus, Users } from "lucide-react"
import { formatDateTime } from "../../lib/date"

interface UserReportData {
  total_users: {
    value: number
    change?: number
    change_positive?: boolean
  }
  active_users: {
    value: number
    percentage?: number
  }
  new_users: {
    value: number
    daily_average?: number
  }
  user_retention: {
    value: number
  }
  user_demographics: {
    age_groups: Array<{
      range: string
      count: number
      percentage: number
    }>
  }
  top_users: Array<{
    name: string
    sessions: number
    listening_hours: number
  }>
  activity_by_time: Array<{
    time_period: string
    active_users: number
    percentage: number
  }>
}

interface UserReportMetrics {
  total_users?: boolean
  active_users?: boolean
  new_users?: boolean
  user_retention?: boolean
  user_demographics?: boolean
}

interface UserReportProps {
  title: string
  description?: string
  date_range: {
    start_date: string
    end_date: string
  }
  generated_at: string
  data: UserReportData
  metrics?: UserReportMetrics
  include_charts?: boolean
}

export default function UsersReport({
  title,
  description,
  date_range,
  generated_at,
  data,
  metrics = {
    total_users: true,
    active_users: true,
    new_users: true,
    user_retention: true,
    user_demographics: true,
  },
  include_charts = true,
}: UserReportProps) {
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
            <div className="text-base font-semibold">تقرير المستخدمين</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.total_users && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <Users />
              </div>
              <div className="text-lg font-semibold text-gray-900">إجمالي المستخدمين</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.total_users.value.toLocaleString()}</div>
            {data.total_users.change && (
              <div className={`text-sm ${data.total_users.change_positive ? 'text-accent' : 'text-destructive'}`}>
                {data.total_users.change > 0 ? '+' : ''}{data.total_users.change}% من الشهر الماضي
              </div>
            )}
          </div>
        )}

        {metrics.active_users && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <LucideActivity />
              </div>
              <div className="text-lg font-semibold text-gray-900">المستخدمين النشطين</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.active_users.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              نشطين خلال آخر 30 يوم
              {data.active_users.percentage && (
                <span> ({data.active_users.percentage}% من إجمالي المستخدمين)</span>
              )}
            </div>
          </div>
        )}

        {metrics.new_users && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <UserPlus />
              </div>
              <div className="text-lg font-semibold text-gray-900">المستخدمين الجدد</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.new_users.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              مستخدمين جدد خلال الفترة المحددة
              {data.new_users.daily_average && (
                <span> (معدل {data.new_users.daily_average} يومياً)</span>
              )}
            </div>
          </div>
        )}

        {metrics.user_retention && (
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl ml-3">
                <RefreshCcw />
              </div>
              <div className="text-lg font-semibold text-gray-900">معدل الاحتفاظ</div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{data.user_retention.value}%</div>
            <div className="text-sm text-gray-600">معدل عودة المستخدمين خلال 30 يوم</div>
          </div>
        )}
      </div>

      {/* User Growth Chart */}
      {include_charts && (
        <div className="bg-white p-8 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">نمو المستخدمين خلال الفترة</h3>
          <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
            [مخطط نمو المستخدمين - يتم إدراجه برمجياً]
          </div>
        </div>
      )}

      {/* User Demographics */}
      {metrics.user_demographics && data.user_demographics && (
        <div className="bg-white rounded-xl mb-8 overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h3 className="text-xl font-semibold">التركيبة السكانية للمستخدمين</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">الفئة العمرية</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">عدد المستخدمين</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">النسبة المئوية</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">التوزيع</th>
                </tr>
              </thead>
              <tbody>
                {data.user_demographics.age_groups.map((group, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-4">{group.range}</td>
                    <td className="px-6 py-4">{group.count.toLocaleString()}</td>
                    <td className="px-6 py-4">{group.percentage}%</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${group.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Active Users */}
      {data.top_users && (
        <div className="bg-white rounded-xl mb-8 overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h3 className="text-xl font-semibold">أكثر المستخدمين نشاطاً</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">المستخدم</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">عدد الجلسات</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">ساعات الاستماع</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-900">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {data.top_users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.sessions}</td>
                    <td className="px-6 py-4">{user.listening_hours} ساعة</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        نشط
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
