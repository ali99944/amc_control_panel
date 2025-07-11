"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { Manager } from "../../types/manager"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ManagerFormData, managerFormSchema } from "./manager-form-schema"

interface ManagerFormProps {
  manager?: Manager
  onSubmit: (data: ManagerFormData) => void
  isLoading?: boolean
}

export function ManagerForm({ manager, onSubmit, isLoading }: ManagerFormProps) {


  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<ManagerFormData>({
    resolver: zodResolver(managerFormSchema),
    defaultValues: {
      name: manager?.name || "",
      username: manager?.username || ""
    },
  })
  




  const handleFormSubmit = (data: ManagerFormData) => {  
    onSubmit(data)
  }


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 text-black">
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


        {!manager && (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" type="password" {...register("password")} placeholder="أدخل كلمة المرور" />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
        )}
      </div>


      <div className="flex justify-end space-x-2 space-x-reverse">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : manager ? "تحديث المدير" : "إنشاء مدير جديد"}
        </Button>
      </div>
    </form>
  )
}
