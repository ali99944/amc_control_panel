"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { Report, CreateReportData } from "../types/reports"

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
      notify.success("تم إنشاء التقرير بنجاح وسيتم معالجته قريباً")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء التقرير")
    },
  })
}

// Hook for deleting a report
export function useDeleteReport(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: "reports",
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
      link.href = data.download_url
      link.download = data.filename
      link.click()
      notify.success("تم تحميل التقرير بنجاح")
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحميل التقرير")
    },
  })
}

export type { Report, CreateReportData }
