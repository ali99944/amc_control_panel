"use client"

import { useState, useEffect, useCallback } from "react"
import { Payment, PaymentStatus, PaymentMethod } from "../types/payment"
import User from "../types/user"

// Mock data for demonstration
const mockUsers: User[] = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", address: "123 Main St, Anytown" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com", address: "456 Oak Ave, Otherville" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", address: "789 Pine Ln, Somewhere" },
]

const mockPayments: Payment[] = [
  {
    id: "pay-001",
    userId: "user-1",
    user: mockUsers[0],
    amount: 99.99,
    currency: "USD",
    status: PaymentStatus.Completed,
    method: PaymentMethod.CreditCard,
    transactionId: "txn_abc123",
    paymentDate: "2024-07-15T10:00:00Z",
    items: [{ id: "item-a", name: "Premium Subscription", quantity: 1, unitPrice: 99.99, totalPrice: 99.99 }],
    notes: "Annual subscription renewal",
    createdAt: "2024-07-15T09:55:00Z",
    updatedAt: "2024-07-15T10:00:00Z",
  },
  {
    id: "pay-002",
    userId: "user-2",
    user: mockUsers[1],
    amount: 49.5,
    currency: "EUR",
    status: PaymentStatus.Pending,
    method: PaymentMethod.PayPal,
    transactionId: "txn_def456",
    paymentDate: "2024-07-14T14:30:00Z",
    items: [
      { id: "item-b", name: "Ebook: Advanced React", quantity: 1, unitPrice: 29.5, totalPrice: 29.5 },
      { id: "item-c", name: "Online Course: Next.js", quantity: 1, unitPrice: 20.0, totalPrice: 20.0 },
    ],
    notes: null,
    createdAt: "2024-07-14T14:25:00Z",
    updatedAt: "2024-07-14T14:30:00Z",
  },
  {
    id: "pay-003",
    userId: "user-1",
    user: mockUsers[0],
    amount: 15.0,
    currency: "USD",
    status: PaymentStatus.Failed,
    method: PaymentMethod.Stripe,
    transactionId: "txn_ghi789",
    paymentDate: "2024-07-13T11:00:00Z",
    items: [{ id: "item-d", name: "Consultation Hour", quantity: 1, unitPrice: 15.0, totalPrice: 15.0 }],
    notes: "Payment failed due to insufficient funds.",
    createdAt: "2024-07-13T10:58:00Z",
    updatedAt: "2024-07-13T11:00:00Z",
  },
  {
    id: "pay-004",
    userId: "user-3",
    user: mockUsers[2],
    amount: 250.0,
    currency: "GBP",
    status: PaymentStatus.Refunded,
    method: PaymentMethod.BankTransfer,
    transactionId: "txn_jkl012",
    paymentDate: "2024-07-12T09:00:00Z",
    items: [{ id: "item-e", name: "Enterprise Plan", quantity: 1, unitPrice: 500.0, totalPrice: 500.0 }],
    notes: "Full refund issued.",
    createdAt: "2024-07-11T18:00:00Z",
    updatedAt: "2024-07-12T09:00:00Z",
  },
]

// Simulate API delay
const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true)
      setError(null)
      try {
        await simulateDelay(500) // Simulate network request
        setPayments(mockPayments.map((p) => ({ ...p, user: mockUsers.find((u) => u.id === p.userId) })))
      } catch (err) {
        setError("Failed to fetch payments.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  return { payments, loading, error }
}

export function usePayment(id: string) {
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPayment = async () => {
      setLoading(true)
      setError(null)
      try {
        await simulateDelay(500) // Simulate network request
        const foundPayment = mockPayments.find((p) => p.id === id)
        if (foundPayment) {
          setPayment({ ...foundPayment, user: mockUsers.find((u) => u.id === foundPayment.userId) })
        } else {
          setError("Payment not found.")
        }
      } catch (err) {
        setError("Failed to fetch payment details.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchPayment()
    } else {
      setLoading(false)
      setError("No payment ID provided.")
    }
  }, [id])

  return { payment, loading, error }
}

export function useCreatePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPayment = useCallback(async (newPaymentData: Omit<Payment, "id" | "createdAt" | "updatedAt">) => {
    setLoading(true)
    setError(null)
    try {
      await simulateDelay(500)
      const newPayment: Payment = {
        ...newPaymentData,
        id: `pay-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockPayments.push(newPayment) // Add to mock data
      return newPayment
    } catch (err) {
      setError("Failed to create payment.")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createPayment, loading, error }
}

export function useUpdatePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updatePayment = useCallback(async (id: string, updatedPaymentData: Partial<Payment>) => {
    setLoading(true)
    setError(null)
    try {
      await simulateDelay(500)
      const index = mockPayments.findIndex((p) => p.id === id)
      if (index !== -1) {
        const updatedPayment = { ...mockPayments[index], ...updatedPaymentData, updatedAt: new Date().toISOString() }
        mockPayments[index] = updatedPayment
        return updatedPayment
      } else {
        setError("Payment not found for update.")
        throw new Error("Payment not found")
      }
    } catch (err) {
      setError("Failed to update payment.")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { updatePayment, loading, error }
}

export function useDeletePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deletePayment = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await simulateDelay(500)
      const initialLength = mockPayments.length
      const filteredPayments = mockPayments.filter((p) => p.id !== id)
      if (filteredPayments.length === initialLength) {
        setError("Payment not found for deletion.")
        throw new Error("Payment not found")
      }
      // In a real app, you'd update a global state or re-fetch
      // For mock, we'll just "remove" it from the array
      mockPayments.splice(0, mockPayments.length, ...filteredPayments)
      return true
    } catch (err) {
      setError("Failed to delete payment.")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { deletePayment, loading, error }
}
