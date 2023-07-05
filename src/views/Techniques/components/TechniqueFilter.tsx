import { ReactElement } from 'react'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { techniquesMessages } from '../messages'
import { useTechniques } from 'context/Techniques'

interface Props {
  toggleOpen: () => void
}

const TechniqueFilter = ({ toggleOpen }: Props): ReactElement => {
  const getMessage = useFormatMessage(techniquesMessages)
  const getGeneralMessage = useFormatMessage(generalMessages)
  const {
    actions: techniquesActions,
    dateFilter,
    searchFilter
  } = useTechniques()

  const filterItems = [
    {
      name: 'name',
      label: getGeneralMessage('name')
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
      initialValues={{
        dateRange: {
          start_time: dateFilter.start_time,
          end_time: dateFilter.end_time
        },
        search: searchFilter.query,
        fields: searchFilter.filters
      }}
      onChange={(data) =>
        techniquesActions?.get({
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
