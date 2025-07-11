"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { Song, CreateSongData, UpdateSongData, SongVersion } from "../types/song"

// Hook for fetching all songs
export function useSongs() {
  return useGetQuery<Song[]>({
    url: "songs",
    key: ["songs"],
  })
}

// Hook for fetching single song
export function useSong(id: number) {
  return useGetQuery<Song>({
    url: `songs/${id}`,
    key: ["songs", id.toString()],
  })
}

// Hook for creating a song
export function useCreateSong(onSuccess?: (song: Song) => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "songs",
    onSuccessCallback: (data: Song) => {
      notify.success("تم إنشاء الأغنية بنجاح")
      onSuccess?.(data)
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء الأغنية")
    },
  })
}

// Hook for updating a song
export function useUpdateSong(song_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: `songs/${song_id}`,
    onSuccessCallback: () => {
      notify.success("تم تحديث الأغنية بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث الأغنية")
    },
  })
}

// Hook for deleting a song
export function useDeleteSong(song_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `songs/${song_id}`,
    onSuccessCallback: () => {
      notify.success("تم حذف الأغنية بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف الأغنية")
    },
  })
}

// Hook for generating song version
export function useGenerateSongVersion(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "songs/variants/generate",
    onSuccessCallback: () => {
      notify.success("تم إنشاء نسخة جديدة من الأغنية بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء النسخة")
    },
  })
}

// Hook for deleting song version
export function useDeleteSongVersion(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: "songs/variants",
    onSuccessCallback: () => {
      notify.success("تم حذف النسخة بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف النسخة")
    },
  })
}

export type { CreateSongData, UpdateSongData, SongVersion }
