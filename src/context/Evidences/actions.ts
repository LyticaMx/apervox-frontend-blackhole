import useApi from 'hooks/useApi'
import {
  Evidence,
  EvidenceActions,
  EvidencePaginationParams,
  EvidenceState,
  StaticFilter
} from './types'
import { useTechnique } from 'context/Technique'
import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import { actions } from './constants'
import mutexify from 'mutexify/promise'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'
import { DocumentType, RowsQuantity } from 'types/utils'
import useDownloadFile from 'hooks/useDownloadFile'
import { format } from 'date-fns'

const orderByMapper = {
  evidenceNumber: 'evidence_number',
  targetPhone: 'target_phone',
  sourceNumber: 'source_number',
  callStartDate: 'call_start_date',
  callEndDate: 'call_end_date',
  auditedBy: 'audited_by.username',
  isTracked: 'tracked_by.username',
  workingBy: 'working_by.username'
}

const lock = mutexify()

export const useActions = (state: EvidenceState, dispatch): EvidenceActions => {
  const { pagination, dateFilter, searchFilter, staticFilter, data } = state
  const { actions: auditActions } = useModuleAudits()

  // Buscar una manera de vincular esto
  const { technique, target } = useTechnique()

  const getAllEvidences = useApi({
    endpoint: 'techniques',
    method: 'get'
  })

  const getTargetEvidences = useApi({
    endpoint: 'targets',
    method: 'get'
  })

  const getEvidence = useApi({ endpoint: 'call-evidences', method: 'get' })

  const _updateEvidence = useApi({ endpoint: 'call-evidences', method: 'put' })
  const exportEvidencesByTarget = useDownloadFile({
    endpoint: 'exports/targets',
    method: 'get'
  })
  const exportEvidencesByTechnique = useDownloadFile({
    endpoint: 'exports/techniques',
    method: 'get'
  })

  const getData = async (
    params?: EvidencePaginationParams &
      SearchParams &
      DateFilter &
      StaticFilter,
    getTotalRows?: boolean
  ): Promise<void> => {
    try {
      if (!technique) return
      console.log({ params })
      const urlParams = Params.Builder(params, 'call_start_date')
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('relevance', params?.relevance)
        .putStaticFilter(
          'is_tracked',
          params?.follow?.[0] === 'withFollow'
            ? true
            : params?.follow?.[0] === 'withoutFollow'
            ? false
            : undefined
        )
        .build()

      const [response, total] = await Promise.all([
        target
          ? getTargetEvidences({
              urlParams,
              queryString: `${target.id}/call-evidences`
            })
          : getAllEvidences({
              urlParams,
              queryString: `${technique.id}/call-evidences`
            }),
        getTotalRows
          ? getAllEvidences({ urlParams: { page: 1, limit: 1 } })
              .then((res) => res.size)
              .catch(() => null)
          : Promise.resolve(null)
      ])

      dispatch(
        actions.setData(
          (response.data as any[]).map<Evidence>((datum) => {
            const evidence: Evidence = {
              id: datum.id,
              evidenceNumber: datum.evidence_number,
              targetPhone: datum.target_phone,
              sourceNumber: datum.source_number,
              callStartDate: datum.call_start_date,
              callEndDate: datum.call_end_date,
              duration: datum.duration,
              carrier: datum.carrier,
              technique: datum.technique?.name ?? '',
              auditedBy: datum.audited_by?.username ?? '',
              isTracked: datum.is_tracked,
              trackedBy: datum.tracked_by?.username ?? '',
              workingBy: datum.working_by?.username ?? '',
              relevance: datum.relevance,
              hasTranscription: datum.hasTranscription
            }
            if (datum.label) evidence.label = datum.label
            else if (datum.otherLabel) datum.otherLabel = datum.other_label

            return evidence
          })
        )
      )

      if (total != null) dispatch(actions.setTotal(total))

      if (params?.query && params?.filters) {
        try {
          auditActions?.genAudit(
            ModuleAuditsTypes.AuditableModules.CALL_EVIDENCES,
            ModuleAuditsTypes.AuditableActions.SEARCH,
            `${params.filters?.[0]}:${params.query}`
          )
        } catch {}
      }

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
          },
          static: {
            follow: params?.follow ?? staticFilter.follow,
            relevance: params?.relevance ?? staticFilter.relevance
          }
        })
      )
    } catch {}
  }

  const releaseEvidences = async (ids: string[]): Promise<boolean> => {
    try {
      // Hacerlo secuencial o revisar batch updates
      await Promise.all(
        ids.map(
          async (id) => await _updateEvidence({ queryString: `${id}/release` })
        )
      )
      return true
    } catch {
      return false
    }
  }

  const updateEvidence = async (id: string): Promise<void> => {
    const release = await lock()
    try {
      const canBeUpdated = data.some((ev) => ev.id === id)

      if (!canBeUpdated) return

      try {
        const response = await getEvidence({ queryString: id })
        dispatch(
          actions.updateOne({
            id: response.data.id,
            evidenceNumber: response.data.evidence_number,
            targetPhone: response.data.target_phone,
            sourceNumber: response.data.source_number,
            callStartDate: response.data.call_start_date,
            callEndDate: response.data.call_end_date,
            duration: response.data.duration,
            carrier: response.data.carrier,
            technique: response.data.technique?.name ?? '',
            auditedBy: response.data.audited_by?.username ?? '',
            isTracked: response.data.is_tracked,
            trackedBy: response.data.tracked_by?.username ?? '',
            workingBy: response.data.working_by?.username ?? '',
            relevance: response.data.relevance,
            hasTranscription: response.data.hasTranscription
          })
        )
      } catch {}
    } finally {
      release()
    }
  }

  const updateFollow = (id: string, status: boolean = false): void => {
    const canBeUpdated = data.some((ev) => ev.id === id)

    if (!canBeUpdated) return

    dispatch(
      actions.setData(
        data.map((item) =>
          item.id === id ? { ...item, isTracked: status } : item
        )
      )
    )
  }

  const toggleFollow = async (id: string): Promise<boolean> => {
    try {
      await _updateEvidence({ queryString: `${id}/tracking` })

      return true
    } catch {
      return false
    }
  }

  const exportTable = async (
    document: DocumentType,
    quantity: RowsQuantity
  ): Promise<void> => {
    try {
      const params = quantity === 'full' ? { limit: -1 } : {}
      const urlParams = Params.Builder(params, 'call_start_date')
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('relevance', staticFilter?.relevance)
        .putStaticFilter('export_type', document)
        .putStaticFilter(
          'is_tracked',
          staticFilter?.follow?.[0] === 'withFollow'
            ? true
            : staticFilter?.follow?.[0] === 'withoutFollow'
            ? false
            : undefined
        )
        .build()
      if (target) {
        await exportEvidencesByTarget(
          `evidences_${format(new Date(), 'ddMMyyyy_HHmmss')}`,
          {
            queryString: `${target.id}/call-evidences`,
            urlParams
          }
        )
      } else {
        await exportEvidencesByTechnique(
          `evidences_${format(new Date(), 'ddMMyyyy_HHmmss')}`,
          {
            queryString: `${technique?.id}/call-evidences`,
            urlParams
          }
        )
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    getData,
    updateEvidence,
    updateFollow,
    toggleFollow,
    exportTable,
    releaseEvidences
  }
}
