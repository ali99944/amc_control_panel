import { z } from "zod"

export const podcastShowFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان البودكاست مطلوب")
    .min(3, "عنوان البودكاست يجب أن يكون أكثر من 3 أحرف")
    .max(200, "عنوان البودكاست يجب أن يكون أقل من 200 حرف"),
  description: z
    .string()
    .min(1, "وصف البودكاست مطلوب")
    .min(10, "وصف البودكاست يجب أن يكون أكثر من 10 أحرف")
    .max(1000, "وصف البودكاست يجب أن يكون أقل من 1000 حرف"),
  cover_image_url: z.string().url("صيغة رابط الصورة غير صحيحة").optional().or(z.literal("")),
  language: z.string().min(1, "اللغة مطلوبة"),
  category_id: z.string().min(1, "القسم مطلوب"),
  host_id: z.string().min(1, "المضيف مطلوب"),
})

export type PodcastShowFormData = z.infer<typeof podcastShowFormSchema>

export const podcastEpisodeFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان الحلقة مطلوب")
    .min(3, "عنوان الحلقة يجب أن يكون أكثر من 3 أحرف")
    .max(200, "عنوان الحلقة يجب أن يكون أقل من 200 حرف"),
  description: z.string().max(1000, "وصف الحلقة يجب أن يكون أقل من 1000 حرف").optional().or(z.literal("")),
  audio_url: z.string().url("صيغة رابط الصوت غير صحيحة").min(1, "رابط الصوت مطلوب"),
  duration: z.number().min(1, "المدة مطلوبة ويجب أن تكون أكبر من 0"),
  release_date: z.string().min(1, "تاريخ الإصدار مطلوب"),
  episode_number: z.number().min(1, "رقم الحلقة مطلوب ويجب أن يكون أكبر من 0"),
})

export type PodcastEpisodeFormData = z.infer<typeof podcastEpisodeFormSchema>
