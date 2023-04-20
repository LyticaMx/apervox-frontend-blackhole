import {
  WorkgroupActions,
  WorkgroupState,
  WorkGroup,
  WorkGroupUser,
  Turn,
  WorkGroupTechnique,
  WorkGroupHistory,
  WorkgroupPaginationParams
} from 'types/workgroup'
import { Status } from 'types/status'
import { Priority } from 'types/priority'
import { DateFilter, PaginationFilter } from 'types/filters'
import { actions } from './constants'
import { initialState } from './context'
import useApi from 'hooks/useApi'
import { ResponseData, SearchParams } from 'types/api'

const orderByMapper = { registered_by: 'created_by', total_users: 'users' }

const useActions = (state: WorkgroupState, dispatch): WorkgroupActions => {
  const { workGroupsPagination, dateFilter, searchFilter } = state
  const getWorkgroupsService = useApi({ endpoint: 'groups', method: 'get' })
  const createWorkgroupService = useApi({ endpoint: 'groups', method: 'post' })
  const updateWorkGroupService = useApi({ endpoint: 'groups', method: 'put' })
  const deleteWorkGroupService = useApi({
    endpoint: 'groups',
    method: 'delete'
  })

  const getUsers = async (): Promise<boolean> => {
    try {
      const data = [
        {
          id: '001',
          name: 'Armando Albor'
        },
        {
          id: '002',
          name: 'Javier Albor'
        },
        {
          id: '003',
          name: 'Efraín Cuadras'
        }
      ]

      dispatch(actions.setUsers(data ?? initialState.users))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setUsers(initialState.users))

      return false
    }
  }

  const getTechniques = async (): Promise<boolean> => {
    try {
      const data = [
        {
          id: '001',
          name: 'T.i 23/2022-1'
        },
        {
          id: '002',
          name: 'T.i 23/2022-3'
        },
        {
          id: '003',
          name: 'T.i 20/2022-12'
        },
        {
          id: '004',
          name: 'T.i 125/2022-10'
        }
      ]

      dispatch(actions.setTechniques(data ?? initialState.techniques))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setTechniques(initialState.techniques))

      return false
    }
  }

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
    params?: WorkgroupPaginationParams & SearchParams & DateFilter
  ): Promise<void> => {
    try {
      const sort = { by: 'created_at', order: 'desc' }
      const mappedFilters = {}

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
      const response: ResponseData = await getWorkgroupsService({
        urlParams: {
          ...sort,
          ...mappedFilters,
          page: params?.page ?? workGroupsPagination.page,
          limit: params?.limit ?? workGroupsPagination.limit,
          start_time: params?.start_time ?? dateFilter.start_time,
          end_time: params?.end_time ?? dateFilter.end_time
        }
      })

      // para acceder a las funciones de array
      const data: any[] = response.data

      dispatch(
        actions.setWorkGroups(
          data.map<WorkGroup>((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            status: item.status,
            created_at: item.created_at,
            registered_by: item.created_by,
            userIds: item.users,
            total_users: item.users.length
          }))
        )
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
          query: params?.query ?? searchFilter.query,
          filters: params?.filters ?? searchFilter.filters
        })
      )

      dispatch(
        actions.setWorkGroupDateFilters({
          start_time: params?.start_time ?? dateFilter.start_time,
          end_time: params?.end_time ?? dateFilter.end_time
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const getWorkGroupUsers = async (
    id: string,
    params?: Partial<PaginationFilter>
  ): Promise<boolean> => {
    try {
      const mockedData = [
        {
          id: '001',
          name: 'Armando',
          surnames: 'Albor',
          username: 'armandoalbor',
          groups: '3',
          role: 'Administrator',
          status: Status.ACTIVE
        },
        {
          id: '002',
          name: 'Javier',
          surnames: 'Albor',
          username: 'javieralbor',
          groups: 'Todos',
          role: 'Administrator',
          status: Status.ACTIVE
        },
        {
          id: '003',
          name: 'Efraín',
          surnames: 'Cuadras',
          username: 'efracuadras',
          groups: '1',
          role: 'Administrator',
          status: Status.INACTIVE
        },
        {
          id: '004',
          name: 'Alfredo',
          surnames: 'González',
          username: 'alfredogonzalez',
          groups: '4',
          role: 'Administrator',
          status: Status.ACTIVE
        }
      ]

      let data: WorkGroupUser[] = []

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

      dispatch(actions.setWorkGroupUsers(data ?? initialState.associatedUsers))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setWorkGroupUsers(initialState.associatedUsers))

      return false
    }
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
      await updateWorkGroupService({
        queryString: workgroup.id ?? '',
        body: {
          name: workgroup.name ?? '',
          description: workgroup.description ?? ''
        }
      })

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
      await deleteWorkGroupService({
        queryString: id
      })

      return true
    } catch {
      return false
    }
  }

  return {
    getUsers,
    getTechniques,
    getHistory,
    getWorkGroups,
    getWorkGroupUsers,
    getWorkGroupTechniques,
    selectWorkGroup,
    createWorkGroup,
    updateWorkGroup,
    updateStatusWorkGroup,
    deleteWorkGroup
  }
}

export { useActions }
