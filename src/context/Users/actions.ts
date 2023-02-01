import { AcceptUserParams, Actions, State, UpdateUserParams } from 'types/user'
import { actions } from './constants'
import { initialState } from './context'
import { useServices } from './services'

const useActions = (state: State, dispatch): Actions => {
  const services = useServices()

  const getDependencies = async (): Promise<boolean> => {
    try {
      const data = await services.getDependencies({
        urlParams: { page: 1, limit: -1 }
      })

      dispatch(actions.setDependencies(data.data ?? initialState.dependencies))

      return Boolean(data.data)
    } catch (error) {
      dispatch(actions.setDependencies(initialState.dependencies))

      return false
    }
  }

  const getSummary = async (): Promise<boolean> => {
    try {
      const data = await services.getSummary()

      dispatch(actions.setSummary(data.data ?? initialState.summary))

      return Boolean(data.data)
    } catch (error) {
      dispatch(actions.setSummary(initialState.summary))
      return false
    }
  }

  const getUsers = async (params?: any): Promise<boolean> => {
    try {
      const data = await services.getUsers({
        urlParams: {
          page: params?.page ?? state.usersPagination.page,
          limit: params?.limit ?? state.usersPagination.limit
        }
      })

      dispatch(actions.setUsers(data.data ?? initialState.users))
      dispatch(
        actions.setUsersPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.usersPagination.limit,
          totalRecords: data.page_info.total_records
        })
      )

      return Boolean(data.data)
    } catch (error) {
      dispatch(actions.setUsers(initialState.users))
      return false
    }
  }

  const getRequests = async (params?: any): Promise<boolean> => {
    try {
      const data = await services.getRequests({
        urlParams: {
          page: params?.page ?? state.requestsPagination.page,
          limit: params?.limit ?? state.requestsPagination.limit
        }
      })

      dispatch(actions.setRequests(data.data ?? initialState.usersRequests))
      dispatch(
        actions.setRequestsPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.requestsPagination.limit,
          totalRecords: data.page_info.total_records
        })
      )

      return Boolean(data.data)
    } catch (error) {
      dispatch(actions.setRequests(initialState.usersRequests))

      return false
    }
  }

  const rejectUser = async (id: string): Promise<boolean> => {
    try {
      const data = await services.acceptUser({
        urlParams: { id },
        body: {
          accepted: false
        }
      })

      await getSummary()
      await getUsers()
      await getRequests()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }
  const acceptUser = async (body: AcceptUserParams): Promise<boolean> => {
    try {
      const data = await services.acceptUser({
        urlParams: { id: body.user_id },
        body: {
          accepted: true,
          dependency_id: body.dependency_id,
          role: body.role
        }
      })

      await getSummary()
      await getUsers()
      await getRequests()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }

  const updateUser = async (body: UpdateUserParams): Promise<boolean> => {
    try {
      const data = await services.updateUser({
        urlParams: { id: body.user_id },
        body: {
          active: body.active,
          role: body.role
        }
      })

      await getSummary()
      await getUsers()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }

  return {
    getDependencies,
    getSummary,
    getUsers,
    getRequests,
    rejectUser,
    acceptUser,
    updateUser
  }
}

export { useActions }
