import { AuthContext } from '../Auth/context'
import { LoaderContext } from '../Loader/LoaderContext'
import { UserContext } from '../Users/context'
import { WorkGroupsContext } from '../WorkGroups/context'
import { RoleContext } from '../Roles/context'

export const appContext = {
  /* Reusable component */
  loader: LoaderContext,

  /* Modules */
  auth: AuthContext,
  users: UserContext,
  workgroups: WorkGroupsContext,
  roles: RoleContext
}
