import { PaginationParams, SearchParams } from 'types/api'
import { User, UserContextActions, UserContextState } from 'types/user'

export const useActions = (
  state: UserContextState,
  dispatch
): UserContextActions => {
  const getUsers = async (
    params?: PaginationParams & SearchParams
  ): Promise<void> => {}

  const createUser = async (user: User): Promise<boolean> => {
    return false
  }

  const updateUser = async (user: User): Promise<boolean> => {
    return false
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    return false
  }

  const toggleDisable = async (id: string): Promise<boolean> => {
    return false
  }

  const closeSession = async (id: string): Promise<boolean> => {
    return false
  }

  const exportTable = async (): Promise<void> => {}

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleDisable,
    closeSession,
    exportTable
  }
}
