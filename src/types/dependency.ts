import { PaginationFilter } from './filters'
import { User } from './user'

export interface Dependency {
  id: string
  name: string
  users?: User[]
}

export interface StoreDependencyParams {
  name: string
  users_ids: string[]
}
export interface UpdateDependencyParams {
  dependency_id: string
  name: string
  users_ids: string
}

export interface LinkUsersParams {
  dependency_id: string
  users_ids: string[]
}
export interface EjectUserParams {
  user_id: string
  dependency_id: string
}

export interface State {
  dependencies: Dependency[]
  dependency?: Dependency
  users: User[]
  usersPagination: {
    limit: number
    page: number
    totalRecords: number
  }
  dependenciesPagination: {
    limit: number
    page: number
    totalRecords: number
  }
}

export interface Actions {
  getUsers: () => Promise<boolean>
  getDependencies: (params?: Partial<PaginationFilter>) => Promise<boolean>
  setDependency: (params?: Dependency) => Promise<void>
  storeDependency: (body: StoreDependencyParams) => Promise<boolean>
  updateDependency: (body: UpdateDependencyParams) => Promise<boolean>
  deleteDependency: (id: string) => Promise<boolean>
  ejectUser: (body: EjectUserParams) => Promise<boolean>
  linkUsers: (body: LinkUsersParams) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
