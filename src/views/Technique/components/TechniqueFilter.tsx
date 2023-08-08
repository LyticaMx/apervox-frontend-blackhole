import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'

import ViewFilter from 'components/ViewFilter'
import { evidenceListMessages } from '../messages'
import { useEvidences } from 'context/Evidences'

const TechniqueFilter = (): ReactElement => {
  const getGeneralMessage = useFormatMessage(evidenceListMessages)
  const { actions, dateFilter, searchFilter } = useEvidences()

  const filterItems = [
    {
      name: 'evidence_number',
      label: getGeneralMessage('eventNumber')
    },
    {
      name: 'target_phone',
      label: getGeneralMessage('targetNumber')
    },
    {
      name: 'source_number',
      label: getGeneralMessage('sourceNumber')
    },
    {
      name: 'carrier',
      label: getGeneralMessage('carrier')
    },
    {
      name: 'audited_by',
      label: getGeneralMessage('auditedBy')
    },
    {
      name: 'tracked_by',
      label: getGeneralMessage('trackedBy')
    },
    {
      name: 'working_by',
      label: getGeneralMessage('workingBy')
    },
    {
      name: 'label',
      label: getGeneralMessage('tag')
    }
  ]

  return (
    <ViewFilter
      fields={filterItems}
      download={(document) => alert(document)}
      initialValues={{
        dateRange: {
          start_time: dateFilter.start_time,
          end_time: dateFilter.end_time
        },
        search: searchFilter.query,
        fields: searchFilter.filters
      }}
      onChange={(data) =>
        actions?.getData({
          start_time: data.dateRange[0],
          end_time: data.dateRange[1],
          clearDates: data.clearDates,
          filters: data.filterByField.fields,
          query: data.filterByField.search,
          page: 1
        })
      }
    />
  )
}

export default TechniqueFilter
