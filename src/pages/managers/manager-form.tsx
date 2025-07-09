"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { Manager } from "../../types/manager"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Switch from "../../components/ui/switch"
import { ROLE_PERMISSIONS, PERMISSIONS, PERMISSION_CATEGORIES, PERMISSION_LABELS } from "../../constants/app_permissions"
import { useAllPermissions } from "../../hooks/use-managers"
import { ManagerFormData, managerFormSchema } from "./manager-form-schema"
import { Loader2 } from "lucide-react"
import Select from "../../components/ui/select"

interface ManagerFormProps {
  manager?: Manager
  onSubmit: (data: ManagerFormData) => void
  isLoading?: boolean
}

export function ManagerForm({ manager, onSubmit, isLoading }: ManagerFormProps) {
  const { isLoading: permissionsLoading } = useAllPermissions()
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    (manager?.permissions ?? []).filter((p) => p.is_granted).map((p) => p.id) || [],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ManagerFormData>({
    resolver: zodResolver(managerFormSchema),
    defaultValues: {
      name: manager?.name || "",
      username: manager?.username || "",
      role: manager?.role || "admin",
      permissions: selectedPermissions,
    },
  })

  const watchedRole = watch("role")

  // Update permissions when role changes
  useEffect(() => {
    if (watchedRole && !manager) {
      const rolePermissions = ROLE_PERMISSIONS[watchedRole] || []
      setSelectedPermissions(rolePermissions)
      setValue("permissions", rolePermissions)
    }
  }, [watchedRole, setValue, manager])

  const handlePermissionToggle = (permissionId: string) => {
    const newPermissions = selectedPermissions.includes(permissionId)
      ? selectedPermissions.filter((id) => id !== permissionId)
      : [...selectedPermissions, permissionId]

    setSelectedPermissions(newPermissions)
    setValue("permissions", newPermissions)
  }

  const handleFormSubmit = (data: ManagerFormData) => {
    onSubmit({
      ...data,
      permissions: selectedPermissions,
    })
  }

  // Group permissions by category
  const groupedPermissions = Object.entries(PERMISSIONS).reduce(
    (acc, [category, perms]) => {
      acc[category] = Object.values(perms)
      return acc
    },
    {} as Record<string, string[]>,
  )

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم الكامل</Label>
          <Input id="name" {...register("name")} placeholder="أدخل الاسم الكامل" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">اسم المستخدم</Label>
          <Input id="username" {...register("username")} placeholder="أدخل اسم المستخدم" />
          {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
        </div>


        <div className="space-y-2">
          <Label htmlFor="role">الدور</Label>
          <Select
            {...register("role")}
            options={[
                {
                    label: "Admin",
                    value: "admin"
                },
                {
                    label: "Super Admin",
                    value: "super_admin"
                },
            ]}
            onChange={(val) => {
              console.log(val);
              
            }}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}
        </div>

        {!manager && (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" type="password" {...register("password")} placeholder="أدخل كلمة المرور" />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label>الصلاحيات</Label>
        {permissionsLoading ? (
          <div className="text-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto"></Loader2>
              <p className="text-gray-600 mt-2">جاري تحميل الصلاحيات...</p>
            </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPermissions).map(([category, permissions]) => (
              <div key={category} className="space-y-3">
                <h4 className="font-medium text-gray-900">
                  {PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES]}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissions.map((permission) => (
                    <div key={permission} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {PERMISSION_LABELS[permission as keyof typeof PERMISSION_LABELS]}
                        </div>
                        <div className="text-xs text-gray-500">{permission}</div>
                      </div>
                      <Switch
                        checked={selectedPermissions.includes(permission)}
                        onChange={() => handlePermissionToggle(permission)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {errors.permissions && <p className="text-sm text-red-600">{errors.permissions.message}</p>}
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : manager ? "تحديث المدير" : "إنشاء مدير جديد"}
        </Button>
      </div>
    </form>
  )
}
