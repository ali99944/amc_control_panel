"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteReport, type Report } from "../../hooks/use-reports"

interface DeleteReportDialogProps {
  isOpen: boolean
  onClose: () => void
  report: Report | null
  onSuccess?: () => void
}

export default function DeleteReportDialog({ isOpen, onClose, report, onSuccess }: DeleteReportDialogProps) {
  const { mutate: deleteReport, isPending } = useDeleteReport(report?.id, () => {
    onClose()
    onSuccess?.()
  })

  const handleConfirm = () => {
    if (!report) return
    deleteReport({})
  }

  if (!report) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف التقرير"
      message={`هل أنت متأكد من حذف التقرير "${report.report_name}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="حذف التقرير"
      loading={isPending}
    />
  )
}
