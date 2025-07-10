"use client"

import { PrivacyPolicy, UpdatePrivacyPolicyData } from "../types/privacy_policy"
import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"

// Hook for fetching privacy policy
export function usePrivacyPolicy() {
  return useGetQuery<PrivacyPolicy>({
    url: "privacy-policy",
    key: ["privacy-policy"],
  })
}

// Hook for updating privacy policy
export function useUpdatePrivacyPolicy(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: "privacy-policy",
    onSuccessCallback: () => {
      notify.success("تم تحديث سياسة الخصوصية بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث سياسة الخصوصية")
    },
  })
}

export type { PrivacyPolicy, UpdatePrivacyPolicyData }
