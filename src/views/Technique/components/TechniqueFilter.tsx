import { ReactElement } from 'react'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'

const TechniqueFilter = (): ReactElement => {
  const getGeneralMessage = useFormatMessage(generalMessages)

  const filterItems = [
    {
      name: 'id',
      label: 'ID'
    },
    {
      name: 'name',
      label: getGeneralMessage('name')
    },
    {
      name: 'description',
      label: getGeneralMessage('description')
    },
    {
      name: 'registeredBy',
      label: getGeneralMessage('registeredBy')
    },
    {
      name: 'techniques',
      label: getGeneralMessage('techniques')
    },
    {
      name: 'status',
      label: getGeneralMessage('status')
    }
  ]

  return (
    <ViewFilter
      fields={filterItems}
      download={(document) => alert(document)}
      onChange={(data) => console.log('workGroupsViewFilter', data)}
    />
  )
}

export default TechniqueFilter
