import {
  WorkgroupActions,
  WorkgroupState,
  WorkGroup,
  WorkGroupUser,
  Turn,
  WorkGroupTechnique,
  WorkGroupHistory,
  WorkgroupPaginationParams,
  WorkgroupStaticFilter
} from 'types/workgroup'
import { Status } from 'types/status'
import { Priority } from 'types/priority'
import { DateFilter, PaginationFilter } from 'types/filters'
import { actions } from './constants'
import { initialState } from './context'
import useApi from 'hooks/useApi'
import { ResponseData, SearchParams } from 'types/api'
import { Params } from 'utils/ParamsBuilder'

const orderByMapper = {
  registered_by: 'created_by.username',
  total_users: 'users'
}
const orderByMapperUsers = {
  name: 'profile.names',
  surnames: 'profile.last_name',
  role: 'role.name'
}

const useActions = (state: WorkgroupState, dispatch): WorkgroupActions => {
  const {
    workGroupsPagination,
    dateFilter,
    searchFilter,
    selected,
    usersPagination,
    staticFilter,
    totalWorkGroups
  } = state
  const getWorkgroupsService = useApi({ endpoint: 'groups', method: 'get' })
  const createWorkgroupService = useApi({ endpoint: 'groups', method: 'post' })
  const updateWorkGroupService = useApi({ endpoint: 'groups', method: 'put' })
  const deleteWorkGroupService = useApi({
    endpoint: 'groups',
    method: 'delete'
  })

  const getHistory = async (id: string): Promise<boolean> => {
    try {
      const mockedData = [
        {
          id: '001',
          action: 'Usuario agregado',
          description:
            'Se agrego el usuario (i.dominguez) al grupo de trabajo.',
          user: 'armandoalbor',
          created_at: new Date().toISOString()
        },
        {
          id: '002',
          action: 'Técnica agregada',
          description:
            'Se agrego la técnica (T1.23/2022-2) al grupo de trabajo.',
          user: 'efracuadras',
          created_at: new Date().toISOString()
        },
        {
          id: '003',
          action: 'Cambio de nombre',
          description:
            'Se cambio el nombre del grupo de trabajo (grupo10) por el de (Auditoria).',
          user: 'javieralbor',
          created_at: new Date().toISOString()
        },
        {
          id: '004',
          action: 'Eliminación de usuario',
          description: 'Se removió al usuario (d.olvera) del grupo de trabajo.',
          user: 'armandoalbor',
          created_at: new Date().toISOString()
        }
      ]

      let data: WorkGroupHistory[] = []

      if (id === '001') {
        data = [...mockedData]
      }

      if (id === '003') {
        data.push(mockedData[1])
        data.push(mockedData[3])
      }

      if (id === '004') {
        data.push(mockedData[1])
        data.push(mockedData[2])
        data.push(mockedData[3])
      }

      dispatch(actions.setHistory(data ?? initialState.history))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setHistory(initialState.history))

      return false
    }
  }

  const getWorkGroups = async (
    params?: WorkgroupPaginationParams &
      SearchParams &
      DateFilter &
      WorkgroupStaticFilter,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...searchFilter, ...workGroupsPagination })
        .sort(workGroupsPagination.sort, orderByMapper)
        .dates(dateFilter)
        .putManyStaticFilters({
          has_techniques:
            (params?.hasTechniques ?? staticFilter.hasTechniques)?.[0] === 'yes'
              ? true
              : params?.hasTechniques?.[0] === 'no'
              ? false
              : undefined,
          has_users:
            (params?.hasUsers ?? staticFilter.hasUsers)?.[0] === 'yes'
              ? true
              : params?.hasUsers?.[0] === 'no'
              ? false
              : undefined,
          status:
            (params?.status ?? staticFilter.status)?.[0] === 'enabled'
              ? true
              : params?.status?.[0] === 'disabled'
              ? false
              : undefined
        })
        .build()

      const [response, totalResponse] = await Promise.all([
        getWorkgroupsService({
          urlParams
        }),
        getTotal
          ? getWorkgroupsService({ urlParams: { page: 1, limit: 1 } })
          : Promise.resolve(null)
      ])

      // para acceder a las funciones de array
      const data: any[] = response.data

      dispatch(
        actions.setWorkGroups({
          data: data.map<WorkGroup>((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            status: item.status,
            created_at: item.created_at,
            registered_by: item.created_by,
            users: item.users,
            total_users: item.users.length
          })),
          total: totalResponse?.size ?? totalWorkGroups
        })
      )

      // Reducir estos dispatch
      dispatch(
        actions.setWorkGroupPagination({
          page: response.page,
          limit: params?.limit ?? workGroupsPagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? workGroupsPagination.sort
        })
      )

      dispatch(
        actions.setWorkGroupFilters({
          search: {
            query: params?.query ?? searchFilter.query,
            filters: params?.filters ?? searchFilter.filters
          },
          date: {
            start_time: urlParams.start_time,
            end_time: urlParams.end_time
          },
          static: {
            hasTechniques: params?.hasTechniques ?? staticFilter.hasTechniques,
            hasUsers: params?.hasUsers ?? staticFilter.hasUsers,
            status: params?.status ?? staticFilter.status
          }
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const getWorkGroupUsers = async (
    params?: WorkgroupPaginationParams & SearchParams
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .pagination(usersPagination)
        .sort(usersPagination.sort, orderByMapperUsers)
        .build()
      const response = await getWorkgroupsService({
        queryString: `${selected.id}/users`,
        urlParams
      })

      const list: any[] = response.data

      dispatch(
        actions.setWorkGroupUsers(
          list.map<WorkGroupUser>((datum) => ({
            id: datum.id,
            groups: datum.groups.map((item) => item.name),
            name: datum.profile.names,
            surnames: datum.profile.last_name,
            role: datum.role.name,
            status: datum.status ? Status.ACTIVE : Status.INACTIVE,
            username: datum.username
          }))
        )
      )

      dispatch(
        actions.setWorkGroupUsersPagination({
          page: response.page,
          limit: params?.limit ?? usersPagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? usersPagination.sort
        })
      )
    } catch (error) {}
  }

  const getWorkGroupTechniques = async (
    id: string,
    params?: Partial<PaginationFilter>
  ): Promise<boolean> => {
    try {
      const mockedData = [
        {
          id: '001',
          name: 'T1.23/2022-30',
          created_at: new Date().toISOString(),
          expires_at: new Date(
            Date.now() + 2 * (3600 * 1000 * 24)
          ).toISOString(),
          registered_by: 'armandoalbor',
          time_on_platform: '1 día',
          total_objective: 3,
          priority: Priority.HIGH,
          turn_of_attention: Turn.MORNING,
          status: Status.TO_COMPLETE
        },
        {
          id: '002',
          name: 'T1.23/2022-2',
          created_at: new Date().toISOString(),
          expires_at: new Date(
            Date.now() + 6 * (3600 * 1000 * 24)
          ).toISOString(),
          registered_by: 'armandoalbor',
          time_on_platform: '25 días',
          total_objective: 24,
          priority: Priority.HIGH,
          turn_of_attention: Turn.EVENING,
          status: Status.TO_COMPLETE
        },
        {
          id: '003',
          name: 'T1.24/2022-23',
          created_at: new Date().toISOString(),
          expires_at: new Date(
            Date.now() + 4 * (3600 * 1000 * 24)
          ).toISOString(),
          registered_by: 'efracuadras',
          time_on_platform: '10 días',
          total_objective: 10,
          priority: Priority.LOW,
          turn_of_attention: Turn.NIGHTNING,
          status: Status.CURRENT
        },
        {
          id: '004',
          name: 'T1.20/2022-4',
          created_at: new Date().toISOString(),
          expires_at: new Date(
            Date.now() + 1 * (3600 * 1000 * 24)
          ).toISOString(),
          registered_by: 'javieralbor',
          time_on_platform: '1 mes',
          total_objective: 20,
          priority: Priority.LOW,
          turn_of_attention: Turn.EVENING,
          status: Status.CURRENT
        },
        {
          id: '005',
          name: 'T1.18/2022-16',
          created_at: new Date().toISOString(),
          expires_at: new Date(
            Date.now() + 16 * (3600 * 1000 * 24)
          ).toISOString(),
          registered_by: 'alfredogonzalez',
          time_on_platform: '12 días',
          total_objective: 44,
          priority: Priority.MEDIUM,
          turn_of_attention: Turn.MORNING,
          status: Status.COMPLETED
        }
      ]

      let data: WorkGroupTechnique[] = []

      if (id === '001') {
        data = [...mockedData]
      }

      if (id === '003') {
        data.push(mockedData[1])
        data.push(mockedData[3])
        data.push(mockedData[4])
      }

      if (id === '004') {
        data.push(mockedData[1])
        data.push(mockedData[2])
        data.push(mockedData[3])
        data.push(mockedData[4])
      }

      dispatch(
        actions.setWorkGroupTechniques(
          data ?? initialState.associatedTechniques
        )
      )

      return Boolean(data)
    } catch (error) {
      dispatch(
        actions.setWorkGroupTechniques(initialState.associatedTechniques)
      )

      return false
    }
  }

  const selectWorkGroup = async (workGroup?: WorkGroup): Promise<boolean> => {
    try {
      dispatch(actions.setSelectedWorkGroup(workGroup ?? initialState.selected))

      return Boolean(workGroup)
    } catch (error) {
      dispatch(actions.setSelectedWorkGroup(initialState.selected))

      return false
    }
  }

  const createWorkGroup = async (workgroup: WorkGroup): Promise<boolean> => {
    try {
      await createWorkgroupService({
        body: {
          name: workgroup.name,
          description: workgroup.description,
          users: workgroup.userIds,
          techniques: workgroup.techniques
        }
      })

      return true
    } catch {
      return false
    }
  }

  const updateWorkGroup = async (workgroup: WorkGroup): Promise<boolean> => {
    try {
      if (selected.id === '') return false
      await updateWorkGroupService({
        queryString: workgroup.id ?? '',
        body: {
          name: workgroup.name ?? '',
          description: workgroup.description ?? ''
        }
      })

      const members = selected.users?.map((user) => user.id) ?? []
      const newMembers = workgroup.userIds ?? []

      const membersAction = {
        connect: newMembers.filter((user) => !members.includes(user)),
        disconnect: members.filter((user) => !newMembers.includes(user))
      }

      const response = await updateWorkGroupService({
        queryString: `${selected.id}/users`,
        body: membersAction
      })

      dispatch(actions.setSelectedWorkGroup(response.data))

      return true
    } catch {
      return false
    }
  }

  const deleteUsersOfWorkGroup = async (ids: string[]): Promise<boolean> => {
    try {
      if (selected.id === '') return false

      const response = await updateWorkGroupService({
        queryString: `${selected.id}/users`,
        body: {
          disconnect: ids
        }
      })

      actions.setSelectedWorkGroup(response.data)

      return true
    } catch {
      return false
    }
  }

  const updateStatusWorkGroup = async (
    id: string,
    status: boolean
  ): Promise<boolean> => {
    try {
      await updateWorkGroupService({
        queryString: id,
        body: {
          status
        }
      })

      return true
    } catch {
      return false
    }
  }

  const deleteWorkGroup = async (id: string): Promise<boolean> => {
    try {
      if (selected.id === id) actions.setSelectedWorkGroup()
      await deleteWorkGroupService({
        queryString: id
      })

      return true
    } catch {
      return false
    }
  }

  const deleteWorkGroups = async (ids: string[]): Promise<boolean> => {
    try {
      await deleteWorkGroupService({
        body: { ids }
      })

      return true
    } catch {
      return false
    }
  }

  const toggleDisableWorkGroups = async (
    ids: string[],
    disable?: boolean
  ): Promise<boolean> => {
    try {
      const response: ResponseData = await updateWorkGroupService({
        body: {
          ids,
          payload: { status: disable }
        }
      })

      return response.data.success ?? true
    } catch {
      return false
    }
  }

  return {
    getHistory,
    getWorkGroups,
    getWorkGroupUsers,
    getWorkGroupTechniques,
    selectWorkGroup,
    createWorkGroup,
    updateWorkGroup,
    updateStatusWorkGroup,
    deleteWorkGroup,
    deleteUsersOfWorkGroup,
    deleteWorkGroups,
    toggleDisableWorkGroups
  }
}

export { useActions }
