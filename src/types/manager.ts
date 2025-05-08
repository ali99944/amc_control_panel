import Permission from "./permission"

interface Manager {
    id: number
    name: string
    username: string

    role: 'admin' | 'super_admin'
    permissions: Array<Permission>
}

export default Manager