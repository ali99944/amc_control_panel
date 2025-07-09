import { z } from "zod"

export const songFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان الأغنية مطلوب")
    .min(2, "عنوان الأغنية يجب أن يكون أكثر من حرفين")
    .max(200, "عنوان الأغنية يجب أن يكون أقل من 200 حرف"),
  artist_id: z.string().min(1, "يجب اختيار الفنان").optional(),
  genre_id: z.string().min(1, "يجب اختيار النوع الموسيقي").optional(),
  release_date: z.string().min(1, "تاريخ الإصدار مطلوب"),
  explicit: z.boolean(),
  lyrics: z.string().max(10000, "كلمات الأغنية يجب أن تكون أقل من 10000 حرف").optional().or(z.literal("")),
  description: z.string().max(1000, "الوصف يجب أن يكون أقل من 1000 حرف").optional().or(z.literal("")),
})

export type SongFormData = z.infer<typeof songFormSchema>
