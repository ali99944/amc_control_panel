import { z } from "zod"

export const termsConditionsSectionSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "عنوان القسم مطلوب")
    .min(3, "عنوان القسم يجب أن يكون أكثر من 3 أحرف")
    .max(200, "عنوان القسم يجب أن يكون أقل من 200 حرف"),
  description: z
    .string()
    .min(1, "وصف القسم مطلوب")
    .min(10, "وصف القسم يجب أن يكون أكثر من 10 أحرف")
    .max(1000, "وصف القسم يجب أن يكون أقل من 1000 حرف"),
  points: z.array(z.string().min(1, "النقطة لا يمكن أن تكون فارغة")).min(1, "يجب إضافة نقطة واحدة على الأقل لكل قسم"),
})

export const termsConditionsFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان الشروط والأحكام مطلوب")
    .min(5, "عنوان الشروط والأحكام يجب أن يكون أكثر من 5 أحرف")
    .max(100, "عنوان الشروط والأحكام يجب أن يكون أقل من 100 حرف"),
  sections: z.array(termsConditionsSectionSchema).min(1, "يجب إضافة قسم واحد على الأقل"),
})

export type TermsConditionsFormData = z.infer<typeof termsConditionsFormSchema>
export type TermsConditionsSectionFormData = z.infer<typeof termsConditionsSectionSchema>
