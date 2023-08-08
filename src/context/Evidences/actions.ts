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

export const useActions = (state: EvidenceState, dispatch): EvidenceActions => {
  const { pagination, dateFilter, searchFilter, staticFilter } = state

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

  const getData = async (
    params?: EvidencePaginationParams &
      SearchParams &
      DateFilter &
      StaticFilter,
    getTotalRows?: boolean
  ): Promise<void> => {
    try {
      if (!technique) return
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

  return { getData }
}
