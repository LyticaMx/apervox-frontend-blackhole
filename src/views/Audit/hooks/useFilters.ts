import { FilterItem, InputType } from 'components/Filter'
import { endOfDay, subHours } from 'date-fns'
import { formMessages, generalMessages, timeMessages } from 'globalMessages'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { DateFilter } from 'types/filters'

interface FiltersHook {
  globalFilters: DateFilter
  updateGlobalFilters: (dateFilters: any) => void
  filters: FilterItem[]
}

const useFilters = (): FiltersHook => {
  const initialGlobalFilters = {
    start_time: subHours(new Date(), 12)
  }
  const [globalFilters, setGlobalFilters] =
    useState<DateFilter>(initialGlobalFilters)
  const { formatMessage } = useIntl()

  const updateGlobalFilters = (dateFilters): void => {
    if (
      !dateFilters.startDate &&
      !dateFilters.endDate &&
      !dateFilters.startDateTime
    ) {
      setGlobalFilters(initialGlobalFilters)
    } else if (dateFilters.startDateTime) {
      setGlobalFilters({
        start_time: subHours(new Date(), dateFilters.startDateTime)
      })
    } else {
      setGlobalFilters({
        start_time: dateFilters.startDate,
        end_time: dateFilters.endDate
          ? endOfDay(dateFilters.endDate)
          : (null as any)
      })
    }
  }

  const filters = useMemo<FilterItem[]>(
    () => [
      {
        title: formatMessage(formMessages.startDate),
        type: 'datepicker' as InputType,
        name: 'startDate',
        wrap: false,
        cancelItems: ['startDateTime']
      },
      {
        title: formatMessage(formMessages.endDate),
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
        title: formatMessage(generalMessages.time),
        type: 'select' as InputType,
        name: 'startDateTime',
        wrap: false,
        props: {
          clearable: true
        },
        items: [
          {
            value: 12,
            text: formatMessage(timeMessages.last12Hours)
          },
          {
            value: 24,
            text: formatMessage(timeMessages.last24Hours)
          },
          {
            value: 48,
            text: formatMessage(timeMessages.last48Hours)
          },
          {
            value: 72,
            text: formatMessage(timeMessages.last72Hours)
          }
        ],
        cancelItems: ['startDate', 'endDate']
      }
    ],
    []
  )

  return {
    filters,
    globalFilters,
    updateGlobalFilters
  }
}

export { useFilters }
