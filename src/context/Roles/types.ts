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
  roles: Role[]
  pagination: RolesPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface RoleCreate {
  name: string
  scopes: Scope[]
  users: string[]
}

export interface Actions {
  getRoles: (
    params?: RolesPaginationParams & SearchParams & DateFilter
  ) => Promise<void>
  createRole: (payload: RoleCreate) => Promise<boolean>
  updateRole: (payload: Role) => Promise<boolean>
  deleteRole: (id: string) => Promise<boolean>
  toggleDisable: (id: string, enabled: boolean) => Promise<boolean>
  multipleDisable: (ids: string[], enabled: boolean) => Promise<boolean>
  exportTable: () => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
