"use client"

import User from "../types/user"
import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"


// Hook for fetching all users
export function useUsers() {
  return useGetQuery<User[]>({
    url: "users",
    key: ["users"],
  })
}

// Hook for deleting a user
export function useDeleteUser(user_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `users/${user_id}`,
    onSuccessCallback: () => {
      notify.success("تم حذف المستخدم بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف المستخدم")
    },
  })
}

interface BanUserResponse {
  is_banned: boolean
}

// Hook for banning/unbanning a user
export function useBanUser(id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: `users/${id}/ban`,
    onSuccessCallback: (data: BanUserResponse) => {
      const action = data.is_banned ? "حظر" : "إلغاء حظر"
      notify.success(`تم ${action} المستخدم بنجاح`)
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث حالة المستخدم")
    },
  })
}
