import { Chunk } from './pin'

export enum Role {
  SUPER_ADMIN,
  ADMIN,
  READER,
  WRITER
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
  // profile Profile?
  password_changed: boolean
  dependency: Dependency
  dependency_id: string
  role: Role
  chunks: Chunk[]
}
export interface Profile {
  id: string
  first_name: string
  fathers_name: string
  mothers_name: string
  // user User @relation(fields: [user_id] ,references:[id])
  user_id: string
}

export interface Dependency {
  id: string
  name: string
  users: User[]
}
