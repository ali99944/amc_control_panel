"use client"

import { Genre } from "../types"
import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"


export interface CreateGenreData {
  name: string
  description?: string
  color?: string
  image?: File
  is_active: boolean
}

export interface UpdateGenreData extends CreateGenreData {
  id: string
}

// Hook for fetching all genres
export function useGenres() {
  return useGetQuery<Genre[]>({
    url: "genres",
    key: ["genres"],
  })
}

// Hook for creating a genre
export function useCreateGenre(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "genres",
    onSuccessCallback: () => {
      notify.success("تم إنشاء النوع الموسيقي بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء النوع الموسيقي")
    },
  })
}

// Hook for updating a genre
export function useUpdateGenre(genre_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: `genres/${genre_id}`,
    onSuccessCallback: () => {
      notify.success("تم تحديث النوع الموسيقي بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث النوع الموسيقي")
    },
  })
}

// Hook for deleting a genre
export function useDeleteGenre(genre_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `genres/${genre_id}`,
    onSuccessCallback: () => {
      notify.success("تم حذف النوع الموسيقي بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف النوع الموسيقي")
    },
  })
}
