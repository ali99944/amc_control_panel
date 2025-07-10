"use client"
import { useState } from "react"
import { Mail, Eye, Trash2, User, Calendar, MessageSquare, Clock } from "lucide-react"
import ViewMessageDialog from "./view-message-dialog"
import DeleteMessageDialog from "./delete-message-dialog"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useContactMessages } from "../../hooks/use-contact-messages"
import { formatDate, formatDateTime } from "../../lib/date"
import { ContactMessage } from "../../types/contact-message"

export default function ContactMessagesPage() {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  // Fetch contact messages data
  const { data: messages = [], isLoading, refetch } = useContactMessages()

  // Calculate stats
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const stats = {
    total: messages.length,
    today: messages.filter((msg) => new Date(msg.created_at) >= today).length,
    thisWeek: messages.filter((msg) => new Date(msg.created_at) >= thisWeek).length,
    thisMonth: messages.filter((msg) => new Date(msg.created_at) >= thisMonth).length,
  }

  // Handle view message
  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsViewDialogOpen(true)
  }

  // Handle delete message
  const handleDeleteMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsDeleteDialogOpen(true)
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // Get message preview (first 100 characters)
  const getMessagePreview = (message: string): string => {
    return message.length > 100 ? message.substring(0, 100) + "..." : message
  }

  // DataTable columns
  const columns: Column<ContactMessage>[] = [
    {
      key: "name",
      title: "المرسل",
      sortable: true,
      render: (value: string, row: ContactMessage) => (
        <div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{value}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">{row.email}</div>
        </div>
      ),
    },
    {
      key: "subject",
      title: "الموضوع",
      sortable: true,
      render: (value: string, row: ContactMessage) => (
        <div>
          <div className="font-medium text-gray-900 line-clamp-1">{value}</div>
          <div className="text-sm text-gray-500 line-clamp-2 mt-1">{getMessagePreview(row.message)}</div>
        </div>
      ),
    },
    {
      key: "created_at",
      title: "تاريخ الإرسال",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">{formatDate(value)}</div>
            <div className="text-xs text-gray-500">{formatDateTime(value).split(" ")[1]}</div>
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "140px",
      render: (_, row: ContactMessage) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleViewMessage(row)} title="عرض الرسالة">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteMessage(row)} title="حذف">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="رسائل التواصل" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الرسائل</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">اليوم</p>
              <p className="text-lg font-bold text-primary">{stats.today}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">هذا الأسبوع</p>
              <p className="text-lg font-bold text-primary">{stats.thisWeek}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">هذا الشهر</p>
              <p className="text-lg font-bold text-primary">{stats.thisMonth}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Messages Table */}
      <DataTable
        data={messages}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        // defaultSort={{ key: "created_at", direction: "desc" }}
        emptyState={
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد رسائل تواصل</p>
            <p className="text-sm text-gray-400 mt-2">ستظهر رسائل المستخدمين هنا عند إرسالها</p>
          </div>
        }
      />

      {/* Dialogs */}
      <ViewMessageDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        message={selectedMessage}
      />

      <DeleteMessageDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        message={selectedMessage}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
