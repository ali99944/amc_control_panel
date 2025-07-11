import { z } from "zod"

export const reportFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان التقرير مطلوب")
    .min(3, "عنوان التقرير يجب أن يكون أكثر من 3 أحرف")
    .max(100, "عنوان التقرير يجب أن يكون أقل من 100 حرف"),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional().or(z.literal("")),
  type: z.enum(["user_report", "content_report", "engagement_report"], {
    required_error: "نوع التقرير مطلوب",
  }),
  date_range: z.object({
    start_date: z.string().min(1, "تاريخ البداية مطلوب"),
    end_date: z.string().min(1, "تاريخ النهاية مطلوب"),
  }),
  filters: z.object({
    user_types: z.array(z.string()).optional(),
    content_types: z.array(z.string()).optional(),
    genres: z.array(z.string()).optional(),
    artists: z.array(z.string()).optional(),
  }),
})

export type ReportFormData = z.infer<typeof reportFormSchema>
