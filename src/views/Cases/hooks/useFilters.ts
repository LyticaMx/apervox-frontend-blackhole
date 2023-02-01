import { FilterItem, InputType } from 'components/Filter'
import { useCases } from 'context/Cases'
import { initialState } from 'context/Cases/context'
import { endOfDay, subHours } from 'date-fns'
import { useMemo } from 'react'
import { CaseState } from 'types/case'

interface Props {
  currentTab: string
}

interface FiltersHook {
  updateGlobalFilters: (dateFilters: any) => void
  filters: FilterItem[]
}

const useFilters = (props: Props): FiltersHook => {
  const { currentTab } = props
  const { actions } = useCases()

  const updateGlobalFilters = (dateFilters): void => {
    let gFilters = {}
    if (
      !dateFilters.startDate &&
      !dateFilters.endDate &&
      !dateFilters.startDateTime
    ) {
      gFilters = initialState.globalFilter
    } else if (dateFilters.startDateTime) {
      gFilters = {
        start_time: subHours(new Date(), dateFilters.startDateTime)
      }
    } else {
      gFilters = {
        start_time: dateFilters.startDate,
        end_time: dateFilters.endDate
          ? endOfDay(dateFilters.endDate)
          : (null as any)
      }
    }

    actions?.setGlobalFilters(currentTab as CaseState, gFilters)
  }

  const filters = useMemo<FilterItem[]>(
    () => [
      {
        title: 'Fecha inicial',
        type: 'datepicker' as InputType,
        name: 'startDate',
        wrap: false,
        cancelItems: ['startDateTime']
      },
      {
        title: 'Fecha final',
        type: 'datepicker' as InputType,
        name: 'endDate',
        wrap: false,
        cancelItems: ['startDateTime']
      },
      {
        title: 'Alog',
        type: 'divider' as InputType,
        name: 'o'
      },
      {
        title: 'Tiempo',
        type: 'select' as InputType,
        name: 'startDateTime',
        wrap: false,
        props: {
          clearable: true
        },
        items: [
          {
            value: 12,
            text: 'Últimas 12 horas'
          },
          {
            value: 24,
            text: 'Últimas 24 horas'
          },
          {
            value: 48,
            text: 'Últimas 48 horas'
          },
          {
            value: 72,
            text: 'Últimas 72 horas'
          }
        ],
        cancelItems: ['startDate', 'endDate']
      }
    ],
    []
  )

  return {
    filters,
    updateGlobalFilters
  }
}

export { useFilters }
