import Permission from "./permission"

interface Manager {
    id: number
    name: string
    username: string
    password?: string
    email: string | null
    last_login: string | null
    created_at: string | null
    updated_at: string | null
    role: 'admin' | 'super_admin'
    permissions: Array<Permission>
}

export default Manager
