export interface User {
    id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    role: "user" | "premium" | "admin" | "super_admin"
    status: "active" | "inactive" | "suspended" | "banned"
    joinDate: string
    lastActive: string
    songsPlayed: number
    playlistsCreated: number
    subscriptionType: "free" | "premium" | "family"
    country?: string
    dateOfBirth?: string
    gender?: "male" | "female"
    preferences: {
      language: "ar" | "en"
      notifications: boolean
      publicProfile: boolean
    }
    statistics: {
      totalListeningTime: number
      favoriteGenres: string[]
      deviceCount: number
    }
  }
  
  export interface Manager {
    id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    role: "admin" | "super_admin"
    status: "active" | "inactive" | "suspended"
    joinDate: string
    lastActive: string
    permissions: Permission[]
    assignedBy: string
    department?: string
    notes?: string
  }
  
  export interface Permission {
    id: string
    name: string
    description: string
    category: "users" | "content" | "analytics" | "system" | "financial"
    actions: PermissionAction[]
  }
  
  export interface PermissionAction {
    id: string
    name: string
    description: string
    type: "create" | "read" | "update" | "delete" | "manage"
  }
  
  export interface Role {
    id: string
    name: string
    description: string
    permissions: Permission[]
    isSystem: boolean
  }
  