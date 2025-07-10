"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { Tag, CreateTagData, UpdateTagData } from "../types/tag"

// Hook for fetching all tags
export function useTags() {
  return useGetQuery<Tag[]>({
    url: "tags",
    key: ["tags"],
  })
}

// Hook for creating a tag
export function useCreateTag(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "tags",
    onSuccessCallback: () => {
      notify.success("تم إنشاء التاغ بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء التاغ")
    },
  })
}

// Hook for updating a tag
export function useUpdateTag(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: "tags",
    onSuccessCallback: () => {
      notify.success("تم تحديث التاغ بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث التاغ")
    },
  })
}

// Hook for deleting a tag
export function useDeleteTag(tag_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `tags/${tag_id}`,
    onSuccessCallback: () => {
      notify.success("تم حذف التاغ بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف التاغ")
    },
  })
}

export type { CreateTagData, UpdateTagData }
