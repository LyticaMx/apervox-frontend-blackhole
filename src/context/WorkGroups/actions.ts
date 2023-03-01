import { sortBy } from 'lodash'
import { SortingState } from '@tanstack/react-table'
import {
  Actions,
  State,
  WorkGroup,
  WorkGroupUser,
  Turn,
  WorkGroupTechnique
} from 'types/workgroup'
import { Status } from 'types/status'
import { Priority } from 'types/priority'
import { PaginationFilter } from 'types/filters'
import { actions } from './constants'
import { initialState } from './context'
// import { useServices } from './services'

// getUsers: () => Promise<boolean>
// getTechniques: () => Promise<boolean>
// getHistory: () => Promise<boolean>
// getWorkGroups: (params?: Partial<PaginationFilter>) => Promise<boolean>
// getWorkGroupUsers: (params?: Partial<PaginationFilter>) => Promise<boolean>
// getWorkGroupTechniques: (
//   params?: Partial<PaginationFilter>
// ) => Promise<boolean>
// updateStatusWorkGroup: (id: string, active: boolean) => Promise<boolean>
// deleteWorkGroup: (id: string) => Promise<boolean>
// deleteUserOfWorkGroup: (id: string) => Promise<boolean>
// deleteTechniqueOfWorkGroup: (id: string) => Promise<boolean>
// createWorkgroup: (params: WorkGroup) => Promise<boolean>
// updateWorkgroup: (params: WorkGroup) => Promise<boolean>

const useActions = (state: State, dispatch): Actions => {
  // const services = useServices()

  const getUsers = async (): Promise<boolean> => {
    try {
      const data = [
        {
          id: '001',
          value: 'Armando Albor'
        },
        {
          id: '002',
          value: 'Javier Albor'
        },
        {
          id: '003',
          value: 'Efraín Cuadras'
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
          value: 'T.i 23/2022-1'
        },
        {
          id: '002',
          value: 'T.i 23/2022-3'
        },
        {
          id: '003',
          value: 'T.i 20/2022-12'
        },
        {
          id: '004',
          value: 'T.i 125/2022-10'
        }
      ]

      dispatch(actions.setTechniques(data ?? initialState.techniques))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setTechniques(initialState.techniques))

      return false
    }
  }

  const getHistory = async (): Promise<boolean> => {
    try {
      const data = [
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

      dispatch(actions.setHistory(data ?? initialState.history))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setHistory(initialState.history))

      return false
    }
  }

  const getWorkGroups = async (filters?: SortingState): Promise<boolean> => {
    try {
      const data = [
        {
          id: '001',
          name: 'Grupo 1',
          description: 'Monitoreo de datos',
          registered_by: 'armandoalbor',
          total_users: 3,
          created_at: new Date().toISOString(),
          updated_at: '',
          techniques: {
            assigned: 7,
            current: 2,
            to_conclude: 3,
            concluded: 1
          },
          status: Status.ACTIVE
        },
        {
          id: '002',
          name: 'Grupo 2',
          description: 'Gestión de datos',
          registered_by: 'armandoalbor',
          total_users: 2,
          created_at: new Date().toISOString(),
          updated_at: '',
          techniques: {
            assigned: 2,
            current: 1,
            to_conclude: 1,
            concluded: 0
          },
          status: Status.ACTIVE
        },
        {
          id: '003',
          name: 'Auditoria',
          description: 'Auditoria de datos',
          registered_by: 'efracuadras',
          total_users: 13,
          created_at: new Date().toISOString(),
          updated_at: '',
          techniques: {
            assigned: 10,
            current: 7,
            to_conclude: 1,
            concluded: 2
          },
          status: Status.INACTIVE
        },
        {
          id: '004',
          name: 'Criminología',
          description: 'Redes criminales',
          registered_by: 'javieralbor',
          total_users: 23,
          created_at: new Date().toISOString(),
          updated_at: '',
          techniques: {
            assigned: 12,
            current: 6,
            to_conclude: 1,
            concluded: 5
          },
          status: Status.ACTIVE
        }
      ]

      let sorteredData = data

      if (filters && filters.length > 0) {
        sorteredData = filters[0].desc
          ? sortBy(data, [filters[0].id]).reverse()
          : sortBy(data, [filters[0].id])
      }

      dispatch(actions.setWorkGroups(sorteredData ?? initialState.workGroups))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setWorkGroups(initialState.workGroups))

      return false
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

  return {
    getUsers,
    getTechniques,
    getHistory,
    getWorkGroups,
    getWorkGroupUsers,
    getWorkGroupTechniques,
    selectWorkGroup
  }
}

export { useActions }
