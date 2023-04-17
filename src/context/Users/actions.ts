import useApi from 'hooks/useApi'
import { ResponseData, SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import {
  User,
  UserContextActions,
  UserContextState,
  UserStaticFilter,
  UsersPaginationParams
} from 'types/user'
import { actions } from './constants'

const orderByMapper = {
  name: 'names',
  createdBy: 'created_by',
  createdOn: 'created_at',
  lastName: 'last_name'
}

export const useActions = (
  state: UserContextState,
  dispatch
): UserContextActions => {
  const { usersPagination, dateFilter, searchFilter } = state
  const getUsersService = useApi({ endpoint: 'users', method: 'get' })
  const createUserService = useApi({ endpoint: 'users', method: 'post' })
  const updateUserService = useApi({ endpoint: 'users', method: 'put' })
  const deleteUserService = useApi({ endpoint: 'users', method: 'delete' })

  const getUsers = async (
    params?: UsersPaginationParams &
      SearchParams &
      DateFilter &
      UserStaticFilter
  ): Promise<void> => {
    try {
      const sort = {
        by: 'created_at',
        order: 'desc'
      }

      const mappedFilters: {
        sessions?: boolean
        status?: boolean
      } = {}

      if (params?.sort && params.sort.length > 0) {
        const [sortBy] = params.sort
        sort.by = orderByMapper[sortBy.id] ?? sortBy.id
        sort.order = sortBy.desc ? 'desc' : 'asc'
      }

      const query = params?.query ?? searchFilter.query
      const filters = params?.filters ?? searchFilter.filters

      if (filters && filters.length > 0 && query) {
        Object.assign(
          mappedFilters,
          filters.reduce((old, key) => {
            old[key] = query
            return old
          }, {})
        )
      }

      mappedFilters.sessions =
        params?.sessions?.[0] === 'logged'
          ? true
          : params?.sessions?.[0] === 'not logged'
          ? false
          : undefined

      mappedFilters.status =
        params?.status?.[0] === 'enabled'
          ? true
          : params?.status?.[0] === 'disabled'
          ? false
          : undefined

      // TODO: cambiar el response data
      const response: ResponseData = await getUsersService({
        urlParams: {
          ...sort,
          ...mappedFilters,
          page: params?.page ?? usersPagination.page,
          limit: params?.limit ?? usersPagination.limit,
          start_time: params?.start_time ?? dateFilter.start_time,
          end_time: params?.end_time ?? dateFilter.end_time
        }
      })

      dispatch(
        actions.setUsers(
          response.data.map((item) => ({
            id: item.id,
            name: item.profile.names,
            lastName: item.profile.last_name,
            username: item.username,
            groups: item.groups,
            role: item.role.name,
            roleId: item.role.id,
            email: item.email,
            createdBy: item.created_by,
            sessions: item.sessions,
            status: item.status ? 'enabled' : 'disabled',
            createdOn: item.created_at,
            closeSession: item.close_session,
            phone: item.company?.phone_extension ?? '',
            position: item.company?.position ?? ''
          }))
        )
      )

      dispatch(
        actions.setUsersPagination({
          page: response.page,
          limit: params?.limit ?? usersPagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? usersPagination.sort
        })
      )

      // TODO: Revisar como condicionar estos dispatch o reducirlos
      dispatch(
        actions.setUsersFilters({
          query: params?.query ?? searchFilter.query,
          filters: params?.filters ?? searchFilter.filters
        })
      )

      dispatch(
        actions.setDateFilters({
          start_time: params?.start_time ?? dateFilter.start_time,
          end_time: params?.end_time ?? dateFilter.end_time
        })
      )
    } catch (e) {
      console.error(e)
    }
  }

  const createUser = async (user: User): Promise<boolean> => {
    try {
      await createUserService({
        body: {
          username: user.username,
          email: user.email ?? '',
          profile: {
            names: user.name,
            last_name: user.lastName
          },
          company: {
            phone_extension: user.phone,
            position: user.position
          },
          group_ids: user.groups,
          role_id: user.roleId,
          close_session: user.closeSession ?? true
        }
      })

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const updateUser = async (user: User): Promise<boolean> => {
    try {
      await updateUserService({
        queryString: user.id,
        body: {
          username: user.username,
          email: user.email ?? '',
          profile: {
            names: user.name,
            last_name: user.lastName
          },
          company: {
            phone_extension: user.phone,
            position: user.position
          },
          group_ids: user.groups,
          role_id: user.roleId,
          close_session: user.closeSession ?? true
        }
      })
      return true
    } catch {
      return false
    }
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      await deleteUserService({
        queryString: id
      })
      return true
    } catch {
      return false
    }
  }

  const deleteUsers = async (ids: string[]): Promise<boolean> => {
    try {
      await deleteUserService({
        body: { ids }
      })
      return true
    } catch {
      return false
    }
  }

  const toggleDisable = async (
    id: string,
    enabled: boolean
  ): Promise<boolean> => {
    try {
      await updateUserService({
        queryString: id,
        body: {
          status: enabled
        }
      })

      return true
    } catch {
      return false
    }
  }

  const multipleDisable = async (
    ids: string[],
    enabled = false
  ): Promise<boolean> => {
    try {
      await updateUserService({
        body: {
          ids,
          payload: {
            status: enabled
          }
        }
      })
      return true
    } catch {
      return false
    }
  }

  const closeSession = async (id: string): Promise<boolean> => {
    try {
      await deleteUserService({
        queryString: `${id}/sessions`
      })
      return true
    } catch {
      return false
    }
  }

  const closeMultipleSessions = async (ids: string[]): Promise<boolean> => {
    try {
      return !(
        await Promise.all(
          ids.map(async (id): Promise<boolean> => await closeSession(id))
        )
      ).some((item) => !item)
    } catch {
      return false
    }
  }

  const resetPassword = async (id: string): Promise<string> => {
    try {
      const response: ResponseData = await updateUserService({
        queryString: `${id}/password-reset`
      })

      return response.data.password
    } catch {
      return ''
    }
  }

  const exportTable = async (): Promise<void> => {}

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    deleteUsers,
    toggleDisable,
    multipleDisable,
    closeSession,
    closeMultipleSessions,
    resetPassword,
    exportTable
  }
}
