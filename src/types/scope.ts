export type Resource =
  | 'me'
  | 'users'
  | 'sessions'
  | 'roles'
  | 'groups'
  | 'techniques'
  | 'overflow_lines'

export interface Scope {
  name: Resource
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  export: boolean
}
