import { Dependency } from './dependency'
import { User } from './user'

export interface AdminContextType {
  users: User[]
  usersRequests: User[]
  dependencies: Dependency[]
  dependencyUsers: User[]
}
