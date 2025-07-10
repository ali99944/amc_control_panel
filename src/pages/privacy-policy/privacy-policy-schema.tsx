import { z } from "zod"

export const privacyPolicySectionSchema = z.object({
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

export const privacyPolicyFormSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان سياسة الخصوصية مطلوب")
    .min(5, "عنوان سياسة الخصوصية يجب أن يكون أكثر من 5 أحرف")
    .max(100, "عنوان سياسة الخصوصية يجب أن يكون أقل من 100 حرف"),
  sections: z.array(privacyPolicySectionSchema).min(1, "يجب إضافة قسم واحد على الأقل"),
})

export type PrivacyPolicyFormData = z.infer<typeof privacyPolicyFormSchema>
export type PrivacyPolicySectionFormData = z.infer<typeof privacyPolicySectionSchema>
