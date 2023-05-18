import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import {
  OverflowLine,
  OverflowLineContextActions,
  OverflowLineContextState,
  OverflowLinePaginationParams,
  OverflowLineStaticFilter
} from 'types/overflowLine'
import { actions } from './constants'

export const useActions = (
  state: OverflowLineContextState,
  dispatch
): OverflowLineContextActions => {
  const get = async (
    params?: OverflowLinePaginationParams &
      SearchParams &
      DateFilter &
      OverflowLineStaticFilter,
    getTotal?: boolean
  ): Promise<void> => {
    dispatch(
      actions.setOverflowLines({
        data: [
          {
            id: '001',
            target: {
              phone: '5623456908',
              carrier: 'Telcel',
              technique: 'T.I.45/2022-2'
            },
            medium: {
              id: '001',
              name: 'ETSI'
            },

            phone: '5623456908',
            createdBy: 'e.cuadras',
            createdOn: '2023-02-14T18:58:02.626Z',
            status: 'available',
            releaseDate: '2023-02-14T18:58:02.626Z'
          },
          {
            id: '002',
            target: {
              phone: '5623456908',
              carrier: 'Telcel',
              technique: 'T.I.45/2022-2'
            },
            medium: {
              id: '001',
              name: 'ETSI'
            },
            phone: '5623456908',
            createdBy: 'e.cuadras',
            createdOn: '2023-02-14T18:58:02.626Z',
            status: 'available',
            releaseDate: '2023-02-14T18:58:02.626Z'
          },
          {
            id: '003',
            target: {
              phone: '5623456908',
              carrier: 'Telcel',
              technique: 'T.I.45/2022-2'
            },
            medium: {
              id: '001',
              name: 'ETSI'
            },
            phone: '5623456908',
            createdBy: 'e.cuadras',
            createdOn: '2023-02-14T18:58:02.626Z',
            status: 'assigned',
            releaseDate: '2023-02-14T18:58:02.626Z'
          },
          {
            id: '004',
            target: {
              phone: '5623456908',
              carrier: 'Telcel',
              technique: 'T.I.45/2022-2'
            },
            medium: {
              id: '001',

              name: 'ETSI'
            },
            phone: '5623456908',
            createdBy: 'e.cuadras',
            createdOn: '2023-02-14T18:58:02.626Z',
            status: 'assigned',
            releaseDate: '2023-02-14T18:58:02.626Z'
          }
        ],
        total: 4
      })
    )
  }
  const create = async (line: OverflowLine): Promise<boolean> => true
  const update = async (line: OverflowLine): Promise<boolean> => true
  const deleteOne = async (id: string): Promise<boolean> => true
  const deleteMany = async (ids: string[]): Promise<boolean> => true
  const toggleDisable = async (
    id: string,
    enabled: boolean
  ): Promise<boolean> => true

  return {
    get,
    create,
    update,
    deleteOne,
    deleteMany,
    toggleDisable
  }
}
