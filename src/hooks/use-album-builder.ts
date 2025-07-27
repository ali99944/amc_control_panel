"use client"

import { useState, useEffect, useMemo } from "react"
import { useGetQuery, useMutationAction } from "./queries-actions"
import { useNotifications } from "./use-notification"
import type { AlbumBuilderSong, AlbumBuilderState } from "../types/album-builder"

export function useAlbumBuilder(albumId: number) {
  const { notify } = useNotifications()
  
  const [state, setState] = useState<AlbumBuilderState>({
    selectedSongs: [],
    availableSongs: [],
    searchQuery: "",
    filterArtist: null,
    filterGenre: null,
    isLoading: false,
  })

  // Fetch album songs
  const { data: albumSongs = [], refetch: refetchAlbumSongs } = useGetQuery<AlbumBuilderSong[]>({
    url: `albums/${albumId}/songs`,
    key: ["album-songs", albumId],
    options: {
        enabled: !!albumId
    }
  })

  // Fetch available songs
  const { data: availableSongs = [], refetch: refetchAvailableSongs } = useGetQuery<AlbumBuilderSong[]>({
    url: `songs`,
    key: ["available-songs", albumId, state.searchQuery, state.filterArtist, state.filterGenre],
    options: {
      enabled: !!albumId,
    },
  })

  // Add songs to album
  const { mutate: addSongsToAlbum, isPending: isAdding } = useMutationAction({
    method: "post",
    url: `albums/${albumId}/songs`,
    onSuccessCallback: () => {
      notify.success("تم إضافة الأغاني للألبوم بنجاح")
      refetchAlbumSongs()
      refetchAvailableSongs()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إضافة الأغاني")
    },
  })

  // Remove songs from album
  const { mutate: removeSongsFromAlbum, isPending: isRemoving } = useMutationAction({
    method: "delete",
    url: `albums/${albumId}/songs`,
    onSuccessCallback: () => {
      notify.success("تم إزالة الأغاني من الألبوم بنجاح")
      refetchAlbumSongs()
      refetchAvailableSongs()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إزالة الأغاني")
    },
  })

  // Reorder album tracks
  const { mutate: reorderTracks, isPending: isReordering } = useMutationAction({
    method: "put",
    url: `albums/${albumId}/reorder-tracks`,
    onSuccessCallback: () => {
      notify.success("تم إعادة ترتيب المسارات بنجاح")
      refetchAlbumSongs()
    },
    onErrorCallback: (error) => {
      notify.error(error.message || "حدث خطأ أثناء إعادة ترتيب المسارات")
    },
  })

  // Memoize songs data to prevent unnecessary re-renders
  const songsData = useMemo(() => ({
    selectedSongs: albumSongs,
    availableSongs: availableSongs,
  }), [albumSongs, availableSongs])

//   useEffect(() => {
//     setState(prev => ({
//       ...prev,
//       ...songsData
//     }))
//   }, [songsData])

  const addSongs = (songIds: number[]) => {
    addSongsToAlbum({ song_ids: songIds })
  }

  const removeSongs = (songIds: number[]) => {
    removeSongsFromAlbum({ song_ids: songIds })
  }

  const reorderAlbumTracks = (tracks: { song_id: number; track_number: number }[]) => {
    reorderTracks({ tracks })
  }

  const updateSearch = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }))
  }

  const updateFilters = (artistId: number | null, genreId: number | null) => {
    setState(prev => ({ ...prev, filterArtist: artistId, filterGenre: genreId }))
  }

  return {
    state,
    addSongs,
    removeSongs,
    reorderAlbumTracks,
    updateSearch,
    updateFilters,
    isAdding,
    isRemoving,
    isReordering,
    refetch: () => {
      refetchAlbumSongs()
      refetchAvailableSongs()
    },
  }
}
