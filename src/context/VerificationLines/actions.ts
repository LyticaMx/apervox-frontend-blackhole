import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import {
  VerificationLine,
  VerificationLineContextActions,
  VerificationLineContextState,
  VerificationLinePaginationParams
} from 'types/verificationLine'
import { actions } from './constants'

export const useActions = (
  state: VerificationLineContextState,
  dispatch
): VerificationLineContextActions => {
  const get = async (
    params?: VerificationLinePaginationParams & SearchParams & DateFilter,
    getTotal?: boolean
  ): Promise<void> => {
    dispatch(
      actions.setVerificationLines({
        data: [
          {
            id: 'asdasdasd',
            phone: '0001112223',
            createdOn: '2023-05-11T17:13:11.008Z',
            createdBy: 'superuser'
          }
        ],
        total: 1
      })
    )
  }
  const create = async (line: VerificationLine): Promise<boolean> => true
  const update = async (line: VerificationLine): Promise<boolean> => true
  const deleteOne = async (id: string): Promise<boolean> => true
  const deleteMany = async (ids: string[]): Promise<boolean> => true

  return {
    get,
    create,
    update,
    deleteOne,
    deleteMany
  }
}
