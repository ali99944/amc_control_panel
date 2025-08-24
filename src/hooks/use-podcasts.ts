// "use client"

// import { useGetQuery, useMutationAction } from "./queries-actions"
// import { useNotifications } from "./use-notification"
// import type { PodcastShow, CreatePodcastShowData, UpdatePodcastShowData, PodcastCategory, PodcastHost } from "../types/podcast"

// // Mock data for demonstration
// const mockPodcastShows: PodcastShow[] = [
//   {
//     id: "pod1",
//     title: "بودكاست التقنية اليوم",
//     description: "أحدث الأخبار والتحليلات في عالم التقنية.",
//     cover_image_url: "/placeholder.svg?height=200&width=200",
//     language: "العربية",
//     category_id: "tech",
//     host_id: "host1",
//     total_episodes: 50,
//     last_episode_date: "2024-07-15T10:00:00Z",
//     created_at: "2023-01-01T00:00:00Z",
//     updated_at: "2024-07-15T10:00:00Z",
//     category: { id: "tech", name: "تقنية", description: "بودكاستات عن التكنولوجيا" },
//     host: { id: "host1", name: "أحمد علي", bio: "خبير تقني", email: "ahmed@example.com" },
//   },
//   {
//     id: "pod2",
//     title: "حكايات من التاريخ",
//     description: "رحلة عبر الزمن لاستكشاف قصص وشخصيات تاريخية.",
//     cover_image_url: "/placeholder.svg?height=200&width=200",
//     language: "العربية",
//     category_id: "history",
//     host_id: "host2",
//     total_episodes: 30,
//     last_episode_date: "2024-07-10T12:00:00Z",
//     created_at: "2023-03-10T00:00:00Z",
//     updated_at: "2024-07-10T12:00:00Z",
//     category: { id: "history", name: "تاريخ", description: "بودكاستات عن التاريخ" },
//     host: { id: "host2", name: "ليلى خالد", bio: "مؤرخة وباحثة", email: "layla@example.com" },
//   },
// ]

// const mockPodcastCategories: PodcastCategory[] = [
//   { id: "tech", name: "تقنية", description: "بودكاستات عن التكنولوجيا", created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z" },
//   { id: "history", name: "تاريخ", description: "بودكاستات عن التاريخ", created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z" },
//   { id: "comedy", name: "كوميديا", description: "بودكاستات كوميدية", created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z" },
// ]

// const mockPodcastHosts: PodcastHost[] = [
//   { id: "host1", name: "أحمد علي", bio: "خبير تقني", email: "ahmed@example.com", profile_picture_url: "/placeholder.svg?height=50&width=50", created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z" },
//   { id: "host2", name: "ليلى خالد", bio: "مؤرخة وباحثة", email: "layla@example.com", profile_picture_url: "/placeholder.svg?height=50&width=50", created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z" },
// ]

// // Hook for fetching all podcast shows
// export function usePodcastShows() {
//   const { notify } = useNotifications()
//   // In a real app, this would fetch from an API
//   const { data, isLoading, error, refetch } = useGetQuery<PodcastShow[]>({
//     url: "podcasts", // Mock URL
//     key: ["podcast-shows"],
//     // Simulate API call
//     queryFn: async () => {
//       await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
//       return mockPodcastShows;
//     }
//   });

//   return {
//     podcastShows: data || [],
//     isLoading,
//     error,
//     refetch,
//   };
// }

// // Hook for fetching a single podcast show
// export function usePodcastShow(id: string) {
//   const { notify } = useNotifications()
//   const { data, isLoading, error, refetch } = useGetQuery<PodcastShow>({
//     url: `podcasts/${id}`, // Mock URL
//     key: ["podcast-show", id],
//     queryFn: async () => {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const show = mockPodcastShows.find(p => p.id === id);
//       if (!show) throw new Error("Podcast show not found");
//       return show;
//     }
//   });

//   return {
//     podcastShow: data || {
//       id: "dummy-pod",
//       title: "Dummy Podcast",
//       description: "This is a dummy podcast show for testing purposes",
//       cover_image_url: "/placeholder.svg?height=200&width=200",
//       language: "العربية",
//       category_id: "test",
//       host_id: "test-host",
//       total_episodes: 0,
//       last_episode_date: new Date().toISOString(),
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//       category: { id: "test", name: "Test Category", description: "Test category description" },
//       host: { id: "test-host", name: "Test Host", bio: "Test host bio", email: "test@example.com" },
//     },
//     isLoading,
//     error,
//     refetch,
//   };
// }

// // Hook for creating a podcast show
// export function useCreatePodcastShow(onSuccess?: () => void) {
//   const { notify } = useNotifications();
//   const { mutate, isPending } = useMutationAction({
//     method: "post",
//     url: "podcasts", // Mock URL
//     onSuccessCallback: () => {
//       notify.success("تم إنشاء البودكاست بنجاح");
//       onSuccess?.();
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء إنشاء البودكاست");
//     },
//     mutationFn: async (data: CreatePodcastShowData) => {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const newShow: PodcastShow = {
//         ...data,
//         id: `pod${mockPodcastShows.length + 1}`,
//         total_episodes: 0,
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//         category: mockPodcastCategories.find(c => c.id === data.category_id),
//         host: mockPodcastHosts.find(h => h.id === data.host_id),
//       };
//       mockPodcastShows.push(newShow);
//       return newShow;
//     }
//   });
//   return { mutate, isPending };
// }

// // Hook for updating a podcast show
// export function useUpdatePodcastShow(onSuccess?: () => void) {
//   const { notify } = useNotifications();
//   const { mutate, isPending } = useMutationAction({
//     method: "put",
//     url: "podcasts", // Mock URL
//     onSuccessCallback: () => {
//       notify.success("تم تحديث البودكاست بنجاح");
//       onSuccess?.();
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء تحديث البودكاست");
//     },
//     mutationFn: async (data: UpdatePodcastShowData) => {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const index = mockPodcastShows.findIndex(p => p.id === data.id);
//       if (index === -1) throw new Error("Podcast show not found");
//       mockPodcastShows[index] = {
//         ...mockPodcastShows[index],
//         ...data,
//         updated_at: new Date().toISOString(),
//         category: data.category_id ? mockPodcastCategories.find(c => c.id === data.category_id) : mockPodcastShows[index].category,
//         host: data.host_id ? mockPodcastHosts.find(h => h.id === data.host_id) : mockPodcastShows[index].host,
//       };
//       return mockPodcastShows[index];
//     }
//   });
//   return { mutate, isPending };
// }

// // Hook for deleting a podcast show
// export function useDeletePodcastShow(onSuccess?: () => void) {
//   const { notify } = useNotifications();
//   const { mutate, isPending } = useMutationAction({
//     method: "delete",
//     url: "podcasts", // Mock URL
//     onSuccessCallback: () => {
//       notify.success("تم حذف البودكاست بنجاح");
//       onSuccess?.();
//     },
//     onErrorCallback: (error) => {
//       notify.error(error.message || "حدث خطأ أثناء حذف البودكاست");
//     },
//     mutationFn: async (data: { id: string }) => {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const initialLength = mockPodcastShows.length;
//       mockPodcastShows.splice(mockPodcastShows.findIndex(p => p.id === data.id), 1);
//       if (mockPodcastShows.length === initialLength) throw new Error("Podcast show not found");
//       return { success: true };
//     }
//   });
//   return { mutate, isPending };
// }

// // Hook for fetching podcast categories
// export function usePodcastCategories() {
//   const { data, isLoading, error } = useGetQuery<PodcastCategory[]>({
//     url: "podcast-categories",
//     key: ["podcast-categories"],
//     queryFn: async () => {
//       await new Promise(resolve => setTimeout(resolve, 300));
//       return mockPodcastCategories;
//     }
//   });
//   return { categories: data || [], isLoading, error };
// }

// // Hook for fetching podcast hosts
// export function usePodcastHosts() {
//   const { data, isLoading, error } = useGetQuery<PodcastHost[]>({
//     url: "podcast-hosts",
//     key: ["podcast-hosts"],
//     queryFn: async () => {
//       await new Promise(resolve => setTimeout(resolve, 300));
//       return mockPodcastHosts;
//     }
//   });
//   return { hosts: data || [], isLoading, error };
// }
