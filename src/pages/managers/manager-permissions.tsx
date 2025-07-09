"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ArrowLeft, Shield, Save, User, Calendar, Crown, Loader2 } from 'lucide-react'
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import Switch from "../../components/ui/switch"
import { PERMISSIONS, ROLE_LABELS, PERMISSION_CATEGORIES, PERMISSION_LABELS } from "../../constants/app_permissions"
import { useManagers, useAllPermissions } from "../../hooks/use-managers"
import { ManagerPermissionsFormData, managerPermissionsSchema } from "./manager-form-schema"
import { useParams } from "react-router-dom"
import Toolbar from "../../components/ui/toolbar"


export default function ManagerPermissionsPage() {
  const { managers, updateManagerPermissions, isUpdatingPermissions } = useManagers()
  const { isLoading: permissionsLoading } = useAllPermissions()
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const { id: managerId } = useParams()

  const manager = managers.find((m) => m.id == +(managerId ?? '1'))

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ManagerPermissionsFormData>({
    resolver: zodResolver(managerPermissionsSchema),
  })

  useEffect(() => {
    if (manager) {
      const grantedPermissions = (manager?.permissions ?? []).filter((p) => p.is_granted).map((p) => p.id)
      setSelectedPermissions(grantedPermissions)
      setValue("permissions", grantedPermissions)
    }
  }, [manager, setValue])

  const handlePermissionToggle = (permissionId: string) => {
    const newPermissions = selectedPermissions.includes(permissionId)
      ? selectedPermissions.filter((id) => id !== permissionId)
      : [...selectedPermissions, permissionId]

    setSelectedPermissions(newPermissions)
    setValue("permissions", newPermissions)
  }

  const handleFormSubmit = (data: ManagerPermissionsFormData) => {
    updateManagerPermissions(+(managerId ?? '1'), {
      permissions: data.permissions,
    })
  }

  const handleGoBack = () => {
    // In a real app, this would use router.back() or similar
    window.history.back()
  }

  // Group permissions by category
  const groupedPermissions = Object.entries(PERMISSIONS).reduce((acc, [category, perms]) => {
    acc[category] = Object.values(perms)
    return acc
  }, {} as Record<string, string[]>)

  const categoryIcons = {
    GENRE: Shield,
    ARTIST: User,
    SONG: Shield,
    PLAYLIST: Shield,
    ALBUM: Shield,
    MANAGER: Crown,
  }

  if (!manager) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">المدير غير موجود</h2>
          <p className="text-gray-600 mt-2">لم يتم العثور على المدير المطلوب</p>
          <Button onClick={handleGoBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Toolbar
        title="إدارة صلاحيات المدير"
      >
        <Button variant="primary-inverted" onClick={handleGoBack}>
            العودة
        </Button>
      </Toolbar>

      {/* Manager Info Card */}
      <Card>
        <div className="flex items-center gap-x-6 ">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            {manager.profile_picture ? (
              <img
                src={manager.profile_picture || "/placeholder.svg"}
                alt={manager.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{manager.name}</h2>
            <div className="flex items-center gap-x-4  text-sm text-gray-600 mt-1">
              <div className="flex items-center">
                <User className="w-4 h-4 ml-1" />@{manager.username}
              </div>

              <div className="flex items-center">
                <Calendar className="w-4 h-4 ml-1" />
                انضم في {new Date(manager.created_at).toLocaleDateString("ar-SA")}
              </div>
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  manager.role === "super_admin" 
                    ? "bg-primary/10 text-primary" 
                    : manager.role === "admin"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {manager.role === "super_admin" && <Crown className="w-3 h-3 ml-1" />}
                {ROLE_LABELS[manager.role]}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Permissions Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">الصلاحيات</h3>
            </div>
            <div className="text-sm text-gray-600">
              {selectedPermissions.length} من {Object.values(PERMISSIONS).flat().length} صلاحية محددة
            </div>
          </div>

          {permissionsLoading ? (
            <div className="text-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto"></Loader2>
              <p className="text-gray-600 mt-2">جاري تحميل الصلاحيات...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedPermissions).map(([category, permissions]) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
                const selectedInCategory = permissions.filter((p) => selectedPermissions.includes(p)).length

                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-3 ">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <h4 className="font-medium text-gray-900">
                          {PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES]}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedInCategory} من {permissions.length}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {permissions.map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1">
                            <Label className="font-medium text-sm cursor-pointer">
                              {PERMISSION_LABELS[permission as keyof typeof PERMISSION_LABELS]}
                            </Label>
                            <p className="text-xs text-gray-500 mt-1">{permission}</p>
                          </div>
                          <Switch
                            checked={selectedPermissions.includes(permission)}
                            onChange={() => handlePermissionToggle(permission)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {errors.permissions && <p className="text-sm text-red-600 mt-4">{errors.permissions.message}</p>}

          <div className="flex justify-end gap-x-2 mt-8 pt-6 border-t border-t-gray-300">
            <Button type="button" variant="secondary" onClick={handleGoBack}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isUpdatingPermissions}>
              <Save className="w-4 h-4 ml-2" />
              {isUpdatingPermissions ? "جاري الحفظ..." : "حفظ الصلاحيات"}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  )
}
