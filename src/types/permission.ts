export interface Permission {
    id: string
    name: string
    category: string
    label: string
  }
  
  export interface PermissionCategory {
    [key: string]: {
      [action: string]: string
    }
  }
  
  export interface ManagerPermission {
    id: number
    name: string
    manager_id: number
  }
  