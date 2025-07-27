"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, Mail, Printer, CheckCircle, Building2, Calendar, CreditCard } from 'lucide-react'
import Button from "../../components/ui/button"
import Toolbar from "../../components/ui/toolbar"
import type { Payment } from "../../types/payment"
import { formatDate } from "../../lib/date"
import { useNavigate, useParams } from "react-router-dom"

// Mock company data - replace with actual company info
const companyInfo = {
  name: "سبوتيفاي العربية",
  name_en: "Spotify Arabia",
  address: "شارع الملك فهد، حي العليا",
  address_line2: "الرياض، المملكة العربية السعودية",
  postal_code: "12345",
  phone: "+966 11 123 4567",
  email: "billing@spotify-arabia.com",
  website: "www.spotify-arabia.com",
  tax_number: "123456789012345",
  commercial_register: "1010123456",
}

// Mock data - same as payment details
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

export default function PaymentInvoicePage() {
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

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Implement PDF download functionality
    console.log("Download PDF")
  }

  const handleEmailInvoice = () => {
    // Implement email functionality
    console.log("Email invoice")
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لم يتم العثور على الفاتورة</p>
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

  // Calculate tax (assuming 15% VAT for Saudi Arabia)
  const taxRate = 0.15
  const subtotal = payment.amount / (1 + taxRate)
  const taxAmount = payment.amount - subtotal

  return (
    <div className="space-y-6">
      {/* Toolbar - Hidden in print */}
      <div className="print:hidden">
        <Toolbar
          title={`فاتورة رقم INV-${payment.id.toString().padStart(6, "0")}`}
          backButton={{
            onClick: () => navigate(`/payments/${payment.id}`),
            icon: ArrowLeft,
          }}
        >
          <div className="flex gap-2">
            <Button variant="secondary" icon={Download} onClick={handleDownload}>
              تحميل PDF
            </Button>
            <Button variant="secondary" icon={Mail} onClick={handleEmailInvoice}>
              إرسال بالإيميل
            </Button>
            <Button variant="primary" icon={Printer} onClick={handlePrint}>
              طباعة
            </Button>
          </div>
        </Toolbar>
      </div>

      {/* Invoice Content */}
      <div className="bg-white mx-auto max-w-4xl rounded-xl">
        <div className="max-w-4xl mx-auto p-8 print:p-6">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8 print:mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h1>
                  <p className="text-gray-600">{companyInfo.name_en}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{companyInfo.address}</p>
                <p>{companyInfo.address_line2}</p>
                <p>الرمز البريدي: {companyInfo.postal_code}</p>
                <p>هاتف: {companyInfo.phone}</p>
                <p>إيميل: {companyInfo.email}</p>
                <p>موقع: {companyInfo.website}</p>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-primary mb-2">فاتورة</h2>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">رقم الفاتورة:</span> INV-{payment.id.toString().padStart(6, "0")}
                </p>
                <p>
                  <span className="font-medium">تاريخ الفاتورة:</span> {formatDate(payment.payment_date)}
                </p>
                <p>
                  <span className="font-medium">تاريخ الاستحقاق:</span> {formatDate(payment.payment_date)}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">مدفوعة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">فاتورة إلى:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">{payment.user?.name}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{payment.user?.email}</p>
                  {payment.user?.phone_number && <p>{payment.user.phone_number}</p>}
                  {payment.payment_details?.billing_address && (
                    <>
                      <p>{payment.payment_details.billing_address.line1}</p>
                      {payment.payment_details.billing_address.line2 && (
                        <p>{payment.payment_details.billing_address.line2}</p>
                      )}
                      <p>
                        {payment.payment_details.billing_address.city}
                        {payment.payment_details.billing_address.state &&
                          `, ${payment.payment_details.billing_address.state}`}
                      </p>
                      <p>
                        {payment.payment_details.billing_address.country}{" "}
                        {payment.payment_details.billing_address.postal_code}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">تفاصيل الدفع:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">طريقة الدفع:</span>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">
                        بطاقة ائتمان ****{payment.payment_details?.card_last_four}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم المعاملة:</span>
                    <span className="text-gray-900 font-mono text-xs">{payment.transaction_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">بوابة الدفع:</span>
                    <span className="text-gray-900 capitalize">{payment.gateway}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الدفع:</span>
                    <span className="text-gray-900">{formatDate(payment.payment_date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8 print:mb-6">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الوصف
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المدة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السعر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجمالي
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{payment.plan?.name_ar}</p>
                        <p className="text-sm text-gray-500">{payment.plan?.description_ar}</p>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">الميزات المشمولة:</p>
                          <ul className="text-xs text-gray-500 space-y-0.5">
                            {payment.plan?.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                            {payment.plan?.features && payment.plan.features.length > 3 && (
                              <li className="text-gray-400">
                                +{payment.plan.features.length - 3} ميزة أخرى
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {payment.plan?.duration_months === 1 ? "شهر واحد" : `${payment.plan?.duration_months} شهر`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatCurrency(payment.plan?.price || 0, payment.currency)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(subtotal, payment.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Totals */}
          <div className="flex justify-end mb-8 print:mb-6">
            <div className="w-full max-w-sm">
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span className="text-gray-900">{formatCurrency(subtotal, payment.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ضريبة القيمة المضافة (15%):</span>
                  <span className="text-gray-900">{formatCurrency(taxAmount, payment.currency)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">المجموع الإجمالي:</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(payment.amount, payment.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Tax Information */}
          <div className="border-t border-gray-200 pt-6 print:pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">معلومات الشركة الضريبية:</h4>
                <p>الرقم الضريبي: {companyInfo.tax_number}</p>
                <p>رقم السجل التجاري: {companyInfo.commercial_register}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">ملاحظات:</h4>
                <p>شكراً لك على اختيار خدماتنا. في حالة وجود أي استفسارات، يرجى التواصل معنا.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 print:mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              تم إنشاء هذه الفاتورة إلكترونياً ولا تحتاج إلى توقيع
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {companyInfo.name} - جميع الحقوق محفوظة © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
