import { useDatesFilter } from 'context/DatesFilter'
import { format } from 'date-fns'
import useApi from 'hooks/useApi'
import {
  AuditContextActions,
  AuditContextState,
  AuditListParams,
  Param
} from 'types/audit'
import { DateFilter } from 'types/filters'
import { actions } from './constants'
import { initialState } from './context'

export const useActions = (
  state: AuditContextState,
  dispatch
): AuditContextActions => {
  const { auditPagination } = state
  const { dates, actions: actionsDates } = useDatesFilter()
  const getAuditsService = useApi({
    endpoint: 'actions/by-user-id',
    method: 'get'
  })

  const getListOfAudits = async (params: AuditListParams): Promise<void> => {
    try {
      const response = await getAuditsService({
        urlParams: {
          page: auditPagination.page,
          limit: auditPagination.limit,
          ...dates,
          ...params
        }
      })
      if (response.data) {
        dispatch(
          actions.setAudits(
            response.data.map((item) => ({
              date: format(new Date(item.created_at), 'dd/MM/yyyy hh:mm:ss'),
              module: item.module,
              action: item.action,
              params: Object.keys(item.value).map<Param>((key) => {
                return {
                  name: key,
                  value: item.value[key],
                  type: typeof item.value[key]
                }
              })
            }))
          )
        )

        dispatch(
          actions.setAuditsPagination({
            page: response.page_info.current_page,
            limit: params?.limit ?? auditPagination.limit,
            totalRecords: response.page_info.total_records
          })
        )
      }
    } catch {}
  }

  const setGlobalFilters = async (params: DateFilter): Promise<void> => {
    try {
      resetList()
      actionsDates?.setForm(params)
    } catch {}
  }

  const resetList = (): void => {
    dispatch(actions.setAudits(initialState.listOfAudits))
    dispatch(actions.setAuditsPagination(initialState.auditPagination))
  }

  return {
    getListOfAudits,
    resetList,
    setGlobalFilters
  }
}
