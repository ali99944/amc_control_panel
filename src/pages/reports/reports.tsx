"use client"
import { useState } from "react"
import { Plus, FileText, Download, Trash2, Eye, FileIcon } from "lucide-react"
import DataTable, { type Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Toolbar from "../../components/ui/toolbar"
import { useReports, useDownloadReport, type Report } from "../../hooks/use-reports"
import CreateReportDialog from "./create-report-dialog"
import DeleteReportDialog from "./delete-report-dialog"
import { formatDate } from "../../lib/date"
import PDFViewerModal from "./pdf-viewer-modal"
import Card from "../../components/ui/card"

export default function ReportsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  // Fetch reports data
  const { data: reports = [], isLoading, refetch } = useReports()
  const { mutate: downloadReport, isPending: isDownloading } = useDownloadReport()

  // Handle view report
  const handleViewReport = (report: Report) => {
    if (report.generated_report_url) {
      setSelectedReport(report)
      setIsPDFViewerOpen(true)
    }
  }

  // Handle delete report
  const handleDeleteReport = (report: Report) => {
    setSelectedReport(report)
    setIsDeleteDialogOpen(true)
  }

  // Handle download report
  const handleDownloadReport = (report: Report) => {
    downloadReport({ id: report.id })
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // Format file size
  // const formatFileSize = (bytes: number | null): string => {
  //   if (!bytes) return "غير محدد"
  //   if (bytes == 0) return "0 Bytes"
  //   const k = 1024
  //   const sizes = ["Bytes", "KB", "MB", "GB"]
  //   const i = Math.floor(Math.log(bytes) / Math.log(k))
  //   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  // }

  // Get report type label
  const getReportTypeLabel = (type: Report["report_type"]) => {
    switch (type) {
      case "user_report":
        return "المستخدمين"
      case "content_report":
        return "المحتوى"
      case "engagement_report":
        return "التفاعل"
      default:
        return type
    }
  }


  // DataTable columns
  const columns: Column<Report>[] = [
    {
      key: "report_name",
      title: "التقرير",
      sortable: true,
      render: (value: string, row: Report) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{getReportTypeLabel(row.report_type)}</span>
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
    // {
    //   key: "generated_report_size",
    //   title: "حجم الملف",
    //   render: (value: number | null) => <div className="text-sm text-gray-600">{formatFileSize(value)}</div>,
    // },
    {
      key: "created_at",
      title: "تاريخ الإنشاء",
      sortable: true,
      render: (value: string) => <div className="text-sm text-gray-600">{formatDate(value)}</div>,
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "160px",
      render: (_, row: Report) => (
        <div className="flex items-center gap-2">
          {row.generated_report_url && (
            <Button size="sm" variant="secondary" onClick={() => handleViewReport(row)} title="عرض التقرير">
              <Eye className="w-4 h-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleDownloadReport(row)}
            disabled={isDownloading || !row.generated_report_url}
            title="تحميل التقرير"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteReport(row)} title="حذف التقرير">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة التقارير">
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
          إنشاء تقرير جديد
        </Button>
      </Toolbar>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <FileIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي التقارير</p>
                <p className="text-2xl font-bold text-primary">
                  {reports.length}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <FileIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">تقارير مستخدمين</p>
                <p className="text-2xl font-bold text-primary">
                  {
                    reports.filter(report => report.report_type == 'user_report').length
                  }
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <FileIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">تقارير التفاعل</p>
                <p className="text-2xl font-bold text-primary">
                {
                    reports.filter(report => report.report_type == 'engagement_report').length
                  }
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <FileIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">تقارير المحتوي</p>
                <p className="text-2xl font-bold text-primary">
                {
                    reports.filter(report => report.report_type == 'content_report').length
                  }
                </p>
              </div>
            </div>
          </Card>
          </div>

      {/* Reports Table */}
      <DataTable
        data={reports}
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

      {/* PDF Viewer Modal */}
      <PDFViewerModal isOpen={isPDFViewerOpen} onClose={() => setIsPDFViewerOpen(false)} report={selectedReport} />
    </div>
  )
}
