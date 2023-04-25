import { ReactElement } from 'react'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { workGroupsMessages } from '../messages'
import { useWorkGroups } from 'context/WorkGroups'
import { StaticFilter } from 'components/FilterByField'

interface Props {
  toggleOpen: () => void
}

const WorkGroupFilter = ({ toggleOpen }: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsMessages)
  const getGeneralMessage = useFormatMessage(generalMessages)
  const { actions } = useWorkGroups()

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

  // TODO: Eliminar despues de ser utilizado como ejemplo
  const staticFilters: StaticFilter[] = [
    {
      label: getMessage('status'),
      name: 'status',
      options: [
        {
          name: getMessage('active'),
          value: 'active'
        },
        {
          name: getMessage('inactive'),
          value: 'inactive'
        },
        {
          name: getMessage('both'),
          value: 'both'
        }
      ]
      // multiple: true
    }
  ]

  return (
    <ViewFilter
      fields={filterItems}
      action={{ label: getMessage('button'), onClick: toggleOpen }}
      download={(document) => alert(document)}
      staticFilters={staticFilters}
      onChange={(data) =>
        actions?.getWorkGroups({
          start_time: data.dateRange[0],
          end_time: data.dateRange[1],
          filters: data.filterByField.fields,
          query: data.filterByField.search
        })
      }
    />
  )
}

export default WorkGroupFilter
