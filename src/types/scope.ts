export type Resource =
  | 'me'
  | 'users'
  | 'sessions'
  | 'roles'
  | 'groups'
  | 'techniques'

export interface Scope {
  name: Resource
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  export: boolean
}
