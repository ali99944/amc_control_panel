import { z } from "zod"

// const PlaylistSource = z.enum(['curated', 'editorial', 'trending']).default('curated')

export const playlistFormSchema = z.object({
  name: z
    .string()
    .min(1, "اسم قائمة التشغيل مطلوب")
    .min(2, "اسم قائمة التشغيل يجب أن يكون أكثر من حرفين")
    .max(100, "اسم قائمة التشغيل يجب أن يكون أقل من 100 حرف"),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional().or(z.literal("")),
  is_public: z.boolean(),
  song_ids: z.array(z.number()),
  source: z.string()
})

export type PlaylistFormData = z.infer<typeof playlistFormSchema>
