import { useService } from 'hooks/useApi'
import { omit } from 'lodash'
import {
  Actions,
  State,
  GetPayload,
  CreatePayload,
  UpdatePayload,
  VerificationLine
} from 'types/verificationLine'
import { actions } from './constants'
import { Params } from 'utils/ParamsBuilder'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter, total } = state
  const resource = useService('verification-lines')
  const { actions: auditActions } = useModuleAudits()

  const get = async (
    params?: GetPayload,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort)
        .dates(dateFilter)
        .build()

      // TODO: cambiar el response data
      const [response, totalResponse] = await Promise.all([
        resource.get({ urlParams }),
        getTotal
          ? resource.get({ urlParams: { page: 1, limit: 1 } })
          : Promise.resolve(null)
      ])

      if (params?.query && params?.filters) {
        try {
          auditActions?.genAudit(
            ModuleAuditsTypes.AuditableModules.VERIFICATION_LINES,
            ModuleAuditsTypes.AuditableActions.SEARCH,
            'searched'
          )
        } catch {}
      }

      dispatch(
        actions.setVerificationLines({
          data: response.data,
          total: totalResponse?.size ?? total
        })
      )

      dispatch(
        actions.setVerificationLinePagination({
          page: response.page,
          limit: params?.limit ?? pagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? pagination.sort
        })
      )

      dispatch(
        actions.setVerificationLineFilters({
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
    payload: Partial<VerificationLine>
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

  return {
    get,
    create,
    update,
    updateMany
  }
}
