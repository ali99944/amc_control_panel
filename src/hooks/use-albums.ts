"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { Album, CreateAlbumData, UpdateAlbumData, AlbumFilters } from "../types/album"

// Hook for fetching all albums
export function useAlbums(filters?: AlbumFilters) {
  const queryParams = new URLSearchParams()
  
  if (filters?.search) queryParams.append('search', filters.search)
  if (filters?.artist_id) queryParams.append('artist_id', filters.artist_id.toString())
  if (filters?.album_type) queryParams.append('album_type', filters.album_type)
  if (filters?.is_active !== undefined) queryParams.append('is_active', filters.is_active.toString())
  if (filters?.is_featured !== undefined) queryParams.append('is_featured', filters.is_featured.toString())
  if (filters?.release_year) queryParams.append('release_year', filters.release_year.toString())

  const url = `albums${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

  return useGetQuery<Album[]>({
    url,
    key: ["albums", filters],
  })
}

// Hook for fetching single album
export function useAlbum(id: number) {
  return useGetQuery<Album>({
    url: `albums/${id}`,
    key: ["album", id],
    options: {
        enabled: !!id,
    }
  })
}

// Hook for creating an album
export function useCreateAlbum(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "post",
    url: "albums",
    onSuccessCallback: () => {
      notify.success("تم إنشاء الألبوم بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إنشاء الألبوم")
    },
  })
}

// Hook for updating an album
export function useUpdateAlbum(album_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "put",
    url: `albums/${album_id}`,
    onSuccessCallback: () => {
      notify.success("تم تحديث الألبوم بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث الألبوم")
    },
  })
}

// Hook for deleting an album
export function useDeleteAlbum(album_id: number | undefined, onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "delete",
    url: `albums/${album_id}`,
    onSuccessCallback: () => {
      notify.success("تم حذف الألبوم بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء حذف الألبوم")
    },
  })
}

// Hook for toggling album status
export function useToggleAlbumStatus(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "patch",
    // url: `albums/${data.id}/toggle-status`,
    url: `albums/toggle-status`,
    onSuccessCallback: () => {
      notify.success("تم تحديث حالة الألبوم بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث حالة الألبوم")
    },
  })
}

// Hook for featuring/unfeaturing album
export function useToggleAlbumFeatured(onSuccess?: () => void) {
  const { notify } = useNotifications()

  return useMutationAction({
    method: "patch",
    url: `albums/toggle-featured`,
    // url: `albums/${data.id}/toggle-featured`,
    onSuccessCallback: () => {
      notify.success("تم تحديث حالة الإبراز بنجاح")
      onSuccess?.()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء تحديث حالة الإبراز")
    },
  })
}

export type { Album, CreateAlbumData, UpdateAlbumData, AlbumFilters }
