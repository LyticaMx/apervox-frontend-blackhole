import {
  Actions,
  Dependency,
  EjectUserParams,
  LinkUsersParams,
  State,
  StoreDependencyParams,
  UpdateDependencyParams
} from 'types/dependency'
import { PaginationFilter } from 'types/filters'
import { actions } from './constants'
import { initialState } from './context'
import { useServices } from './services'

const useActions = (state: State, dispatch): Actions => {
  const services = useServices()

  const getUsers = async (): Promise<boolean> => {
    try {
      const data = await services.getUsers({
        urlParams: {
          page: 1,
          limit: 100
        }
      })

      dispatch(actions.setUsers(data.data ?? initialState.users))

      return Boolean(data.data)
    } catch (error) {
      dispatch(actions.setUsers(initialState.users))
      return false as any
    }
  }

  const setDependency = async (params?: Dependency): Promise<void> => {
    dispatch(actions.setDependency(params))
  }

  const getDependencies = async (
    params?: Partial<PaginationFilter>
  ): Promise<boolean> => {
    try {
      const data = await services.getDependencies({
        urlParams: {
          page: params?.page ?? state.usersPagination.page,
          limit: params?.limit ?? state.usersPagination.limit,

          verbose: true
        }
      })

      const newData = data.data ?? initialState.dependencies

      dispatch(actions.setDependencies(newData))
      dispatch(
        actions.setDependenciesPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.dependenciesPagination.limit,
          totalRecords: data.page_info.total_records
        })
      )

      if (state.dependency) {
        setDependency(newData.find((item) => item.id === state?.dependency?.id))
      }

      return Boolean(data.data)
    } catch (error) {
      dispatch(actions.setDependencies(initialState.dependencies))
      return false
    }
  }

  const storeDependency = async (
    body: StoreDependencyParams
  ): Promise<boolean> => {
    try {
      const data = await services.dependency.post({
        body: {
          name: body.name,
          user_id_list: body.users_ids
        }
      })

      await getDependencies()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }
  const updateDependency = async (
    body: UpdateDependencyParams
  ): Promise<boolean> => {
    try {
      const data = await services.dependency.put({
        urlParams: { id: body.dependency_id },
        body: { name: body.name, user_id_list: body.users_ids }
      })

      await getDependencies()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }
  const deleteDependency = async (id: string): Promise<boolean> => {
    try {
      const data = await services.dependency.delete({ urlParams: { id } })

      await getDependencies()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }

  const ejectUser = async (params: EjectUserParams): Promise<boolean> => {
    try {
      const data = await services.ejectUser({
        urlParams: {
          id: params.user_id
        }
      })

      await getDependencies()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }

  const linkUsers = async (body: LinkUsersParams): Promise<boolean> => {
    try {
      const data = await services.dependency.put({
        urlParams: { id: body.dependency_id },
        body: { user_id_list: body.users_ids }
      })

      await getDependencies()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }

  return {
    getUsers,
    getDependencies,
    setDependency,
    storeDependency,
    updateDependency,
    deleteDependency,
    ejectUser,
    linkUsers
  }
}

export { useActions }
