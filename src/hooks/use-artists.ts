"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { Artist } from "../types/artist"

export interface CreateArtistData {
  name: string
  bio?: string
  image?: File
  is_featured: boolean
  is_active: boolean
}

export interface UpdateArtistData extends CreateArtistData {
  id: number
}

// Hook for fetching all artists
export function useArtists() {
  return useGetQuery<Artist[]>({
    url: "artists",
    key: ["artists"],
  })
}

// Hook for creating an artist
export function useCreateArtist(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "artists",
    onSuccessCallback: () => {
      notify.success("تم إنشاء الفنان بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء الفنان")
    },
  })
}

// Hook for updating an artist
export function useUpdateArtist(artist_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: `artists/${artist_id}`,
    onSuccessCallback: () => {
      notify.success("تم تحديث الفنان بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث الفنان")
    },
  })
}

// Hook for deleting an artist
export function useDeleteArtist(artist_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `artists/${artist_id}`,
    onSuccessCallback: () => {
      notify.success("تم حذف الفنان بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف الفنان")
    },
  })
}