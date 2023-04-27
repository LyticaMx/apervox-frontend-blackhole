import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'
import { PaginationParams, SearchParams } from 'types/api'
import { Role } from 'types/auth'
import { Scope } from 'types/scope'

export interface RolesPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface RolesPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface State {
  data: Role[]
  total: number
  pagination: RolesPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface PayloadCreate {
  name: string
  scopes: Scope[]
  users: string[]
}
export interface PayloadUpdate {
  id: string
  name: string
  scopes: Scope[]
  users: {
    connect: string[]
    disconnect: string[]
  }
}

export interface Actions {
  getData: (
    params?: RolesPaginationParams & SearchParams & DateFilter
  ) => Promise<void>
  create: (payload: PayloadCreate) => Promise<boolean>
  update: (payload: PayloadUpdate) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  toggleStatus: (id: string, enabled: boolean) => Promise<boolean>
  getScopes: (id: string) => Promise<Scope[]>
  exportTable: () => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
