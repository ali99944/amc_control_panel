"use client"

import ReportForm from "./report-form"
import { useCreateReport } from "../../hooks/use-reports"
import type { ReportFormData } from "./report-form-schema"
import Dialog from "../../components/ui/dialog"

interface CreateReportDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CreateReportDialog({ isOpen, onClose, onSuccess }: CreateReportDialogProps) {
  const { mutate: createReport, isPending } = useCreateReport(() => {
    onClose()
    onSuccess?.()
  })

  const handleSubmit = (data: ReportFormData) => {
    createReport({
      report_name: data.title,
      description: data.description,
      report_type: data.type,
      start_date: data.date_range.start_date,
      end_date: data.date_range.end_date,
    })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إنشاء تقرير جديد" size="xl">
      <ReportForm onSubmit={handleSubmit} isLoading={isPending} onCancel={onClose} />
    </Dialog>
  )
}
