import { z } from "zod"

export const artistFormSchema = z.object({
  name: z
    .string()
    .min(1, "اسم الفنان مطلوب")
    .min(2, "اسم الفنان يجب أن يكون أكثر من حرفين")
    .max(100, "اسم الفنان يجب أن يكون أقل من 100 حرف"),
  bio: z.string().max(1000, "السيرة الذاتية يجب أن تكون أقل من 1000 حرف").optional().or(z.literal("")),
  is_featured: z.boolean(),
  is_active: z.boolean(),
})

export type ArtistFormData = z.infer<typeof artistFormSchema>
