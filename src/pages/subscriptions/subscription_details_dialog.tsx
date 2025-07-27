"use client"

import { CheckCircle, CreditCard, User, Calendar, DollarSign, AlertCircle } from 'lucide-react'
import Dialog from "../../components/ui/dialog"
import Button from "../../components/ui/button"
import type { Subscription } from "../../types/subscription"
import { formatDate } from "../../lib/date"

interface SubscriptionDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  subscription: Subscription | null
}

export default function SubscriptionDetailsDialog({ isOpen, onClose, subscription }: SubscriptionDetailsDialogProps) {
  if (!subscription) return null

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
      active: { color: "text-green-600 bg-green-50 border-green-200", text: "نشط", icon: CheckCircle },
      cancelled: { color: "text-red-600 bg-red-50 border-red-200", text: "ملغي", icon: AlertCircle },
      expired: { color: "text-gray-600 bg-gray-50 border-gray-200", text: "منتهي", icon: Calendar },
      pending: { color: "text-yellow-600 bg-yellow-50 border-yellow-200", text: "معلق", icon: Calendar },
      paused: { color: "text-blue-600 bg-blue-50 border-blue-200", text: "متوقف", icon: Calendar },
    }
    return statusMap[status] || statusMap.pending
  }

  const statusInfo = getStatusInfo(subscription.status)
  const StatusIcon = statusInfo.icon

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تفاصيل الاشتراك" size="lg">
      <div className="space-y-6">
        {/* Subscription Overview */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{subscription.plan?.name_ar}</h3>
              <p className="text-primary-100">{subscription.plan?.description_ar}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border bg-white ${statusInfo.color.replace('bg-', 'text-').replace('text-', 'text-')}`}>
              <StatusIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{statusInfo.text}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-primary-100 text-sm">السعر</p>
              <p className="text-2xl font-bold">{formatCurrency(subscription.plan?.price || 0)}</p>
            </div>
            <div>
              <p className="text-primary-100 text-sm">المدة</p>
              <p className="text-lg font-medium">
                {subscription.plan?.duration_months === 1 ? "شهر واحد" : `${subscription.plan?.duration_months} شهر`}
              </p>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">معلومات المستخدم</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{subscription.user?.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{subscription.user?.name}</p>
                  <p className="text-sm text-gray-500">{subscription.user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">رقم المستخدم: {subscription.user?.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">عضو منذ: {formatDate(subscription.user?.joined_at || "")}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">تفاصيل الاشتراك</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">رقم الاشتراك:</span>
                <span className="font-mono">#{subscription.id.toString().padStart(6, "0")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ البداية:</span>
                <span>{formatDate(subscription.start_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الانتهاء:</span>
                <span>{formatDate(subscription.end_date)}</span>
              </div>
              {subscription.next_billing_date && (
                <div className="flex justify-between">
                  <span className="text-gray-600">التجديد التالي:</span>
                  <span>{formatDate(subscription.next_billing_date)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">التجديد التلقائي:</span>
                <span className={subscription.auto_renew ? "text-green-600" : "text-red-600"}>
                  {subscription.auto_renew ? "مفعل" : "معطل"}
                </span>
              </div>
              {subscription.is_trial && (
                <div className="flex justify-between">
                  <span className="text-gray-600">فترة تجريبية:</span>
                  <span className="text-blue-600">نعم</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">ميزات الباقة</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscription.plan?.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Info */}
        {subscription.status === "cancelled" && subscription.cancelled_at && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-red-900 mb-2">معلومات الإلغاء</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-600">تاريخ الإلغاء:</span>
                <span className="text-red-900">{formatDate(subscription.cancelled_at)}</span>
              </div>
              {subscription.cancellation_reason && (
                <div>
                  <span className="text-red-600">سبب الإلغاء:</span>
                  <p className="text-red-900 mt-1">{subscription.cancellation_reason}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose}>
            إغلاق
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
