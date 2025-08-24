// "use client"

// import { useGetQuery, useMutationAction } from "./queries-actions"
// import { useNotifications } from "./use-notification"
// import type { PodcastEpisode, CreatePodcastEpisodeData, UpdatePodcastEpisodeData } from "../types/podcast"

// // Mock data for demonstration
// const mockPodcastEpisodes: PodcastEpisode[] = [
//   {
//     id: "ep1",
//     podcast_show_id: "pod1",
//     title: "مستقبل الذكاء الاصطناعي",
//     description: "نقاش حول أحدث التطورات في الذكاء الاصطناعي وتأثيرها.",
//     audio_url: "/placeholder.svg", // Placeholder for audio file
//     duration: 3600, // 60 minutes
//     release_date: "2024-07-15T10:00:00Z",
//     episode_number: 1,
//     plays_count: 15000,
//     created_at: "2024-07-10T00:00:00Z",
//     updated_at: "2024-07-15T10:00:00Z",
//   },
//   {
//     id: "ep2",
//     podcast_show_id: "pod1",
//     title: "الأمن السيبراني للمبتدئين",
//     description: "دليل شامل للمبتدئين في الأمن السيبراني.",
//     audio_url: "/placeholder.svg",
//     duration: 2800,
//     release_date: "2024-07-08T10:00:00Z",
//     episode_number: 2,
//     plays_count: 12000,
//     created_at: "2024-07-05T00:00:00Z",
//     updated_at: "2024-07-08T10:00:00Z",
//   },
//   {
//     id: "ep3",
//     podcast_show_id: "pod2",
//     title: "صعود وسقوط الإمبراطوريات",
//     description: "تحليل لأسباب ازدهار وانهيار الإمبراطوريات الكبرى.",
//     audio_url: "/placeholder.svg",
//     duration: 4200,
//     release_date: "2024-07-10T12:00:00Z",
//     episode_number: 1,
//     plays_count: 8000,
//     created_at: "2024-07-07T00:00:00Z",
//     updated_at: "2024-07-10T12:00:00Z",
//   },
// ]

// // Hook for fetching episodes for a specific podcast show
// export function usePodcastEpisodes(podcastShowId: string) {
//   const { notify } = useNotifications()
//   const { data, isLoading, error, refetch } = useGetQuery<PodcastEpisode[]>({
//     url: `podcasts/${podcastShowId}/episodes`, // Mock URL
//     key: ["podcast-episodes", podcastShowId],
//     queryFn: async () => {
//       await new Promise((resolve) => setTimeout(resolve, 500))
//       return mockPodcastEpisodes.filter((ep) => ep.podcast_show_id === podcastShowId)
//     },
//   })

//   return {
//     episodes: data || [],
//     isLoading,
//     error,
//     refetch,
//   }
// }

// // Hook for creating a podcast episode
// export function useCreatePodcastEpisode(onSuccess?: () => void) {
//   const { notify } = useNotifications()
//   const { mutate, isPending } = useMutationAction({
//     method: "post",
//     url: "podcast-episodes", // Mock URL
//     onSuccessCallback: () => {
//       notify.success("تم إنشاء الحلقة بنجاح")
//       onSuccess?.()
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء إنشاء الحلقة")
//     },
//     mutationFn: async (data: CreatePodcastEpisodeData) => {
//       await new Promise((resolve) => setTimeout(resolve, 500))
//       const newEpisode: PodcastEpisode = {
//         ...data,
//         id: `ep${mockPodcastEpisodes.length + 1}`,
//         plays_count: 0,
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//       }
//       mockPodcastEpisodes.push(newEpisode)
//       return newEpisode
//     },
//   })
//   return { mutate, isPending }
// }

// // Hook for updating a podcast episode
// export function useUpdatePodcastEpisode(onSuccess?: () => void) {
//   const { notify } = useNotifications()
//   const { mutate, isPending } = useMutationAction({
//     method: "put",
//     url: "podcast-episodes", // Mock URL
//     onSuccessCallback: () => {
//       notify.success("تم تحديث الحلقة بنجاح")
//       onSuccess?.()
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء تحديث الحلقة")
//     },
//     mutationFn: async (data: UpdatePodcastEpisodeData) => {
//       await new Promise((resolve) => setTimeout(resolve, 500))
//       const index = mockPodcastEpisodes.findIndex((ep) => ep.id === data.id)
//       if (index === -1) throw new Error("Podcast episode not found")
//       mockPodcastEpisodes[index] = {
//         ...mockPodcastEpisodes[index],
//         ...data,
//         updated_at: new Date().toISOString(),
//       }
//       return mockPodcastEpisodes[index]
//     },
//   })
//   return { mutate, isPending }
// }

// // Hook for deleting a podcast episode
// export function useDeletePodcastEpisode(onSuccess?: () => void) {
//   const { notify } = useNotifications()
//   const { mutate, isPending } = useMutationAction({
//     method: "delete",
//     url: "podcast-episodes", // Mock URL
//     onSuccessCallback: () => {
//       notify.success("تم حذف الحلقة بنجاح")
//       onSuccess?.()
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء حذف الحلقة")
//     },
//     mutationFn: async (data: { id: string }) => {
//       await new Promise((resolve) => setTimeout(resolve, 500))
//       const initialLength = mockPodcastEpisodes.length
//       mockPodcastEpisodes.splice(
//         mockPodcastEpisodes.findIndex((ep) => ep.id === data.id),
//         1,
//       )
//       if (mockPodcastEpisodes.length === initialLength) throw new Error("Podcast episode not found")
//       return { success: true }
//     },
//   })
//   return { mutate, isPending }
// }
