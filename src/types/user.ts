import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationFilter, SearchFilter } from './filters'
import { PaginationParams, SearchParams } from './api'
import { DocumentType, RowsQuantity } from './utils'

export interface UserGroup {
  name: string
  id: string
}
export interface User {
  name: string
  lastName: string
  username: string
  groups?: UserGroup[]
  groupsIds?: string[]
  role?: string
  roleId?: string
  id?: string
  email?: string
  phone?: string
  position?: string
  sessions?: number
  status?: 'enabled' | 'disabled' | 'banned'
  createdBy?: string
  createdOn?: string
  closeSession?: boolean
}

export interface UsersPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface UsersPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface UserStaticFilter {
  sessions?: string[]
  status?: string[]
}

export interface UserContextState {
  listOfUsers: User[]
  totalUsers: number
  usersPagination: UsersPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: UserStaticFilter
}

export interface UserContextActions {
  getUsers: (
    params?: UsersPaginationParams &
      SearchParams &
      DateFilter &
      UserStaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  createUser: (user: User) => Promise<boolean>
  updateUser: (user: User) => Promise<boolean>
  deleteUser: (id: string) => Promise<boolean>
  deleteUsers: (ids: string[]) => Promise<boolean>
  toggleDisable: (id: string, enabled: boolean) => Promise<boolean>
  multipleDisable: (ids: string[], enabled: boolean) => Promise<boolean>
  closeSession: (id: string) => Promise<boolean>
  closeMultipleSessions: (ids: string[]) => Promise<boolean>
  resetPassword: (id: string) => Promise<string>
  exportTable: (
    exportType: DocumentType,
    quantity: RowsQuantity
  ) => Promise<void>
}

export interface UserContextType extends UserContextState {
  actions?: UserContextActions
}
