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
import { Params } from 'utils/ParamsBuilder'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'
import { DocumentType, RowsQuantity } from 'types/utils'
import useDownloadFile from 'hooks/useDownloadFile'
import { format } from 'date-fns'

const orderByMapper = {
  name: 'profile.names',
  createdBy: 'created_by.username',
  createdOn: 'created_at',
  lastName: 'profile.last_name',
  role: 'role.name'
}

export const useActions = (
  state: UserContextState,
  dispatch
): UserContextActions => {
  const {
    usersPagination,
    dateFilter,
    searchFilter,
    staticFilter,
    totalUsers
  } = state
  const getUsersService = useApi({ endpoint: 'users', method: 'get' })
  const createUserService = useApi({ endpoint: 'users', method: 'post' })
  const updateUserService = useApi({ endpoint: 'users', method: 'put' })
  const deleteUserService = useApi({ endpoint: 'users', method: 'delete' })
  const exportUsersService = useDownloadFile({
    endpoint: 'exports/users',
    method: 'get'
  })
  const deleteSessionsService = useApi({
    endpoint: 'sessions',
    method: 'delete'
  })
  const { actions: auditActions } = useModuleAudits()

  const getUsers = async (
    params?: UsersPaginationParams &
      SearchParams &
      DateFilter &
      UserStaticFilter,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...usersPagination, ...searchFilter })
        .sort(usersPagination.sort, orderByMapper)
        .putStaticFilter(
          'sessions',
          (params?.sessions ?? staticFilter.sessions)?.[0] === 'logged'
            ? true
            : params?.sessions?.[0] === 'not logged'
            ? false
            : undefined
        )
        .putStaticFilter(
          'status',
          (params?.status ?? staticFilter.status)?.[0] === 'enabled'
            ? true
            : params?.status?.[0] === 'disabled'
            ? false
            : undefined
        )
        .dates(dateFilter)
        .build()

      const [response, totalResponse] = await Promise.all([
        getUsersService({
          urlParams
        }),
        getTotal
          ? getUsersService({ urlParams: { page: 1, limit: 1 } })
          : Promise.resolve(null)
      ])

      if (params?.query && params?.filters) {
        try {
          await auditActions?.genAudit(
            ModuleAuditsTypes.AuditableModules.USERS,
            ModuleAuditsTypes.AuditableActions.SEARCH,
            `${params.filters?.[0]}:${params.query}`
          )
        } catch (e) {
          console.error(e)
        }
      }

      dispatch(
        actions.setUsers({
          data: response.data.map((item) => ({
            id: item.id,
            name: item.profile.names,
            lastName: item.profile.last_name,
            username: item.username,
            groups: item.groups,
            role: item.role?.name ?? '',
            roleId: item.role?.id ?? '',
            email: item.email,
            createdBy: item.created_by,
            sessions: item.sessions,
            status: item.status ? 'enabled' : 'disabled',
            createdOn: item.created_at,
            closeSession: item.close_session,
            phone: item.company?.phone_extension ?? '',
            position: item.company?.position ?? ''
          })),
          total: totalResponse?.size ?? totalUsers
        })
      )

      dispatch(
        actions.setUsersPagination({
          page: response.page,
          limit: params?.limit ?? usersPagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? usersPagination.sort
        })
      )

      dispatch(
        actions.setUsersFilters({
          search: {
            query: params?.query ?? searchFilter.query,
            filters: params?.filters ?? searchFilter.filters
          },
          date: {
            start_time: urlParams.start_time,
            end_time: urlParams.end_time
          },
          static: {
            sessions: params?.sessions ?? staticFilter.sessions,
            status: params?.status ?? staticFilter.status
          }
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
          groups: user.groupsIds,
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
          groups: user.groupsIds,
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
      const response: ResponseData = await deleteSessionsService({
        body: { users: ids }
      })

      return response.data.success
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

  const exportTable = async (
    exportType: DocumentType,
    quantity: RowsQuantity
  ): Promise<void> => {
    try {
      const params = quantity === 'full' ? { limit: -1 } : {}
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...usersPagination, ...searchFilter })
        .sort(usersPagination.sort, orderByMapper)
        .putStaticFilter(
          'sessions',
          staticFilter.sessions?.[0] === 'logged'
            ? true
            : staticFilter.sessions?.[0] === 'not logged'
            ? false
            : undefined
        )
        .putStaticFilter(
          'status',
          staticFilter.status?.[0] === 'enabled'
            ? true
            : staticFilter.sessions?.[0] === 'disabled'
            ? false
            : undefined
        )
        .dates(dateFilter)
        .build()
      await exportUsersService(
        `users_${format(new Date(), 'ddMMyyyy_HHmmss')}`,
        {
          urlParams: { ...urlParams, export_type: exportType }
        }
      )
    } catch (e) {
      console.error(e)
    }
  }

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
