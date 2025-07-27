import { z } from "zod"

export const albumFormSchema = z.object({
  name: z
    .string()
    .min(1, "اسم الألبوم مطلوب")
    .min(2, "اسم الألبوم يجب أن يكون أكثر من حرفين")
    .max(100, "اسم الألبوم يجب أن يكون أقل من 100 حرف"),
  description: z
    .string()
    .max(500, "الوصف يجب أن يكون أقل من 500 حرف")
    .optional()
    .or(z.literal("")),
  artist_id: z
    .number()
    .min(1, "يجب اختيار فنان"),
  release_date: z
    .string()
    .min(1, "تاريخ الإصدار مطلوب")
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate <= today
    }, "تاريخ الإصدار لا يمكن أن يكون في المستقبل"),
  album_type: z.enum(["Single", "EP", "Album", "Compilation"], {
    required_error: "نوع الألبوم مطلوب",
  }),
//   record_label: z
//     .string()
//     .max(100, "اسم شركة الإنتاج يجب أن يكون أقل من 100 حرف")
//     .optional()
//     .or(z.literal("")),
//   producer: z
//     .string()
//     .max(100, "اسم المنتج يجب أن يكون أقل من 100 حرف")
//     .optional()
//     .or(z.literal("")),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
})

export type AlbumFormData = z.infer<typeof albumFormSchema>
