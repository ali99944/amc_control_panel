import { z } from "zod"

export const genreFormSchema = z.object({
  name: z
    .string()
    .min(1, "اسم النوع الموسيقي مطلوب")
    .min(2, "اسم النوع الموسيقي يجب أن يكون أكثر من حرفين")
    .max(50, "اسم النوع الموسيقي يجب أن يكون أقل من 50 حرف"),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional().or(z.literal("")),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "يجب أن يكون اللون بصيغة صحيحة")
    .optional(),
  is_active: z.boolean(),
})

export type GenreFormData = z.infer<typeof genreFormSchema>
