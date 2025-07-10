"use client"

import { useState } from "react"
import { Plus, FileText, Download, Trash2, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useReports, useDownloadReport, Report } from "../../hooks/use-reports"
import CreateReportDialog from "./create-report-dialog"
import DeleteReportDialog from "./delete-report-dialog"


export default function ReportsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Fetch reports data
  const { data: reports = [], isLoading, refetch } = useReports()
  const { mutate: downloadReport, isPending: isDownloading } = useDownloadReport()

  // Filter reports by status
  const filteredReports = reports.filter(report => 
    statusFilter === 'all' || report.status === statusFilter
  )

  // Calculate stats
  const stats = {
    total: reports.length,
    completed: reports.filter((r) => r.status === 'completed').length,
    pending: reports.filter((r) => r.status === 'pending').length,
    processing: reports.filter((r) => r.status === 'processing').length,
    failed: reports.filter((r) => r.status === 'failed').length,
  }

  // Handle delete report
  const handleDeleteReport = (report: Report) => {
    setSelectedReport(report)
    setIsDeleteDialogOpen(true)
  }

  // Handle download report
  const handleDownloadReport = (report: Report) => {
    if (report.status === 'completed' && report.file_url) {
      downloadReport({ id: report.id })
    }
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // Format file size
  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return "غير محدد"
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Get status info
  const getStatusInfo = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'مكتمل' }
      case 'processing':
        return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'قيد المعالجة' }
      case 'pending':
        return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'في الانتظار' }
      case 'failed':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'فشل' }
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100', label: 'غير محدد' }
    }
  }

  // Get report type label
  const getReportTypeLabel = (type: Report['type']) => {
    switch (type) {
      case 'users': return 'المستخدمين'
      case 'content': return 'المحتوى'
      case 'engagement': return 'التفاعل'
      case 'revenue': return 'الإيرادات'
      case 'custom': return 'مخصص'
      default: return type
    }
  }

  // DataTable columns
  const columns: Column<Report>[] = [
    {
      key: "title",
      title: "التقرير",
      sortable: true,
      render: (value: string, row: Report) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {getReportTypeLabel(row.type)}
            </span>
            <span>{row.parameters.format.toUpperCase()}</span>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      title: "الوصف",
      render: (value: string | null) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 line-clamp-2">{value || "لا يوجد وصف"}</p>
        </div>
      ),
    },
    {
      key: "status",
      title: "الحالة",
      width: "120px",
      render: (value: Report['status']) => {
        const statusInfo = getStatusInfo(value)
        const StatusIcon = statusInfo.icon
        return (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusInfo.bg}`}>
              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
            </div>
            <span className={`text-sm ${statusInfo.color}`}>{statusInfo.label}</span>
          </div>
        )
      },
    },
    {
      key: "created_by",
      title: "المنشئ",
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: "file_size",
      title: "حجم الملف",
      render: (value: number | null) => (
        <div className="text-sm text-gray-600">{formatFileSize(value)}</div>
      ),
    },
    {
      key: "created_at",
      title: "تاريخ الإنشاء",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString("ar-SA")}
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "120px",
      render: (_, row: Report) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleDownloadReport(row)}
            disabled={row.status !== 'completed' || !row.file_url || isDownloading}
            title="تحميل التقرير"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteReport(row)}
            title="حذف التقرير"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'processing', label: 'قيد المعالجة' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'failed', label: 'فشل' },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة التقارير">
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
          إنشاء تقرير جديد
        </Button>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي التقارير</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">مكتملة</p>
              <p className="text-lg font-bold text-primary">{stats.completed}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">قيد المعالجة</p>
              <p className="text-lg font-bold text-primary">{stats.processing}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">في الانتظار</p>
              <p className="text-lg font-bold text-primary">{stats.pending}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">فشلت</p>
              <p className="text-lg font-bold text-primary">{stats.failed}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={statusFilter === option.value ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatusFilter(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
      </Card>

      {/* Reports Table */}
      <DataTable
        data={filteredReports}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد تقارير</p>
            <div className="flex items-center justify-center">
              <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              إنشاء تقرير جديد
            </Button>
            </div>
          </div>
        }
      />

      {/* Dialogs */}
      <CreateReportDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <DeleteReportDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        report={selectedReport}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
