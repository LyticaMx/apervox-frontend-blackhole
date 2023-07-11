export type Resource =
  | 'me'
  | 'sessions'
  | 'techniques'
  | 'groups'
  | 'users'
  | 'roles'
  | 'carriers'
  | 'acquisition_mediums'
  | 'devices'
  | 'settings'
  | 'labels'
  | 'letterheads'
  | 'overflow_lines'
  | 'verification_lines'
  | 'targets'
  | 'target_metadatas'

export interface Scope {
  name: Resource
  create?: boolean
  read?: boolean
  update?: boolean
  delete?: boolean
  export?: boolean
}
