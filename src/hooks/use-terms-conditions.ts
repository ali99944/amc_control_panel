"use client"

import { TermsConditions, UpdateTermsConditionsData } from "../types/terms_conditions"
import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"

// Hook for fetching terms and conditions
export function useTermsConditions() {
  return useGetQuery<TermsConditions>({
    url: "terms-conditions",
    key: ["terms-conditions"],
  })
}

// Hook for updating terms and conditions
export function useUpdateTermsConditions(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: "terms-conditions",
    onSuccessCallback: () => {
      notify.success("تم تحديث الشروط والأحكام بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث الشروط والأحكام")
    },
  })
}

export type { TermsConditions, UpdateTermsConditionsData }
