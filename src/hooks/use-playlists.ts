"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { Playlist } from "../types/playlist"

export interface CreatePlaylistData {
  name: string
  description?: string
  cover_image?: File
  song_ids: number[]
  is_public: boolean
}

export interface UpdatePlaylistData extends CreatePlaylistData {
  id: number
}

// Hook for fetching all playlists
export function usePlaylists() {
  return useGetQuery<Playlist[]>({
    url: "playlists",
    key: ["playlists"],
  })
}

// Hook for creating a playlist
export function useCreatePlaylist(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "playlists",
    onSuccessCallback: () => {
      notify.success("تم إنشاء قائمة التشغيل بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء قائمة التشغيل")
    },
  })
}

// Hook for updating a playlist
export function useUpdatePlaylist(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: "playlists",
    onSuccessCallback: () => {
      notify.success("تم تحديث قائمة التشغيل بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث قائمة التشغيل")
    },
  })
}

// Hook for deleting a playlist
export function useDeletePlaylist(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: "playlists",
    onSuccessCallback: () => {
      notify.success("تم حذف قائمة التشغيل بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف قائمة التشغيل")
    },
  })
}

export type { Playlist }
