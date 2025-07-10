import { z } from "zod"

export const tagFormSchema = z.object({
  name: z
    .string()
    .min(1, "اسم التاغ مطلوب")
    .min(2, "اسم التاغ يجب أن يكون أكثر من حرفين")
    .max(50, "اسم التاغ يجب أن يكون أقل من 50 حرف")
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s-_]+$/, "اسم التاغ يحتوي على أحرف غير مسموحة"),
  description: z.string().max(200, "الوصف يجب أن يكون أقل من 200 حرف").optional().or(z.literal("")),
})

export type TagFormData = z.infer<typeof tagFormSchema>
