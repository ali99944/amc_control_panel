import User from "./user"

export interface Payment {
  id: number
  user_id: number
  plan_id: number
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled'
  payment_method: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer'
  transaction_id: string | null
  gateway: 'stripe' | 'paypal' | 'razorpay' | 'local_bank'
  gateway_transaction_id: string | null
  payment_date: string
  created_at: string
  updated_at: string
  
  // Relations
  user?: User
  plan?: SubscriptionPlan
  payment_details?: PaymentDetails
}

export interface SubscriptionPlan {
  id: number
  name: string
  name_ar: string
  description: string
  description_ar: string
  price: number
  currency: string
  duration_months: number
  features: string[]
  is_active: boolean
  is_popular: boolean
  created_at: string
  updated_at: string
}

export interface PaymentDetails {
  id: number
  payment_id: number
  card_last_four?: string
  card_brand?: string
  billing_address?: BillingAddress
  receipt_url?: string
  refund_reason?: string
  failure_reason?: string
  gateway_response?: Record<string, any>
  created_at: string
}

export interface BillingAddress {
  country: string
  city: string
  state?: string
  postal_code?: string
  line1: string
  line2?: string
}

export interface PaymentFilters {
  search?: string
  user_id?: number
  plan_id?: number
  status?: Payment['status']
  payment_method?: Payment['payment_method']
  gateway?: Payment['gateway']
  date_from?: string
  date_to?: string
  amount_min?: number
  amount_max?: number
}
