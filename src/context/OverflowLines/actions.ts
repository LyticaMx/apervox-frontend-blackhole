/* eslint-disable no-unreachable */
import { useService } from 'hooks/useApi'
import { omit } from 'lodash'
import { actions } from './constants'
import {
  Actions,
  CreatePayload,
  GetPayload,
  OverflowLine,
  State,
  UpdatePayload
} from 'types/overflowLine'
import { Params } from 'utils/ParamsBuilder'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'
import { DocumentType, RowsQuantity } from 'types/utils'
import useDownloadFile from 'hooks/useDownloadFile'
import { format } from 'date-fns'

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter, staticFilter } = state
  const resource = useService('overflow-lines')
  const exportLinesService = useDownloadFile({
    endpoint: 'exports/overflow-lines',
    method: 'get'
  })
  const { actions: auditActions } = useModuleAudits()

  const get = async (
    params?: GetPayload,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort, {
          created_by: 'created_by.username',
          target_phone: 'target.phone',
          target_carrier: 'target.carrier.name',
          target_technique: 'target.technique.name',
          target_end_date: 'target.end_date',
          medium_name: 'medium.name'
        })
        .dates(dateFilter)
        .putStaticFilter('line_status', params?.line_status)
        .build()

      const [response] = await Promise.all([
        resource.get({ urlParams }),
        getTotal ? getTotales() : Promise.resolve(null)
      ])

      if (params?.query && params?.filters) {
        try {
          auditActions?.genAudit(
            ModuleAuditsTypes.AuditableModules.OVERFLOW_LINES,
            ModuleAuditsTypes.AuditableActions.SEARCH,
            `${params.filters?.[0]}:${params.query}`
          )
        } catch {}
      }

      dispatch(actions.setData(response.data))

      dispatch(
        actions.setPagination({
          page: response.page,
          limit: params?.limit ?? pagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? pagination.sort
        })
      )

      dispatch(
        actions.setFilters({
          search: {
            query: params?.query ?? searchFilter.query,
            filters: params?.filters ?? searchFilter.filters
          },
          date: {
            start_time: urlParams.start_time,
            end_time: urlParams.end_time
          }
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  const getTotales = async (): Promise<void> => {
    try {
      const res = await Promise.all([
        resource.get({
          urlParams: { page: 1, limit: 1 }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'available' }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'assigned' }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'quarantine' }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'maintenance' }
        })
      ])

      const [all, available, assigned, quarantine, maintenance] = res.map(
        (item) => item.size
      )

      dispatch(
        actions.setTotals({
          all,
          available,
          assigned,
          quarantine,
          maintenance
        })
      )
    } catch (error) {}
  }
  const create = async (payload: CreatePayload): Promise<boolean> => {
    try {
      await resource.post({
        body: payload
      })

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
  const update = async (payload: UpdatePayload): Promise<boolean> => {
    try {
      await resource.put({
        queryString: payload.id,
        body: omit(payload, ['id'])
      })

      return true
    } catch {
      return false
    }
  }

  const updateMany = async (
    ids: string[],
    payload: Partial<OverflowLine>
  ): Promise<boolean> => {
    try {
      await resource.put({
        body: {
          ids,
          payload
        }
      })

      return true
    } catch {
      return false
    }
  }

  const exportTable = async (
    exportType: DocumentType,
    quantity: RowsQuantity
  ): Promise<void> => {
    try {
      const params = quantity === 'full' ? { limit: -1 } : {}
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort, {
          created_by: 'created_by.username',
          target_phone: 'target.phone',
          target_carrier: 'target.carrier.name',
          target_technique: 'target.technique.name',
          target_end_date: 'target.end_date',
          medium_name: 'medium.name'
        })
        .dates(dateFilter)
        .putStaticFilter('line_status', staticFilter?.line_status)
        .putStaticFilter('export_type', exportType)
        .build()
      await exportLinesService(
        `overflow_lines_${format(new Date(), 'ddMMyyyy_HHmmss')}`,
        { urlParams }
      )
    } catch (e) {
      console.error(e)
    }
  }

  const updateQuarantine = async (
    id: string,
    release: boolean
  ): Promise<boolean> => {
    try {
      await resource.put({
        queryString: `${id}/quarantine`,
        urlParams: { release }
      })
      return true
    } catch {
      return false
    }
  }

  const updateMaintenance = async (
    id: string,
    release: boolean
  ): Promise<boolean> => {
    try {
      await resource.put({
        queryString: `${id}/maintenance`,
        urlParams: { release }
      })
      return true
    } catch {
      return false
    }
  }

  return {
    get,
    create,
    update,
    updateMany,
    exportTable,
    updateMaintenance,
    updateQuarantine
  }
}
