"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { Report, CreateReportData } from "../types/reports"
import { getStorageFile } from "../lib/storage"

// Hook for fetching all reports
export function useReports() {
  return useGetQuery<Report[]>({
    url: "reports",
    key: ["reports"],
  })
}

// Hook for creating a report
export function useCreateReport(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "reports",
    onSuccessCallback: () => {
      notify.success("تم إنشاء التقرير بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء التقرير")
    },
  })
}

// Hook for deleting a report
export function useDeleteReport(report_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `reports/${report_id}`,
    onSuccessCallback: () => {
      notify.success("تم حذف التقرير بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف التقرير")
    },
  })
}

// Hook for downloading a report
export function useDownloadReport() {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "reports/download",
    onSuccessCallback: (data: Report) => {
      // Create download link
      const link = document.createElement('a')
      link.href = getStorageFile(data.generated_report_url) ?? ''
      link.download = data.report_name
      link.click()
      notify.success("تم تحميل التقرير بنجاح")
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحميل التقرير")
    },
  })
}

export type { Report, CreateReportData }
