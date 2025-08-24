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

// Hook for fetching song tags
export function useSongTags(songId: number) {
  return useGetQuery<Tag[]>({
    url: `songs/${songId}/tags`,
    key: ["song-tags", songId],
  })
}

// Hook for adding a tag to a song
export function useAddSongTag(songId: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: `songs/${songId}/tags`,
    onSuccessCallback: () => {
      notify.success("تم إضافة التاغ للأغنية بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إضافة التاغ للأغنية")
    },
  })
}

// Hook for removing a tag from a song
export function useDeleteSongTag(
  songId: number | undefined,
  tagId: number | undefined,
  onSuccess?: () => void
) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `songs/${songId}/tags/${tagId}`,
    onSuccessCallback: () => {
      notify.success("تم حذف التاغ من الأغنية بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف التاغ من الأغنية")
    },
  })
}


export type { CreateTagData, UpdateTagData }
