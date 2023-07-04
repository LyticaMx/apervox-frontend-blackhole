import { ReactElement } from 'react'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { workGroupsMessages } from '../messages'
import { useWorkGroups } from 'context/WorkGroups'

interface Props {
  toggleOpen: () => void
}

const WorkGroupFilter = ({ toggleOpen }: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsMessages)
  const getGeneralMessage = useFormatMessage(generalMessages)
  const { actions, dateFilter, searchFilter, staticFilter } = useWorkGroups()

  const filterItems = [
    {
      name: 'name',
      label: getGeneralMessage('name')
    },
    {
      name: 'description',
      label: getGeneralMessage('description')
    },
    {
      name: 'created_by',
      label: getGeneralMessage('registeredBy')
    }
  ]

  return (
    <ViewFilter
      fields={filterItems}
      action={{ label: getMessage('button'), onClick: toggleOpen }}
      download={(document) => alert(document)}
      onChange={(data) =>
        actions?.getWorkGroups({
          start_time: data.dateRange[0],
          end_time: data.dateRange[1],
          clearDates: data.clearDates,
          filters: data.filterByField.fields,
          query: data.filterByField.search,
          page: 1
        })
      }
      initialValues={{
        dateRange: {
          start_time: dateFilter.start_time,
          end_time: dateFilter.end_time
        },
        search: searchFilter.query,
        fields: searchFilter.filters,
        staticFilters: {
          status: staticFilter.status ?? []
        }
      }}
    />
  )
}

export default WorkGroupFilter
