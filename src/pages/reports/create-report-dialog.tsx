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
      title: data.title,
      description: data.description,
      type: data.type,
      parameters: {
        date_range: data.date_range,
        filters: data.filters,
        metrics: data.metrics,
        format: data.format,
        include_charts: data.include_charts,
      },
    })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إنشاء تقرير جديد" size="xl">
      <ReportForm onSubmit={handleSubmit} isLoading={isPending} onCancel={onClose} />
    </Dialog>
  )
}
