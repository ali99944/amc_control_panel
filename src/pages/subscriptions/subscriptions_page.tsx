"use client"

import { useState } from "react"
import { CreditCard, Users, TrendingUp, Calendar, DollarSign, AlertCircle, Eye, Ban, RefreshCw, Download } from 'lucide-react'
import DataTable, { type Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import type { Subscription, SubscriptionAnalytics } from "../../types/subscription"
import { formatDate } from "../../lib/date"
import CancelSubscriptionDialog from "./cancel_subscription_dialog"
import SubscriptionDetailsDialog from "./subscription_details_dialog"
import { useNavigate } from "react-router-dom"


// Mock data - replace with actual API calls
const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    user_id: 1,
    plan_id: 1,
    status: "active",
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2024-02-01T00:00:00Z",
    next_billing_date: "2024-02-01T00:00:00Z",
    cancelled_at: null,
    cancellation_reason: null,
    auto_renew: true,
    trial_end_date: null,
    is_trial: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    user: {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      gender: "male",
      birth_date: "1990-01-01",
      phone_number: "+966501234567",
      profile_picture: null,
      is_active: true,
      is_banned: false,
      joined_at: "2024-01-01T00:00:00Z",
      last_login_time: "2024-01-15T09:00:00Z",
    },
    plan: {
      id: 1,
      name: "Premium Plan",
      name_ar: "الباقة المميزة",
      description: "Premium features with unlimited access",
      description_ar: "ميزات مميزة مع وصول غير محدود",
      price: 29.99,
      currency: "USD",
      duration_months: 1,
      features: ["Unlimited streaming", "High quality audio", "Offline downloads"],
      max_offline_downloads: 10000,
      audio_quality: "high",
      ads_free: true,
      skip_limit: null,
      is_active: true,
      is_popular: true,
      trial_days: 7,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 2,
    user_id: 2,
    plan_id: 2,
    status: "cancelled",
    start_date: "2024-01-10T00:00:00Z",
    end_date: "2024-02-10T00:00:00Z",
    next_billing_date: null,
    cancelled_at: "2024-01-20T00:00:00Z",
    cancellation_reason: "Too expensive",
    auto_renew: false,
    trial_end_date: "2024-01-17T00:00:00Z",
    is_trial: false,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
    user: {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@example.com",
      gender: "female",
      birth_date: "1985-05-15",
      phone_number: "+966507654321",
      profile_picture: null,
      is_active: true,
      is_banned: false,
      joined_at: "2024-01-10T00:00:00Z",
      last_login_time: "2024-01-20T14:00:00Z",
    },
    plan: {
      id: 2,
      name: "Annual Premium",
      name_ar: "الباقة المميزة السنوية",
      description: "Annual premium subscription with discount",
      description_ar: "اشتراك مميز سنوي مع خصم",
      price: 299.99,
      currency: "USD",
      duration_months: 12,
      features: ["All premium features", "Annual discount", "Priority support"],
      max_offline_downloads: 50000,
      audio_quality: "lossless",
      ads_free: true,
      skip_limit: null,
      is_active: true,
      is_popular: false,
      trial_days: 14,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
]

const mockAnalytics: SubscriptionAnalytics = {
  total_subscriptions: 15420,
  active_subscriptions: 12350,
  cancelled_subscriptions: 2100,
  expired_subscriptions: 970,
  trial_subscriptions: 1250,
  monthly_revenue: 425000,
  churn_rate: 5.2,
  conversion_rate: 68.5,
  average_subscription_length: 8.5,
  most_popular_plan: mockSubscriptions[0].plan || null,
  revenue_by_plan: [],
  subscription_trends: [],
}

export default function SubscriptionsPage() {
  const router = useNavigate()
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions)
  const [analytics] = useState<SubscriptionAnalytics>(mockAnalytics)
  const [isLoading] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Format currency
  const formatCurrency = (amount: number, currency = "USD"): string => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  // Get status info
  const getStatusInfo = (status: Subscription["status"]) => {
    const statusMap = {
      active: { color: "text-green-600 bg-green-50", text: "نشط" },
      cancelled: { color: "text-red-600 bg-red-50", text: "ملغي" },
      expired: { color: "text-gray-600 bg-gray-50", text: "منتهي" },
      pending: { color: "text-yellow-600 bg-yellow-50", text: "معلق" },
      paused: { color: "text-blue-600 bg-blue-50", text: "متوقف" },
    }
    return statusMap[status] || statusMap.pending
  }

  // Handle actions
  const handleViewDetails = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setIsDetailsDialogOpen(true)
  }

  const handleCancelSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setIsCancelDialogOpen(true)
  }

  // DataTable columns
  const columns: Column<Subscription>[] = [
    {
      key: "id",
      title: "رقم الاشتراك",
      width: "120px",
      render: (value: number) => (
        <span className="font-mono text-sm text-gray-600">#{value.toString().padStart(6, "0")}</span>
      ),
    },
    {
      key: "user",
      title: "المستخدم",
      render: (_, row: Subscription) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{row.user?.name.charAt(0) || "؟"}</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.user?.name || "غير معروف"}</div>
            <div className="text-sm text-gray-500">{row.user?.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      title: "الباقة",
      render: (_, row: Subscription) => (
        <div>
          <div className="font-medium text-gray-900">{row.plan?.name_ar || row.plan?.name}</div>
          <div className="text-sm text-gray-500">
            {formatCurrency(row.plan?.price || 0)} / {row.plan?.duration_months === 1 ? "شهر" : `${row.plan?.duration_months} شهر`}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      title: "الحالة",
      render: (value: Subscription["status"], row: Subscription) => {
        const statusInfo = getStatusInfo(value)
        return (
          <div className="space-y-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
            {row.is_trial && (
              <div className="text-xs text-blue-600">فترة تجريبية</div>
            )}
          </div>
        )
      },
    },
    {
      key: "start_date",
      title: "تاريخ البداية",
      sortable: true,
      render: (value: string) => formatDate(value),
    },
    {
      key: "end_date",
      title: "تاريخ الانتهاء",
      sortable: true,
      render: (value: string, row: Subscription) => (
        <div>
          <div>{formatDate(value)}</div>
          {row.auto_renew && row.status === "active" && (
            <div className="text-xs text-green-600">تجديد تلقائي</div>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "140px",
      render: (_, row: Subscription) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleViewDetails(row)} title="عرض التفاصيل">
            <Eye className="w-4 h-4" />
          </Button>
          {row.status === "active" && (
            <Button size="sm" variant="danger" onClick={() => handleCancelSubscription(row)} title="إلغاء الاشتراك">
              <Ban className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة الاشتراكات">
        <Button variant="secondary" icon={Download}>
          تصدير التقرير
        </Button>
      </Toolbar>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الاشتراكات</p>
              <p className="text-lg font-bold text-primary">{analytics.total_subscriptions.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">اشتراكات نشطة</p>
              <p className="text-lg font-bold text-green-600">{analytics.active_subscriptions.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">اشتراكات ملغية</p>
              <p className="text-lg font-bold text-red-600">{analytics.cancelled_subscriptions.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">فترات تجريبية</p>
              <p className="text-lg font-bold text-blue-600">{analytics.trial_subscriptions.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">الإيرادات الشهرية</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(analytics.monthly_revenue)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">معدل الإلغاء</p>
              <p className="text-lg font-bold text-yellow-600">{analytics.churn_rate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <DataTable
        data={subscriptions}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد اشتراكات</p>
          </div>
        }
      />

      {/* Dialogs */}
      <SubscriptionDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        subscription={selectedSubscription}
      />

      <CancelSubscriptionDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        subscription={selectedSubscription}
        onSuccess={() => {
          // Refresh data
          console.log("Subscription cancelled")
        }}
      />
    </div>
  )
}
