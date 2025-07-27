"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import DangerDialog from "../../components/ui/danger-dialog"
import Textarea from "../../components/ui/textarea"
import type { Subscription } from "../../types/subscription"

interface CancelSubscriptionDialogProps {
  isOpen: boolean
  onClose: () => void
  subscription: Subscription | null
  onSuccess?: () => void
}

interface CancelFormData {
  reason: string
}

export default function CancelSubscriptionDialog({ 
  isOpen, 
  onClose, 
  subscription, 
  onSuccess 
}: CancelSubscriptionDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const { control, handleSubmit, reset } = useForm<CancelFormData>({
    defaultValues: {
      reason: ""
    }
  })

  const handleCancel = async (data: CancelFormData) => {
    if (!subscription) return
    
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Cancelling subscription:", subscription.id, "Reason:", data.reason)
      
      reset()
      onClose()
      onSuccess?.()
    } catch (error) {
      console.error("Error cancelling subscription:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!subscription) return null

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit(handleCancel)}
      title="إلغاء الاشتراك"
      confirmText="إلغاء الاشتراك"
      loading={isLoading}
      customContent={
        <div className="space-y-4">
          <p className="text-gray-600">
            هل أنت متأكد من إلغاء اشتراك المستخدم "{subscription.user?.name}" في باقة "{subscription.plan?.name_ar}"؟
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>تنبيه:</strong> سيتم إلغاء الاشتراك فوراً وسيفقد المستخدم الوصول للميزات المدفوعة.
            </p>
          </div>

          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="سبب الإلغاء (اختياري)"
                placeholder="اكتب سبب إلغاء الاشتراك..."
                rows={3}
              />
            )}
          />
        </div>
      }
    />
  )
}
