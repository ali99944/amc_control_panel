// "use client"

// import { useState } from "react"
// import { CreditCard, DollarSign, TrendingUp, Users, Calendar, Eye, Download } from 'lucide-react'
// import DataTable, { Column } from "../../components/datatable"
// import Button from "../../components/ui/button"
// import Card from "../../components/ui/card"
// import Toolbar from "../../components/ui/toolbar"
// import { Payment } from "../../types/payment"
// import { formatDate } from "../../lib/date"
// import { useNavigate } from "react-router-dom"

// // Mock data - replace with actual API call
// const mockPayments: Payment[] = [
//   {
//     id: 1,
//     user_id: 1,
//     plan_id: 1,
//     amount: 29.99,
//     currency: "USD",
//     status: "completed",
//     payment_method: "credit_card",
//     transaction_id: "txn_1234567890",
//     gateway: "stripe",
//     gateway_transaction_id: "pi_1234567890",
//     payment_date: "2024-01-15T10:30:00Z",
//     created_at: "2024-01-15T10:25:00Z",
//     updated_at: "2024-01-15T10:30:00Z",
//     user: {
//       id: 1,
//       name: "أحمد محمد",
//       email: "ahmed@example.com",
//       gender: "male",
//       birth_date: "1990-01-01",
//       phone_number: "+966501234567",
//       profile_picture: null,
//       is_active: true,
//       is_banned: false,
//       joined_at: "2024-01-01T00:00:00Z",
//       last_login_time: "2024-01-15T09:00:00Z"
//     },
//     plan: {
//       id: 1,
//       name: "Premium Plan",
//       name_ar: "الباقة المميزة",
//       description: "Premium features with unlimited access",
//       description_ar: "ميزات مميزة مع وصول غير محدود",
//       price: 29.99,
//       currency: "USD",
//       duration_months: 1,
//       features: ["Unlimited streaming", "High quality audio", "Offline downloads"],
//       is_active: true,
//       is_popular: true,
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-01T00:00:00Z"
//     }
//   },
//   {
//     id: 2,
//     user_id: 2,
//     plan_id: 2,
//     amount: 99.99,
//     currency: "USD",
//     status: "failed",
//     payment_method: "paypal",
//     transaction_id: "txn_0987654321",
//     gateway: "paypal",
//     gateway_transaction_id: "PAYID-0987654321",
//     payment_date: "2024-01-14T15:45:00Z",
//     created_at: "2024-01-14T15:40:00Z",
//     updated_at: "2024-01-14T15:45:00Z",
//     user: {
//       id: 2,
//       name: "فاطمة علي",
//       email: "fatima@example.com",
//       gender: "female",
//       birth_date: "1985-05-15",
//       phone_number: "+966507654321",
//       profile_picture: null,
//       is_active: true,
//       is_banned: false,
//       joined_at: "2024-01-10T00:00:00Z",
//       last_login_time: "2024-01-14T14:00:00Z"
//     },
//     plan: {
//       id: 2,
//       name: "Annual Premium",
//       name_ar: "الباقة المميزة السنوية",
//       description: "Annual premium subscription with discount",
//       description_ar: "اشتراك مميز سنوي مع خصم",
//       price: 99.99,
//       currency: "USD",
//       duration_months: 12,
//       features: ["All premium features", "Annual discount", "Priority support"],
//       is_active: true,
//       is_popular: false,
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-01T00:00:00Z"
//     }
//   }
// ]

// export default function PaymentsPage() {
//   const navigate = useNavigate()
//   const [payments] = useState<Payment[]>(mockPayments)
//   const [isLoading] = useState(false)

//   // Calculate stats
//   const stats = {
//     total: payments.length,
//     completed: payments.filter((p) => p.status === "completed").length,
//     pending: payments.filter((p) => p.status === "pending").length,
//     failed: payments.filter((p) => p.status === "failed").length,
//     totalRevenue: payments
//       .filter((p) => p.status === "completed")
//       .reduce((acc, payment) => acc + payment.amount, 0),
//     averageAmount: payments.length > 0 
//       ? payments.reduce((acc, payment) => acc + payment.amount, 0) / payments.length 
//       : 0,
//   }

//   // Handle view payment details
//   const handleViewPayment = (payment: Payment) => {
//     navigate(`/payments/${payment.id}`)
//   }

//   // Format currency
//   const formatCurrency = (amount: number, currency: string = "USD"): string => {
//     return new Intl.NumberFormat("ar-SA", {
//       style: "currency",
//       currency: currency,
//     }).format(amount)
//   }

//   // Get status color and text
//   const getStatusInfo = (status: Payment['status']) => {
//     const statusMap = {
//       completed: { color: "text-green-600 bg-green-50", text: "مكتمل" },
//       pending: { color: "text-yellow-600 bg-yellow-50", text: "معلق" },
//       failed: { color: "text-red-600 bg-red-50", text: "فشل" },
//       refunded: { color: "text-blue-600 bg-blue-50", text: "مسترد" },
//       cancelled: { color: "text-gray-600 bg-gray-50", text: "ملغي" },
//     }
//     return statusMap[status] || statusMap.pending
//   }

//   // Get payment method info
//   const getPaymentMethodInfo = (method: Payment['payment_method']) => {
//     const methodMap = {
//       credit_card: { icon: CreditCard, text: "بطاقة ائتمان" },
//       paypal: { icon: DollarSign, text: "PayPal" },
//       apple_pay: { icon: DollarSign, text: "Apple Pay" },
//       google_pay: { icon: DollarSign, text: "Google Pay" },
//       bank_transfer: { icon: DollarSign, text: "تحويل بنكي" },
//     }
//     return methodMap[method] || methodMap.credit_card
//   }

//   // DataTable columns
//   const columns: Column<Payment>[] = [
//     {
//       key: "id",
//       title: "رقم الدفعة",
//       width: "100px",
//       render: (value: number) => (
//         <span className="font-mono text-sm text-gray-600">#{value.toString().padStart(6, '0')}</span>
//       ),
//     },
//     {
//       key: "user",
//       title: "المستخدم",
//       render: (_, row: Payment) => (
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//             <span className="text-white text-sm font-medium">
//               {row.user?.name.charAt(0) || "؟"}
//             </span>
//           </div>
//           <div>
//             <div className="font-medium text-gray-900">{row.user?.name || "غير معروف"}</div>
//             <div className="text-sm text-gray-500">{row.user?.email}</div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "plan",
//       title: "الباقة",
//       render: (_, row: Payment) => (
//         <div>
//           <div className="font-medium text-gray-900">{row.plan?.name_ar || row.plan?.name}</div>
//           <div className="text-sm text-gray-500">
//             {row.plan?.duration_months === 1 ? "شهري" : `${row.plan?.duration_months} شهر`}
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "amount",
//       title: "المبلغ",
//       sortable: true,
//       render: (value: number, row: Payment) => (
//         <div className="font-medium text-gray-900">
//           {formatCurrency(value, row.currency)}
//         </div>
//       ),
//     },
//     {
//       key: "payment_method",
//       title: "طريقة الدفع",
//       render: (value: Payment['payment_method']) => {
//         const methodInfo = getPaymentMethodInfo(value)
//         const IconComponent = methodInfo.icon
//         return (
//           <div className="flex items-center gap-2">
//             <IconComponent className="w-4 h-4 text-gray-500" />
//             <span className="text-sm text-gray-700">{methodInfo.text}</span>
//           </div>
//         )
//       },
//     },
//     {
//       key: "status",
//       title: "الحالة",
//       render: (value: Payment['status']) => {
//         const statusInfo = getStatusInfo(value)
//         return (
//           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
//             {statusInfo.text}
//           </span>
//         )
//       },
//     },
//     {
//       key: "payment_date",
//       title: "تاريخ الدفع",
//       sortable: true,
//       render: (value: string) => formatDate(value),
//     },
//     {
//       key: "actions",
//       title: "الإجراءات",
//       width: "120px",
//       render: (_, row: Payment) => (
//         <div className="flex items-center gap-2">
//           <Button size="sm" variant="secondary" onClick={() => handleViewPayment(row)} title="عرض التفاصيل">
//             <Eye className="w-4 h-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ]

//   return (
//     <div className="space-y-4">
//       {/* Page Header */}
//       <Toolbar title="إدارة المدفوعات">
//         <Button variant="secondary" icon={Download}>
//           تصدير التقرير
//         </Button>
//       </Toolbar>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//               <CreditCard className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">إجمالي المدفوعات</p>
//               <p className="text-lg font-bold text-primary">{stats.total}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
//               <TrendingUp className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">مدفوعات مكتملة</p>
//               <p className="text-lg font-bold text-green-600">{stats.completed}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
//               <Calendar className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">مدفوعات معلقة</p>
//               <p className="text-lg font-bold text-yellow-600">{stats.pending}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
//               <Users className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">مدفوعات فاشلة</p>
//               <p className="text-lg font-bold text-red-600">{stats.failed}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//               <DollarSign className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">إجمالي الإيرادات</p>
//               <p className="text-lg font-bold text-primary">{formatCurrency(stats.totalRevenue)}</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//               <TrendingUp className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-600">متوسط المبلغ</p>
//               <p className="text-lg font-bold text-primary">{formatCurrency(stats.averageAmount)}</p>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Payments Table */}
//       <DataTable
//         data={payments}
//         columns={columns}
//         loading={isLoading}
//         searchable
//         exportable
//         emptyState={
//           <div className="text-center py-8">
//             <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">لا توجد مدفوعات</p>
//           </div>
//         }
//       />
//     </div>
//   )
// }
