"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  CreditCard,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Mail,
  Phone,
  MapPin,
  Shield,
} from "lucide-react"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import type { Payment } from "../../types/payment"
import { formatDate } from "../../lib/date"
import { useNavigate, useParams } from "react-router-dom"

// Mock data - replace with actual API call
const mockPaymentDetails: Payment = {
  id: 1,
  user_id: 1,
  plan_id: 1,
  amount: 29.99,
  currency: "USD",
  status: "completed",
  payment_method: "credit_card",
  transaction_id: "txn_1234567890",
  gateway: "stripe",
  gateway_transaction_id: "pi_1234567890",
  payment_date: "2024-01-15T10:30:00Z",
  created_at: "2024-01-15T10:25:00Z",
  updated_at: "2024-01-15T10:30:00Z",
  user: {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed.mohammed@example.com",
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
    description: "Premium features with unlimited access to all content",
    description_ar: "ميزات مميزة مع وصول غير محدود لجميع المحتويات",
    price: 29.99,
    currency: "USD",
    duration_months: 1,
    features: [
      "Unlimited streaming",
      "High quality audio (320kbps)",
      "Offline downloads",
      "No advertisements",
      "Skip unlimited tracks",
    ],
    is_active: true,
    is_popular: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  payment_details: {
    id: 1,
    payment_id: 1,
    card_last_four: "4242",
    card_brand: "visa",
    billing_address: {
      country: "SA",
      city: "الرياض",
      state: "الرياض",
      postal_code: "12345",
      line1: "شارع الملك فهد، حي العليا",
      line2: "مجمع البرج التجاري، الطابق 15",
    },
    receipt_url: "https://example.com/receipt/txn_1234567890",
    created_at: "2024-01-15T10:30:00Z",
  },
}

export default function PaymentDetailsPage() {
  const navigate = useNavigate()
  const params = useParams()
  const [payment, setPayment] = useState<Payment | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPayment(mockPaymentDetails)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="text-center py-8">
        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-gray-500">لم يتم العثور على تفاصيل الدفعة</p>
        <Button variant="primary" className="mt-4" onClick={() => navigate("/payments")}>
          العودة للمدفوعات
        </Button>
      </div>
    )
  }

  // Format currency
  const formatCurrency = (amount: number, currency = "USD"): string => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  // Get status info
  const getStatusInfo = (status: Payment["status"]) => {
    const statusMap = {
      completed: {
        color: "text-green-600 bg-green-50 border-green-200",
        text: "مكتمل",
        icon: CheckCircle,
        bgColor: "bg-green-500",
      },
      pending: {
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        text: "معلق",
        icon: Clock,
        bgColor: "bg-yellow-500",
      },
      failed: {
        color: "text-red-600 bg-red-50 border-red-200",
        text: "فشل",
        icon: XCircle,
        bgColor: "bg-red-500",
      },
      refunded: {
        color: "text-blue-600 bg-blue-50 border-blue-200",
        text: "مسترد",
        icon: RefreshCw,
        bgColor: "bg-blue-500",
      },
      cancelled: {
        color: "text-gray-600 bg-gray-50 border-gray-200",
        text: "ملغي",
        icon: XCircle,
        bgColor: "bg-gray-500",
      },
    }
    return statusMap[status] || statusMap.pending
  }

  const statusInfo = getStatusInfo(payment.status)
  const StatusIcon = statusInfo.icon

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Toolbar
        title={`تفاصيل الدفعة #${payment.id.toString().padStart(6, "0")}`}
        backButton={{
          onClick: () => navigate("/payments"),
          icon: ArrowLeft,
        }}
      >
        <div className="flex gap-2">
          {payment.payment_details?.receipt_url && (
            <Button variant="secondary" icon={Download}>
              تحميل الإيصال
            </Button>
          )}
          <Button variant="secondary" icon={Mail}>
            إرسال إيصال
          </Button>
        </div>
      </Toolbar>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Overview */}
          <Card>
            <div >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">نظرة عامة على الدفعة</h3>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusInfo.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{statusInfo.text}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">المبلغ المدفوع</label>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">تاريخ الدفع</label>
                    <p className="text-lg text-gray-900">{formatDate(payment.payment_date)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">طريقة الدفع</label>
                    <div className="flex items-center gap-2 mt-1">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">
                        {payment.payment_method === "credit_card" ? "بطاقة ائتمان" : payment.payment_method}
                        {payment.payment_details?.card_last_four && ` ****${payment.payment_details.card_last_four}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">رقم المعاملة</label>
                    <p className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">
                      {payment.transaction_id}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">بوابة الدفع</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900 capitalize">{payment.gateway}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">رقم معاملة البوابة</label>
                    <p className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">
                      {payment.gateway_transaction_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Subscription Plan Details */}
          <Card>
            <div >
              {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الباقة</h3> */}

              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold">{payment.plan?.name_ar}</h4>
                    <p className="text-primary-100 mt-1">{payment.plan?.description_ar}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{formatCurrency(payment.plan?.price || 0)}</p>
                    <p className="text-primary-100">
                      {payment.plan?.duration_months === 1 ? "شهرياً" : `كل ${payment.plan?.duration_months} شهر`}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">ميزات الباقة:</h5>
                <ul className="space-y-2">
                  {payment.plan?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Billing Address */}
          {payment.payment_details?.billing_address && (
            <Card>
              <div >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">عنوان الفوترة</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-gray-900">{payment.payment_details.billing_address.line1}</p>
                    {payment.payment_details.billing_address.line2 && (
                      <p className="text-gray-900">{payment.payment_details.billing_address.line2}</p>
                    )}
                    <p className="text-gray-600">
                      {payment.payment_details.billing_address.city}
                      {payment.payment_details.billing_address.state &&
                        `, ${payment.payment_details.billing_address.state}`}
                      {payment.payment_details.billing_address.postal_code &&
                        ` ${payment.payment_details.billing_address.postal_code}`}
                    </p>
                    <p className="text-gray-600">{payment.payment_details.billing_address.country}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <div >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات العميل</h3>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{payment.user?.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{payment.user?.name}</h4>
                  <p className="text-sm text-gray-500">عضو منذ {formatDate(payment.user?.joined_at || "")}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{payment.user?.email}</span>
                </div>

                {payment.user?.phone_number && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{payment.user.phone_number}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{payment.user?.gender === "male" ? "ذكر" : "أنثى"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    تاريخ الميلاد: {formatDate(payment.user?.birth_date || "")}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">حالة الحساب:</span>
                  <span className={`font-medium ${payment.user?.is_active ? "text-green-600" : "text-red-600"}`}>
                    {payment.user?.is_active ? "نشط" : "غير نشط"}
                  </span>
                </div>

                {payment.user?.last_login_time && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500">آخر تسجيل دخول:</span>
                    <span className="text-gray-700">{formatDate(payment.user.last_login_time)}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Payment Timeline */}
          <Card>
            <div >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">سجل الدفعة</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${statusInfo.bgColor} rounded-full flex items-center justify-center`}>
                    <StatusIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">تم {statusInfo.text} الدفع</p>
                    <p className="text-sm text-gray-500">{formatDate(payment.payment_date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">تم إنشاء الدفعة</p>
                    <p className="text-sm text-gray-500">{formatDate(payment.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
