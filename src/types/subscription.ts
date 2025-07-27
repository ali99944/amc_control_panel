import type { Payment } from "./payment"
import User from "./user"

export interface Subscription {
  id: number
  user_id: number
  plan_id: number
  status: "active" | "cancelled" | "expired" | "pending" | "paused"
  start_date: string
  end_date: string
  next_billing_date: string | null
  cancelled_at: string | null
  cancellation_reason: string | null
  auto_renew: boolean
  trial_end_date: string | null
  is_trial: boolean
  created_at: string
  updated_at: string

  // Relations
  user?: User
  plan?: SubscriptionPlan
  payments?: Payment[]
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
  max_offline_downloads: number
  audio_quality: "standard" | "high" | "lossless"
  ads_free: boolean
  skip_limit: number | null
  is_active: boolean
  is_popular: boolean
  trial_days: number
  created_at: string
  updated_at: string
}

export interface SubscriptionAnalytics {
  total_subscriptions: number
  active_subscriptions: number
  cancelled_subscriptions: number
  expired_subscriptions: number
  trial_subscriptions: number
  monthly_revenue: number
  churn_rate: number
  conversion_rate: number
  average_subscription_length: number
  most_popular_plan: SubscriptionPlan | null
  revenue_by_plan: Array<{
    plan: SubscriptionPlan
    revenue: number
    count: number
  }>
  subscription_trends: Array<{
    date: string
    new_subscriptions: number
    cancellations: number
    revenue: number
  }>
}

export interface SubscriptionFilters {
  search?: string
  user_id?: number
  plan_id?: number
  status?: Subscription["status"]
  is_trial?: boolean
  auto_renew?: boolean
  start_date_from?: string
  start_date_to?: string
  end_date_from?: string
  end_date_to?: string
}
