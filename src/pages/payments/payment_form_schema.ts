import { z } from "zod"
import { PaymentMethod, PaymentStatus } from "../../types/payment"

export const paymentItemSchema = z.object({
  id: z.string().optional(), // Optional for new items
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price cannot be negative"),
  totalPrice: z.number().min(0, "Total price cannot be negative"),
})

export const paymentFormSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  status: z.nativeEnum(PaymentStatus, { message: "Invalid payment status" }),
  method: z.nativeEnum(PaymentMethod, { message: "Invalid payment method" }),
  transactionId: z.string().min(1, "Transaction ID is required"),
  paymentDate: z.string().datetime("Invalid date format"),
  items: z.array(paymentItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional(),
})

export type PaymentFormValues = z.infer<typeof paymentFormSchema>
