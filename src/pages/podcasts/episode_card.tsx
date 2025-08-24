// "use client"
// import { useState } from "react"
// import { Play, Pause, Clock, Calendar, Headphones, Edit, Trash2 } from "lucide-react"
// import Card from "../../components/ui/card"
// import Button from "../../components/ui/button"
// import type { PodcastEpisode } from "../../types/podcast"
// import { Input } from "../../components/ui/input"
// import Textarea from "../../components/ui/textarea"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useUpdatePodcastEpisode, useDeletePodcastEpisode } from "../../hooks/use-episodes"
// import DangerDialog from "../../components/ui/danger-dialog"
// import { useNotifications } from "../../hooks/use-notification"
// import { formatDateTime } from "../../lib/date"
// import { PodcastEpisodeFormData, podcastEpisodeFormSchema } from "./podcast_form_schema"

// interface EpisodeCardProps {
//   episode: PodcastEpisode
//   onPlay: (episode: PodcastEpisode) => void
//   isPlaying: boolean
//   onSuccess?: () => void
// }

// export default function EpisodeCard({ episode, onPlay, isPlaying, onSuccess }: EpisodeCardProps) {
//   const [isEditing, setIsEditing] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const { notify } = useNotifications()

//   const { mutate: updateEpisode, isPending: isUpdating } = useUpdatePodcastEpisode(() => {
//     setIsEditing(false)
//     onSuccess?.()
//     notify.success("تم تحديث الحلقة بنجاح")
//   })

//   const { mutate: deleteEpisode, isPending: isDeleting } = useDeletePodcastEpisode(() => {
//     setIsDeleteDialogOpen(false)
//     onSuccess?.()
//     notify.success("تم حذف الحلقة بنجاح")
//   })

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isDirty },
//     reset,
//   } = useForm<PodcastEpisodeFormData>({
//     resolver: zodResolver(podcastEpisodeFormSchema),
//     defaultValues: {
//       title: episode.title,
//       description: episode.description || "",
//       audio_url: episode.audio_url,
//       duration: episode.duration,
//       release_date: episode.release_date.split("T")[0], // Format for date input
//       episode_number: episode.episode_number,
//     },
//   })

//   const onSubmit = (data: PodcastEpisodeFormData) => {
//     updateEpisode({
//       id: episode.id,
//       ...data,
//       release_date: new Date(data.release_date).toISOString(), // Convert back to ISO
//     })
//   }

//   const handleCancelEdit = () => {
//     reset()
//     setIsEditing(false)
//   }

//   const handleDeleteConfirm = () => {
//     deleteEpisode({ id: episode.id })
//   }

//   const formatDuration = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60)
//     const remainingSeconds = seconds % 60
//     return `${minutes}د ${remainingSeconds}ث`
//   }

//   return (
//     <Card className="p-6">
//       {isEditing ? (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Input
//             {...register("title")}
//             label="عنوان الحلقة"
//             placeholder="مثال: مستقبل الذكاء الاصطناعي"
//             error={errors.title?.message}
//             required
//           />
//           <Textarea
//             {...register("description")}
//             label="وصف الحلقة"
//             placeholder="وصف تفصيلي عن محتوى الحلقة..."
//             rows={3}
//             error={errors.description?.message}
//           />
//           <Input
//             {...register("audio_url")}
//             label="رابط الصوت"
//             placeholder="مثال: https://example.com/episode.mp3"
//             error={errors.audio_url?.message}
//             required
//           />
//           <Input
//             {...register("duration", { valueAsNumber: true })}
//             label="المدة (بالثواني)"
//             type="number"
//             placeholder="مثال: 3600"
//             error={errors.duration?.message}
//             required
//           />
//           <Input
//             {...register("release_date")}
//             label="تاريخ الإصدار"
//             type="date"
//             error={errors.release_date?.message}
//             required
//           />
//           <Input
//             {...register("episode_number", { valueAsNumber: true })}
//             label="رقم الحلقة"
//             type="number"
//             placeholder="مثال: 1"
//             error={errors.episode_number?.message}
//             required
//           />
//           <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
//             <Button type="button" variant="secondary" onClick={handleCancelEdit} disabled={isUpdating}>
//               إلغاء
//             </Button>
//             <Button type="submit" loading={isUpdating} disabled={!isDirty}>
//               حفظ التغييرات
//             </Button>
//           </div>
//         </form>
//       ) : (
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-bold text-primary">
//               الحلقة {episode.episode_number}: {episode.title}
//             </h3>
//             <div className="flex items-center gap-2">
//               <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)} title="تعديل الحلقة">
//                 <Edit className="w-4 h-4" />
//               </Button>
//               <Button size="sm" variant="danger" onClick={() => setIsDeleteDialogOpen(true)} title="حذف الحلقة">
//                 <Trash2 className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>

//           <p className="text-gray-700 leading-relaxed">{episode.description || "لا يوجد وصف لهذه الحلقة."}</p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
//             <div className="flex items-center gap-2">
//               <Clock className="w-4 h-4" />
//               <span>المدة: {formatDuration(episode.duration)}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Calendar className="w-4 h-4" />
//               <span>تاريخ الإصدار: {formatDateTime(episode.release_date)}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Headphones className="w-4 h-4" />
//               <span>عدد التشغيلات: {episode.plays_count.toLocaleString()}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
//             <Button variant="primary" onClick={() => onPlay(episode)}>
//               {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//               {isPlaying ? "إيقاف التشغيل" : "تشغيل الحلقة"}
//             </Button>
//             {/* You might add a download button here if audio_url is directly downloadable */}
//           </div>
//         </div>
//       )}

//       <DangerDialog
//         isOpen={isDeleteDialogOpen}
//         onClose={() => setIsDeleteDialogOpen(false)}
//         onConfirm={handleDeleteConfirm}
//         title="حذف الحلقة"
//         message={`هل أنت متأكد من حذف الحلقة "${episode.title}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
//         confirmText="حذف الحلقة"
//         loading={isDeleting}
//       />
//     </Card>
//   )
// }
