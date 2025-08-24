"use client"

import { useContext } from "react"
import { NotificationContext } from "../providers/notification-provider"

export const useNotifications = () => {
  const { addNotification, removeNotification } = useContext(NotificationContext)

  const notify = {
    success: (message: string) => {
      addNotification(message, "success")
    },
    error: (message: string) => {
      addNotification(message, "error")
    },
    warning: (message: string) => {
      addNotification(message, "warning")
    },
    info: (message: string) => {
      addNotification(message, "info")
    },
  }

  return {
    notify,
    removeNotification,
  }
}