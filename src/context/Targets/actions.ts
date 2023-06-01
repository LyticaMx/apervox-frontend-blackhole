import {
  Actions,
  createPayload,
  getDataPayload,
  State,
  updatePayload
} from 'types/target'

export const useActions = (state: State, dispatch): Actions => {
  const getData = async (params?: getDataPayload): Promise<void> => {}
  const create = async (payload: createPayload): Promise<boolean> => true
  const update = async (payload: updatePayload): Promise<boolean> => true
  const deleteOne = async (id: string): Promise<boolean> => true
  const deleteAll = async (ids: string[]): Promise<boolean> => true
  const toggleStatus = async (id: string, enabled: boolean): Promise<boolean> =>
    true

  return {
    getData,
    create,
    update,
    delete: deleteOne,
    deleteAll,
    toggleStatus
  }
}
