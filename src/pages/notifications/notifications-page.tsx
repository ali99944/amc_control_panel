"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertCircle, AlertTriangle, Info, Trash2, Eye } from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { Banner } from "../../components/ui/banner"

// Define the notification interface
interface Notification {
  id: string
  message: string
  type: "success" | "error" | "warning" | "info"
  read: boolean
  createdAt: string
  icon?: React.ReactNode
}

export default function NotificationsPage() {
  // Sample notifications data (in a real app, this would come from an API)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "تمت إضافة أغنية جديدة: \"أغنية الصيف\" بواسطة الفنان \"محمد علي\"",
      type: "success",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    },
    {
      id: "2",
      message: "قام المستخدم \"أحمد محمد\" بالتسجيل في التطبيق",
      type: "info",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      id: "3",
      message: "تم إنشاء تقرير الإحصائيات الشهري",
      type: "info",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: "4",
      message: "فشل تحميل الأغنية \"أغنية الشتاء\" بسبب خطأ في الملف",
      type: "error",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
    {
      id: "5",
      message: "تم تحديث معلومات الفنان \"سارة أحمد\"",
      type: "success",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    },
    {
      id: "6",
      message: "تحذير: وصل عدد المستخدمين النشطين إلى الحد الأقصى للخطة الحالية",
      type: "warning",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    },
    {
      id: "7",
      message: "تم إنشاء قائمة تشغيل جديدة: \"أفضل أغاني 2023\"",
      type: "success",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    },
    {
      id: "8",
      message: "تم تسجيل 100 مستخدم جديد هذا الأسبوع",
      type: "info",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(), // 6 days ago
    },
    {
      id: "9",
      message: "خطأ في النظام: فشل في تحديث قاعدة البيانات",
      type: "error",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    },
    {
      id: "10",
      message: "تم تجاوز حد استخدام API لهذا الشهر",
      type: "warning",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), // 8 days ago
    },
  ])

  // Calculate stats
  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    success: notifications.filter((n) => n.type === "success").length,
    error: notifications.filter((n) => n.type === "error").length,
    warning: notifications.filter((n) => n.type === "warning").length,
    info: notifications.filter((n) => n.type === "info").length,
  }

  // Handle marking notification as read
  const handleMarkAsRead = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    )
  }

  // Handle deleting notification
  const handleDeleteNotification = (notification: Notification) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
  }

  // Handle marking all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // Handle deleting all notifications
  const handleDeleteAllNotifications = () => {
    setNotifications([])
  }

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "منذ أقل من دقيقة"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `منذ ${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"}`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `منذ ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `منذ ${days} ${days === 1 ? "يوم" : "أيام"}`
    }
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  // Get background color based on notification type
  const getNotificationBgColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-100"
      case "error":
        return "bg-red-100"
      case "warning":
        return "bg-amber-100"
      case "info":
        return "bg-blue-100"
      default:
        return "bg-gray-100"
    }
  }

  // DataTable columns
  const columns: Column<Notification>[] = [
    {
      key: "type",
      title: "النوع",
      width: "80px",
      render: (_, row: Notification) => (
        <div className={`w-10 h-10 ${getNotificationBgColor(row.type)} rounded-full flex items-center justify-center`}>
          {getNotificationIcon(row.type)}
        </div>
      ),
    },
    {
      key: "message",
      title: "الرسالة",
      sortable: true,
      render: (value: string, row: Notification) => (
        <div>
          <div className={`font-medium ${row.read ? "text-gray-600" : "text-gray-900"}`}>{value}</div>
          <div className="text-sm text-gray-500 mt-1">{formatDate(row.createdAt)}</div>
        </div>
      ),
    },
    {
      key: "read",
      title: "الحالة",
      width: "120px",
      sortable: true,
      render: (value: boolean) => (
        <div>
          {value ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              مقروءة
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              جديدة
            </span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      title: "التاريخ",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString("ar-SA"),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "120px",
      render: (_, row: Notification) => (
        <div className="flex items-center gap-2">
          {!row.read && (
            <Button size="sm" variant="secondary" onClick={() => handleMarkAsRead(row)} title="تحديد كمقروءة">
              <Eye className="w-4 h-4" />
            </Button>
          )}
          <Button size="sm" variant="danger" onClick={() => handleDeleteNotification(row)} title="حذف">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
        
        <Banner 
            // type="info"
            variant="warning"
            title="صفحة تجريبية"
            message="صفحة الاشعارات قيد التطوير حاليا"
        />
        
      {/* Page Header */}
      <Toolbar title="إدارة الإشعارات">
        <div className="flex gap-2">
          <Button variant="primary-inverted" onClick={handleMarkAllAsRead} disabled={stats.unread === 0}>
            تحديد الكل كمقروء
          </Button>
          <Button variant="danger" onClick={handleDeleteAllNotifications} disabled={notifications.length === 0}>
            حذف الكل
          </Button>
        </div>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الإشعارات</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">غير مقروءة</p>
              <p className="text-lg font-bold text-primary">{stats.unread}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">نجاح</p>
              <p className="text-lg font-bold text-primary">{stats.success}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">أخطاء</p>
              <p className="text-lg font-bold text-primary">{stats.error}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">تحذيرات</p>
              <p className="text-lg font-bold text-primary">{stats.warning}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">معلومات</p>
              <p className="text-lg font-bold text-primary">{stats.info}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications Table */}
      <DataTable
        data={notifications}
        columns={columns}
        loading={false}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد إشعارات</p>
          </div>
        }
      />
    </div>
  )
}