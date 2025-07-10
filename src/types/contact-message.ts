export interface ContactMessage {
    id: number
    name: string
    email: string
    subject: string
    message: string
    created_at: string
    updated_at: string
  }
  
  export interface CreateContactMessageData {
    name: string
    email: string
    subject: string
    message: string
  }
  