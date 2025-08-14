"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Order, OrderStatus } from "../types/order"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

export function useOrders() {
  return useGetQuery<Order[]>({
    key: ["orders"],
    url: "orders",
  })
}

export function useOrder(id: number) {
  return useGetQuery<Order>({
    key: ["orders", id],
    url: `orders/${id}`,
    options: { enabled: !!id },
  })
}

export function useDeleteOrder() {
  const { notify } = useNotifications()
  return useMutationAction<unknown, { id: number }>({
    method: "delete",
    url: "orders",
    key: ["orders"],
    onSuccessCallback: () => {
      notify.success("تم حذف الطلب بنجاح.")
    },
    onErrorCallback: (error) => notify.error(getApiError(error).message),
  })
}

export function useUpdateOrderStatus(id: number) {
    const { notify } = useNotifications()
    return useMutationAction<Order, { status: OrderStatus }>({
        method: 'put',
        url: `orders/${id}/status`, // We'll need this new route
        key: ['orders', id],
        onSuccessCallback: () => {
            notify.success("تم تحديث حالة الطلب بنجاح!")
        },
        onErrorCallback: (error) => notify.error(getApiError(error).message)
    })
}
