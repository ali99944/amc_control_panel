import { z } from "zod"

export const managerFormSchema = z.object({
  name: z
    .string()
    .min(2, "يجب أن يكون الاسم مكوناً من حرفين على الأقل")
    .max(100, "يجب أن يكون الاسم أقل من 100 حرف"),
  username: z
    .string()
    .min(3, "يجب أن يكون اسم المستخدم مكوناً من 3 أحرف على الأقل")
    .max(50, "يجب أن يكون اسم المستخدم أقل من 50 حرف")
    .regex(/^[a-zA-Z0-9_]+$/, "يجب أن يحتوي اسم المستخدم على أحرف وأرقام وشرطة سفلية فقط"),

  role: z
    .enum(["admin", "super_admin"], {
      required_error: "يرجى اختيار دور المدير",
    }),
  password: z
    .string()
    .min(8, "يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل")
    .optional(),
  permissions: z
    .array(z.string())
    .min(1, "يجب اختيار صلاحية واحدة على الأقل"),
})

export const managerPermissionsSchema = z.object({
  permissions: z
    .array(z.string())
    .min(1, "يجب اختيار صلاحية واحدة على الأقل"),
})

export type ManagerFormData = z.infer<typeof managerFormSchema>
export type ManagerPermissionsFormData = z.infer<typeof managerPermissionsSchema>
