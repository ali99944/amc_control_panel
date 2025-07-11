import { ManagerPermission } from "./permission"

export interface Manager {
  id: number
  name: string
  username: string
  role: 'admin' | 'super_admin'
  manager_permissions: ManagerPermission[]
  is_active: boolean
  created_at: string
  updated_at: string | null
  last_login: string | null
  profile_picture?: string | null
}

export interface CreateManagerData {
  name: string
  username: string
  // role: 'admin' | 'super_admin'
  password: string
  permissions: string[]
}

export interface UpdateManagerData {
  name: string
  username: string
  // role: 'admin' | 'super_admin'
  permissions: string[]
}

export interface ManagerPermissionsData {
  permissions: string[]
}
