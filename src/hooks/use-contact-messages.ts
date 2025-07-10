"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { ContactMessage } from "../types/contact-message"

// Hook for fetching all contact messages
export function useContactMessages() {
  return useGetQuery<ContactMessage[]>({
    url: "contact-messages",
    key: ["contact-messages"],
  })
}

// Hook for deleting a contact message
export function useDeleteContactMessage(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: "contact-messages",
    onSuccessCallback: () => {
      notify.success("تم حذف الرسالة بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف الرسالة")
    },
  })
}

export type { ContactMessage }
