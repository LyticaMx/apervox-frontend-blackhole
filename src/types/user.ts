import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationFilter, SearchFilter } from './filters'
import { PaginationParams, SearchParams } from './api'

export interface User {
  name: string
  lastName: string
  username: string
  groups: string[]
  role: string
  id?: string
  sessions?: number
  status?: 'enabled' | 'disabled'
  createdBy?: string
  createdOn?: string
}

export interface UsersPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface UserContextState {
  listOfUsers: User[]
  usersPagination: UsersPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface UserContextActions {
  getUsers: (params?: PaginationParams & SearchParams) => Promise<void>
  createUser: (user: User) => Promise<boolean>
  updateUser: (user: User) => Promise<boolean>
  deleteUser: (id: string) => Promise<boolean>
  toggleDisable: (id: string) => Promise<boolean>
  closeSession: (id: string) => Promise<boolean>
  exportTable: () => Promise<void>
}

export interface UserContextType extends UserContextState {
  actions?: UserContextActions
}
