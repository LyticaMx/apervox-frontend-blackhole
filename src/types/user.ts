import { Dependency } from './dependency'
import { PaginationFilter } from './filters'
import { Chunk } from './pin'

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  READER = 'READER',
  WRITER = 'WRITER'
}
export interface User {
  id: string
  approved_by_id?: string
  approved_by: User
  approved_users: User[]
  accepted?: boolean
  active: boolean
  email: string
  password: string
  profile?: Profile
  password_changed: boolean
  dependency: Dependency
  dependency_id: string
  role: Role
  chunks: Chunk[]
}
export interface UserRequest {
  id: string
  accepted?: boolean
  active: boolean
  email: string
  profile?: Profile
}
export interface Profile {
  id: string
  first_name: string
  fathers_name: string
  mothers_name: string
  user_id: string
}

export interface UsersSummary {
  total_users: number
  total_requests: number
  total_blocked: number
}

export interface AcceptUserParams {
  dependency_id: string
  user_id: string
  role: Role
}

export interface UpdateUserParams {
  active: boolean
  user_id: string
  role: Role
}

export interface Pagination extends Partial<PaginationFilter> {
  totalRecords?: number
}

export interface State {
  dependencies: Dependency[]
  summary: UsersSummary
  users: User[]
  usersRequests: UserRequest[]
  usersPagination: {
    limit: number
    page: number
    totalRecords: number
  }
  requestsPagination: {
    limit: number
    page: number
    totalRecords: number
  }
}

export interface Actions {
  getDependencies: () => Promise<boolean>
  getSummary: () => Promise<boolean>
  getRequests: (params?: Partial<PaginationFilter>) => Promise<boolean>
  getUsers: (params?: Partial<PaginationFilter>) => Promise<boolean>
  rejectUser: (id: string) => Promise<boolean>
  acceptUser: (params: AcceptUserParams) => Promise<boolean>
  updateUser: (params: UpdateUserParams) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
