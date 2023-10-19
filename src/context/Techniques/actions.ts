import {
  Actions,
  State,
  TechniqueCreator,
  TechniquesPaginationParams,
  TechniquesStaticFilter
} from './types'

import { actions } from './constants'
import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import { useService } from 'hooks/useApi'
import { Params } from 'utils/ParamsBuilder'
import useToast from 'hooks/useToast'
import { Status } from 'types/status'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'

const orderByMapper = {
  created_at: 'start_date',
  expires_at: 'end_date',
  registered_by: 'created_by.username',
  time_on_platform: 'start_date',
  attention_turn: 'shift'
}

const useActions = (state: State, dispatch): Actions => {
  const { pagination, searchFilter, dateFilter, staticFilter } = state
  const techniquesService = useService('techniques')
  const { launchToast } = useToast()
  const { actions: auditActions } = useModuleAudits()

  const get = async (
    params?: TechniquesPaginationParams &
      SearchParams &
      DateFilter &
      TechniquesStaticFilter,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .pagination(pagination)
        .dates(dateFilter)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .putStaticFilter('priority', params?.priority)
        .putStaticFilter('status', params?.status)
        .putStaticFilter('shift', params?.turn)
        .putStaticFilter('has_targets', params?.withTargets)
        .build()

      const [response, total] = await Promise.all([
        techniquesService.get({ urlParams }),
        getTotal
          ? techniquesService
              .get({ urlParams: { page: 1, limit: 1 } })
              .then((response) => response.size)
              .catch(() => 0)
          : Promise.resolve(null)
      ])

      if (params?.query && params?.filters) {
        try {
          auditActions?.genAudit(
            ModuleAuditsTypes.AuditableModules.TECHNIQUES,
            ModuleAuditsTypes.AuditableActions.SEARCH,
            `${params.filters?.[0]}:${params.query}`
          )
        } catch {}
      }

      dispatch(
        actions.setTechniques({
          data: (response.data as any[]).map((item) => ({
            id: item.id,
            name: item.name,
            created_at: item.created_at,
            expires_at: item.end_date,
            priority: item.priority,
            registered_by: item.created_by.username,
            total_target: item.targets.length,
            status:
              item.status === 'concluding' ? Status.TO_COMPLETE : item.status,
            attention_turn: item.shift ?? ''
          })),
          total: total ?? 0
        })
      )

      dispatch(
        actions.setTechniquesPagination({
          page: 1,
          limit: params?.limit ?? pagination.limit,
          totalRecords: 15,
          sort: params?.sort ?? pagination.sort
        })
      )

      dispatch(
        actions.setTechniquesFilters({
          search: {
            query: params?.query ?? searchFilter.query,
            filters: params?.filters ?? searchFilter.filters
          },
          date: {
            start_time: urlParams.start_time,
            end_time: urlParams.end_time
          },
          static: {
            priority: params?.priority ?? staticFilter.priority,
            status: params?.status ?? staticFilter.status,
            turn: params?.turn ?? staticFilter.turn,
            withTargets: params?.withTargets ?? staticFilter.withTargets
          }
        })
      )
    } catch {}
  }

  const create = async (technique: TechniqueCreator): Promise<boolean> => {
    try {
      const body: Record<string, any> = {}
      body.name = technique.name
      body.description = technique.description
      body.start_date = technique.starts_at
      body.end_date = technique.expires_at
      body.priority = technique.priority
      body.groups = technique.groups
      if (technique.notificationTime || !isNaN(technique.notificationTime)) {
        body.notification_type = technique.notificationTimeUnit
        body.notification_time = technique.notificationTime
      }
      if (technique.shift !== '') {
        body.shift = technique.shift
        body.shift_cutoff = technique.reportEvidenceEvery
      }

      const response = await techniquesService.post({
        body
      })

      const targetsEndpoint = `${response.data.id}/targets`

      for (const target of technique.targets) {
        try {
          if (target.type === 'conventional') {
            await techniquesService.post({
              queryString: targetsEndpoint,
              body: {
                alias: target.name,
                phone: target.phone_number,
                overflow_line_id: target.overflow_id,
                carrier_id: target.phone_company
              }
            })
          } else {
            throw new Error('Cannot create target')
          }
        } catch {
          // temporal en lo que se define la creación de objetivos ETSII
          console.log(target)
          launchToast({
            title: `No se puede crear el objetivo con número: ${target.phone_number}`,
            type: 'Danger'
          })
        }
      }

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const deleteOne = async (id: string): Promise<boolean> => {
    try {
      await techniquesService.delete({
        queryString: id
      })

      return true
    } catch {
      return false
    }
  }

  const deleteMany = async (ids: string[]): Promise<boolean> => {
    try {
      await techniquesService.delete({ body: { ids } })

      return true
    } catch {
      return false
    }
  }

  return {
    get,
    create,
    deleteOne,
    deleteMany
  }
}

export { useActions }
