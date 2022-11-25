import { Pagination } from './pagination'

export interface Permission {
  name: string
  action: string
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface RolesContextType {
  list: Role[]
  pagination: Pagination
  actions?: {
    getAll: () => Promise<boolean>
  }
}
