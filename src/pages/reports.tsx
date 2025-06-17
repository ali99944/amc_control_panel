"use client"

import { useState } from "react"
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  Music,
  TrendingUp,
  DollarSign,
  Activity,
  FileText,
  RefreshCw,
  Eye,
  Share2,
  Clock,
} from "lucide-react"

interface ReportConfig {
  id: string
  name: string
  description: string
  type: "users" | "music" | "financial" | "analytics" | "system"
  format: "pdf" | "excel" | "csv"
  dateRange: {
    start: string
    end: string
  }
  filters: {
    [key: string]: unknown
  }
}

const reportTypes = [
  {
    id: "user-analytics",
    name: "تحليلات المستخدمين",
    description: "تقرير شامل عن نشاط المستخدمين والتسجيلات الجديدة",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    category: "users",
  },
  {
    id: "music-performance",
    name: "أداء الموسيقى",
    description: "إحصائيات الاستماع والأغاني الأكثر شعبية",
    icon: Music,
    color: "text-green-600",
    bgColor: "bg-green-50",
    category: "music",
  },
  {
    id: "financial-summary",
    name: "الملخص المالي",
    description: "تقرير الإيرادات والاشتراكات والمدفوعات",
    icon: DollarSign,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    category: "financial",
  },
  {
    id: "engagement-metrics",
    name: "مقاييس التفاعل",
    description: "معدلات التفاعل والمشاركة والإعجابات",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    category: "analytics",
  },
  {
    id: "system-performance",
    name: "أداء النظام",
    description: "إحصائيات الخادم والأداء التقني",
    icon: Activity,
    color: "text-red-600",
    bgColor: "bg-red-50",
    category: "system",
  },
  {
    id: "playlist-analytics",
    name: "تحليلات قوائم التشغيل",
    description: "أداء قوائم التشغيل والمتابعين",
    icon: BarChart3,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    category: "music",
  },
]

const recentReports = [
  {
    id: "1",
    name: "تقرير المستخدمين - يناير 2024",
    type: "تحليلات المستخدمين",
    generatedAt: "2024-01-20 14:30",
    format: "PDF",
    size: "2.4 MB",
    status: "مكتمل",
  },
  {
    id: "2",
    name: "أداء الموسيقى - الأسبوع الماضي",
    type: "أداء الموسيقى",
    generatedAt: "2024-01-19 09:15",
    format: "Excel",
    size: "1.8 MB",
    status: "مكتمل",
  },
  {
    id: "3",
    name: "الملخص المالي - ديسمبر 2023",
    type: "الملخص المالي",
    generatedAt: "2024-01-18 16:45",
    format: "PDF",
    size: "3.2 MB",
    status: "مكتمل",
  },
]

export default function ReportsPage() {
  const [, setSelectedReportType] = useState<string | null>(null)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")

  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    id: "",
    name: "",
    description: "",
    type: "users",
    format: "pdf",
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      end: new Date().toISOString().split("T")[0],
    },
    filters: {},
  })

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))
      console.log("Generating report:", reportConfig)
      setShowGenerateModal(false)
      // Reset form
      setReportConfig({
        ...reportConfig,
        id: "",
        name: "",
        description: "",
        filters: {},
      })
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const filteredReportTypes = reportTypes.filter(
    (report) => filterCategory === "all" || report.category === filterCategory,
  )

  const stats = [
    {
      label: "التقارير المُنشأة",
      value: "156",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      label: "التقارير هذا الشهر",
      value: "23",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      label: "التقارير المجدولة",
      value: "8",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      label: "التقارير المشتركة",
      value: "12",
      icon: Share2,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-[#1DB954] to-[#1ed760] rounded-xl p-4 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">التقارير والإحصائيات</h1>
            <p className="text-black/80">إنشاء وإدارة التقارير التفصيلية لمركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center px-4 py-2 bg-black/20 text-black rounded-lg hover:bg-black/30 transition-colors"
          >
            <FileText size={20} className="ml-2" />
            إنشاء تقرير جديد
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#1DB954]">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-[#1DB954] rounded-lg flex items-center justify-center">
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Types */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">أنواع التقارير</h2>
              <div className="flex items-center gap-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                >
                  <option value="all">جميع الفئات</option>
                  <option value="users">المستخدمين</option>
                  <option value="music">الموسيقى</option>
                  <option value="financial">المالية</option>
                  <option value="analytics">التحليلات</option>
                  <option value="system">النظام</option>
                </select>
                <button className="p-2 text-gray-600 hover:text-[#1DB954] hover:bg-gray-100 rounded-lg">
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReportTypes.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#1DB954] transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedReportType(report.id)
                    setReportConfig((prev) => ({
                      ...prev,
                      id: report.id,
                      name: report.name,
                      description: report.description,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      type: report.category as any,
                    }))
                    setShowGenerateModal(true)
                  }}
                >
                  <div className="flex items-start">
                    <div className={`w-12 h-12 ${report.bgColor} rounded-lg flex items-center justify-center ml-4`}>
                      <report.icon size={24} className={report.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${report.bgColor} ${report.color}`}>
                          {report.category === "users" && "مستخدمين"}
                          {report.category === "music" && "موسيقى"}
                          {report.category === "financial" && "مالية"}
                          {report.category === "analytics" && "تحليلات"}
                          {report.category === "system" && "نظام"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">التقارير الأخيرة</h2>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{report.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{report.type}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="ml-1" />
                        {report.generatedAt}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mb-2">
                        {report.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-600 hover:text-[#1DB954]">
                          <Eye size={14} />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-[#1DB954]">
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{report.format}</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">إنشاء تقرير جديد</h2>
              <button onClick={() => setShowGenerateModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم التقرير</label>
                <input
                  type="text"
                  value={reportConfig.name}
                  onChange={(e) => setReportConfig((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                  placeholder="أدخل اسم التقرير"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={reportConfig.description}
                  onChange={(e) => setReportConfig((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                  placeholder="وصف مختصر للتقرير"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية</label>
                  <input
                    type="date"
                    value={reportConfig.dateRange.start}
                    onChange={(e) =>
                      setReportConfig((prev) => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ النهاية</label>
                  <input
                    type="date"
                    value={reportConfig.dateRange.end}
                    onChange={(e) =>
                      setReportConfig((prev) => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق التقرير</label>
                <select
                  value={reportConfig.format}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e) => setReportConfig((prev) => ({ ...prev, format: e.target.value as any }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <FileText size={16} className="ml-2" />
                      إنشاء التقرير
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
