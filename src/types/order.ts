export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface OrderItem {
  id: number
  product_name: string
  product_image: string
  price: number
  quantity: number
  color?: string
  size?: string
}

export interface Order {
  id: number
  order_code: string
  status: OrderStatus
  customer: {
    fullName: string
    email: string
    phone: string
  }
  shippingAddress: {
      address: string
      city: string
  }
  financials: {
    grandTotal: number
  }
  items: OrderItem[]
  created_at: string
}